import { angleA, cross, drawAxis, drawCube, progress, project, rotate, rotation } from './so3.js';

const duration = 9.25;
const view = { x: 224, y: 249, scale: 132 };
const omega = [angleA, 0, 0];
// These points lie on the visible x face. The center of that face is on the axis.
const marks = [
  { vector: [0.56, 0, 0], label: 'fixed', dx: -8, dy: 13, align: 'right', fixed: true },
  { vector: [0.56, -0.42, 0.34], label: 'v₁', dx: -20, dy: -10 },
  { vector: [0.56, 0.34, -0.34], label: 'v₂', dx: 9, dy: 13 }
];

function fractionAt(t) {
  if (t < 1.55) return 1;
  if (t < 4.9) return 1 - progress(t, 1.55, 4.9);
  if (t < 6.95) return 0;
  return progress(t, 6.95, 8.1);
}

function dot(ctx, point, radius, fill, border) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = fill;
  ctx.fill();
  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
}

function dashed(ctx, start, end, color) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.7;
  ctx.stroke();
  ctx.restore();
}

function drawMark(ctx, kit, mark, h, orientation) {
  const v = mark.vector;
  const moved = rotate(orientation, v);
  const velocity = cross(omega, v);
  const delta = h === 0 ? velocity : moved.map((value, index) => (value - v[index]) / h);
  const start = project(view, v);
  const tangent = project(view, v.map((value, index) => value + 1.18 * velocity[index]));
  const quotient = project(view, v.map((value, index) => value + delta[index]));

  if (!mark.fixed) {
    dashed(ctx, start, tangent, kit.palette.muted);
    if (h > 0.03) dot(ctx, project(view, moved), 3.25, kit.palette.blue, kit.palette.panel);
    kit.arrow(ctx, start.x, start.y, quotient.x, quotient.y, kit.palette.blue, 2.7);
  }
  dot(ctx, start, 4, kit.palette.panel, kit.palette.ink);
  kit.text(ctx, mark.label, start.x + mark.dx, start.y + mark.dy, { size: 15, weight: 640, align: mark.align });
}

function drawReadout(ctx, kit, h) {
  const x = 470;
  const { palette } = kit;
  kit.pill(ctx, 'A  +30° about x', x, 137, { kind: 'blue' });
  kit.text(ctx, 'Fraction of turn A', x, 178, { color: palette.muted, size: 16 });
  kit.text(ctx, 'h = ' + h.toFixed(2), x, 215, { size: 31, weight: 650 });
  kit.text(ctx, (30 * h).toFixed(1) + '°', 752, 216, { size: 24, align: 'right' });

  ctx.fillStyle = palette.neutral;
  ctx.fillRect(x, 243, 282, 4);
  ctx.fillStyle = palette.blue;
  ctx.fillRect(x, 243, 282 * h, 4);
  dot(ctx, { x: x + h * 282, y: 245 }, 5, palette.blue);

  kit.arrow(ctx, x, 282, x + 29, 282, palette.blue, 2.7);
  kit.text(ctx, h === 0 ? 'Instantaneous motion Jv' : 'Displacement per unit h', x + 40, 282, { size: 16 });
  dashed(ctx, { x, y: 311 }, { x: x + 29, y: 311 }, palette.muted);
  kit.text(ctx, 'Tangent at the start', x + 40, 311, { size: 15, color: palette.muted });

  ctx.fillStyle = palette.blueLight;
  ctx.fillRect(x, 341, 282, 54);
  kit.text(ctx, h === 0 ? 'Jv' : '(v(h) − v) / h', x + 14, 368, { size: 19, weight: 650 });
  kit.text(ctx, 'Jv = ω × v', 738, 368, { size: 17, align: 'right' });
}

export const palette = {
  bg: '#f7f5ef', panel: '#fffefa', ink: '#17243a', muted: '#52617a', line: '#cad1dc',
  blue: '#245fc5', orange: '#b94a21', green: '#146d55',
  blueLight: '#e5edfb', orangeLight: '#f8e7dc', neutral: '#eceef1'
};

export function text(ctx, value, x, y, options = {}) {
  const { size = 18, weight = 500, color = palette.ink, align = 'left', font = 'Segoe UI, sans-serif' } = options;
  ctx.save();
  ctx.font = weight + ' ' + size + 'px ' + font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(String(value), x, y);
  ctx.restore();
}

function rule(ctx, y) {
  ctx.save();
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(36, y + 0.5);
  ctx.lineTo(764, y + 0.5);
  ctx.stroke();
  ctx.restore();
}

export function header(ctx, title, subtitle) {
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, 800, 480);
  text(ctx, title, 36, 36, { size: 33, weight: 650 });
  text(ctx, subtitle, 37, 73, { size: 17, color: palette.muted });
  rule(ctx, 96);
}

export function footer(ctx, left, right = '') {
  rule(ctx, 425);
  text(ctx, left, 37, 451, { size: 16, color: palette.muted });
  if (right) text(ctx, right, 763, 451, { size: 16, color: palette.ink, weight: 600, align: 'right' });
}

export function pill(ctx, value, x, y, options = {}) {
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

export function arrow(ctx, x1, y1, x2, y2, color, width = 2) {
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

export default {
  title: 'Lie algebra',
  description: 'A point on the rotation axis stays fixed. As the turn increment shrinks, displacement per unit increment at two other points converges to the tangent.',
  palette,
  header,
  footer,
  text,
  pill,
  arrow,
  duration,
  draw(ctx, t, kit) {
    const h = fractionAt(t);
    const orientation = rotation('x', h * angleA);

    kit.header(ctx, 'The generator in so(3)', 'Zoom into the start of turn A on the same cube.');
    drawAxis(ctx, kit, view, 'x', kit.palette.blue, 1.24);
    drawCube(ctx, kit, view, orientation, { labels: false });

    for (const mark of marks) drawMark(ctx, kit, mark, h, orientation);
    drawReadout(ctx, kit, h);

    const caption = h === 0 ? 'On the axis, the velocity is zero.' : 'Follow the arrows as the increment shrinks.';
    kit.footer(ctx, caption, 'ω = (π/6, 0, 0)');
  }
};
