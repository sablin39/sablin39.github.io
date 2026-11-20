'use strict';

const { dirname, join } = require('node:path').posix;

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
