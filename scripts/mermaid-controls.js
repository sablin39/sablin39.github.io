'use strict';

const urlFor = hexo.extend.helper.get('url_for').bind(hexo);

// PJAX can open a post with diagrams from any page on the blog.
hexo.extend.injector.register('head_end', `<link rel="stylesheet" href="${urlFor('/css/mermaid-controls.css')}">`);
hexo.extend.injector.register('body_end', `<script defer src="${urlFor('/js/mermaid-controls.js')}"></script>`);
