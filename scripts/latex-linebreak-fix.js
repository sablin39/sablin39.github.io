'use strict';

const fixLatexLinebreaks = (content) => {
  console.log('Processing LaTeX content...');
  // Match content between $$ markers (LaTeX blocks)
  return content.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    console.log('Found LaTeX block:', formula);
    // Replace \\ with \\\\ only within the formula
    const fixedFormula = formula.replace(/\\\\/g, '\\\\\\\\');
    console.log('Fixed LaTeX block:', fixedFormula);
    return `$$${fixedFormula}$$`;
  });
};

// Register multiple filters to ensure we catch the content
hexo.extend.filter.register('before_post_render', function(data) {
  console.log('before_post_render triggered');
  if (data.content) {
    data.content = fixLatexLinebreaks(data.content);
  }
  return data;
});

hexo.extend.filter.register('after_render:html', function(content) {
  console.log('after_render:html triggered');
  return fixLatexLinebreaks(content);
});
