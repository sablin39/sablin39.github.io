const palette = {
  bg: '#f7f5ef', panel: '#fffefa', ink: '#17243a', muted: '#52617a', line: '#cad1dc',
  blue: '#245fc5', orange: '#b94a21', green: '#146d55',
  blueLight: '#e5edfb', orangeLight: '#f8e7dc', neutral: '#eceef1'
};
const width = 800;
const height = 480;
const tau = 2 * Math.PI;

function text(ctx, value, x, y, options = {}) {
  const { size = 18, weight = 500, color = palette.ink, align = 'left', font = 'Segoe UI, sans-serif' } = options;
  ctx.save();
  ctx.font = weight + ' ' + size + 'px ' + font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(String(value), x, y);
  ctx.restore();
}

function header(ctx, title, subtitle) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);
  text(ctx, title, 36, 36, { size: 33, weight: 650 });
  text(ctx, subtitle, 37, 73, { size: 17, color: palette.muted });
  rule(ctx, 96);
}

function rule(ctx, y) {
  ctx.save();
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(36, y + 0.5);
  ctx.lineTo(width - 36, y + 0.5);
  ctx.stroke();
  ctx.restore();
}

function footer(ctx, left, right = '') {
  rule(ctx, 425);
  text(ctx, left, 37, 451, { size: 16, color: palette.muted });
  if (right) {
    text(ctx, right, width - 37, 451, { size: 16, color: palette.ink, weight: 600, align: 'right' });
  }
}

function pill(ctx, value, x, y, options = {}) {
  const inks = {
    blue: [palette.blueLight, palette.blue], orange: [palette.orangeLight, palette.orange],
    green: ['#e2f1e8', palette.green], neutral: [palette.neutral, palette.ink]
  };
  const [fill, color] = inks[options.kind] || inks.neutral;
  ctx.save();
  ctx.font = '650 15px Segoe UI, sans-serif';
  const width = ctx.measureText(value).width + 23;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y - 13, width, 27, 7);
  ctx.fill();
  ctx.restore();
  text(ctx, value, x + 11.5, y, { size: 15, weight: 650, color });
  return width;
}

function arrow(ctx, x1, y1, x2, y2, color, width = 2) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  if (length < 1) return;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = Math.min(length * 0.5, 7 + width * 1.1);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2 - 0.42 * head * Math.cos(angle), y2 - 0.42 * head * Math.sin(angle));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(angle - 0.47), y2 - head * Math.sin(angle - 0.47));
  ctx.lineTo(x2 - head * Math.cos(angle + 0.47), y2 - head * Math.sin(angle + 0.47));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default { width, height, palette, header, footer, text, pill, arrow };
