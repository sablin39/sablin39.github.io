const axes = {
  x: [1, 0, 0],
  y: [0, 1, 0]
};
const toRadians = Math.PI / 180;
export const angleA = 30 * toRadians;
export const angleB = 45 * toRadians;

export function progress(time, start, end) {
  const t = Math.max(0, Math.min(1, (time - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

export function cross([x, y, z], [u, v, w]) {
  return [y * w - z * v, z * u - x * w, x * v - y * u];
}

// Quaternions are stored as [scalar, x, y, z]. Active turns compose right to left.
export function rotation(axis, angle) {
  const half = angle / 2;
  const sine = Math.sin(half);
  return [Math.cos(half), ...axes[axis].map(component => component * sine)];
}

function multiply([a, x, y, z], [b, u, v, w]) {
  return [
    a * b - x * u - y * v - z * w,
    a * u + x * b + y * w - z * v,
    a * v - x * w + y * b + z * u,
    a * w + x * v - y * u + z * b
  ];
}

export function compose(firstAxis, firstAngle, secondAxis, secondAngle) {
  return multiply(rotation(secondAxis, secondAngle), rotation(firstAxis, firstAngle));
}

export function rotate([scalar, ...axis], vector) {
  const first = cross(axis, vector).map(component => 2 * component);
  const second = cross(axis, first);
  return vector.map((component, index) => component + scalar * first[index] + second[index]);
}

export function angleBetween(first, second) {
  const product = first.reduce((sum, component, index) => sum + component * second[index], 0);
  return 2 * Math.acos(Math.min(1, Math.abs(product))) / toRadians;
}

function dot(a, b) {
  return a.reduce((sum, component, index) => sum + component * b[index], 0);
}

function normalized(vector) {
  const length = Math.hypot(...vector);
  return vector.map(value => value / length);
}

const eye = normalized([0.64, -0.72, 0.42]);
const right = normalized(cross([0, 0, 1], eye));
const up = cross(eye, right);

export function project({ x, y, scale }, vector) {
  return { x: x + scale * dot(right, vector), y: y - scale * dot(up, vector) };
}

export function drawAxis(ctx, kit, view, axis, color, extent = 1.15) {
  const from = project(view, axes[axis].map(value => -value * extent));
  const to = project(view, axes[axis].map(value => value * extent));
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.globalAlpha *= 0.66;
  kit.arrow(ctx, from.x, from.y, to.x, to.y, color, 1.8);
  ctx.restore();
  kit.text(ctx, axis, to.x + 8, to.y - 7, { size: 14, weight: 650, color });
}

const half = 0.56;
const faces = [
  { label: '1', normal: [1, 0, 0], span: [[0, 1, 0], [0, 0, 1]], color: '#cee0f5' },
  { label: '4', normal: [-1, 0, 0], span: [[0, 1, 0], [0, 0, 1]], color: '#c1d1e7' },
  { label: '2', normal: [0, 1, 0], span: [[1, 0, 0], [0, 0, 1]], color: '#f5d5ad' },
  { label: '5', normal: [0, -1, 0], span: [[1, 0, 0], [0, 0, 1]], color: '#ddcee8' },
  { label: '3', normal: [0, 0, 1], span: [[1, 0, 0], [0, 1, 0]], color: '#c7e4d7' },
  { label: '6', normal: [0, 0, -1], span: [[1, 0, 0], [0, 1, 0]], color: '#b7d1c5' }
];
const cornerSigns = [[-1, -1], [1, -1], [1, 1], [-1, 1]];

export function drawCube(ctx, kit, view, attitude, { labels = true } = {}) {
  const visible = [];
  for (const { label, normal, span: [u, v], color } of faces) {
    const facing = dot(eye, rotate(attitude, normal));
    if (facing <= 0) continue;
    const center = normal.map(component => component * half);
    const corners = cornerSigns.map(([a, b]) =>
      center.map((component, index) => component + half * (a * u[index] + b * v[index]))
    );
    visible.push({
      label, color, facing,
      points: corners.map(vertex => project(view, rotate(attitude, vertex))),
      center: project(view, rotate(attitude, center))
    });
  }

  ctx.save();
  ctx.lineJoin = 'round';
  visible.sort((a, b) => a.facing - b.facing);
  for (const face of visible) {
    ctx.beginPath();
    face.points.forEach(({ x, y }, index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = face.color;
    ctx.fill();
    ctx.strokeStyle = '#354661';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    if (labels && face.facing > 0.22) {
      kit.text(ctx, face.label, face.center.x, face.center.y, {
        size: view.scale > 60 ? 18 : 14,
        weight: 650,
        align: 'center'
      });
    }
  }
  ctx.restore();
}
