'use strict';

const { relative, sep } = require('node:path');

// Prefer the deepest matching post directory when one post's asset folder is
// nested inside another's name. Hexo's fallback otherwise assigns the asset to
// the shorter prefix (for example, NeRF-startup before the longer RoPE folder).
hexo.extend.filter.register('processor:post_asset', (ctx, file) => {
  const Post = ctx.model('Post');
  const id = file.source.substring(ctx.base_dir.length).replace(/\\/g, '/');
  const directory = id.slice(0, id.lastIndexOf('/') + 1);
  const post = Post.find({}).filter(candidate => {
    const assetDir = relative(ctx.base_dir, candidate.asset_dir).split(sep).join('/') + '/';
    return directory === assetDir;
  })[0];
  if (post) return post;
});
