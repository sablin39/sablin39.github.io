'use strict';

const { escapeHTML } = require('hexo-util');

// The browser tab accepts only text. Keep the original title for the theme's KaTeX heading.
hexo.extend.filter.register('after_render:html', (html, { page, config } = {}) => {
  if (typeof page?.title_text !== 'string' || !page.title_text.trim()) return;

  const title = escapeHTML(`${page.title_text.trim()} | ${config.title}`);
  return html.replace(/(<title>)[^<]*(<\/title>)/, (_, open, close) => `${open}${title}${close}`);
});
