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

export default {
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
