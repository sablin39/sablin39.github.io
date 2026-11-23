'use strict';

const { posix, relative, sep } = require('node:path');
const { basename, dirname, join } = posix;

// Newly discovered script and style assets can have the wrong owner on Windows.
// Resolve their owner from the source folder before Hexo expands asset_path tags.
hexo.extend.filter.register('before_generate', () => {
  if (!hexo.config.post_asset_folder) return;

  const PostAsset = hexo.model('PostAsset');
  const owners = new Map(hexo.model('Post').find({}).map(post => [
    relative(hexo.base_dir, post.asset_dir).split(sep).join('/'),
    post._id
  ]));

  return Promise.all(PostAsset.find({}).map(asset => {
    if (!/\.(?:css|js)$/i.test(asset._id)) return;

    const post = owners.get(dirname(asset._id));
    const slug = basename(asset._id);
    if (!post || (asset.post === post && asset.slug === slug)) return;

    return PostAsset.save({
      _id: asset._id,
      post,
      slug,
      modified: true,
      renderable: asset.renderable
    });
  }));
}, 5);

function findEditorAsset({ hexo, postPath }, href) {
  if (!postPath || hexo.config.relative_link || /^(?:[a-z][a-z\d+.-]*:|[\\/]|#)/i.test(href)) return;

  // Editors resolve image paths from the Markdown file. Hexo looks inside its asset folder.
  let localPath = href;
  try {
    localPath = decodeURIComponent(href);
  } catch {
    // A literal percent sign can be part of a filename.
  }

  const source = join(dirname(postPath), localPath.replaceAll('\\', '/'));
  if (source.startsWith(`${postPath}/`)) return hexo.model('PostAsset').findById(source);
}

hexo.extend.filter.register('marked:extensions', extensions => {
  extensions.push({
    name: 'image',
    renderer(token) {
      const asset = findEditorAsset(this.parser.options, token.href);
      if (asset) token.href = asset.slug;
      return false;
    }
  }, {
    name: 'html',
    renderer(token) {
      // Typora also writes HTML images when an image has custom sizing.
      const source = /^(\s*<img\b(?:[^"'<>]|"[^"]*"|'[^']*')*?\s+src\s*=\s*)(["'])(.*?)\2/i;
      token.text = token.text.replace(source, (attribute, prefix, quote, href) => {
        const options = this.parser.options;
        const asset = findEditorAsset(options, href);
        if (!asset) return attribute;

        const hexo = options.hexo;
        const url = hexo.extend.helper.get('url_for').call(hexo, asset.path);
        return `${prefix}"${url.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`;
      });
      return false;
    }
  });
});
