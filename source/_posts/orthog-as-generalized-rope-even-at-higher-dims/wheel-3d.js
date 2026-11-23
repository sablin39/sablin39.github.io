export function createMountedWheel(kit) {
  const tau = 2 * Math.PI;
  const yaw = 33 * Math.PI / 180;
  const pitch = 29 * Math.PI / 180;
  const right = [Math.cos(yaw), 0, -Math.sin(yaw)];
  const up = [-Math.sin(yaw) * Math.sin(pitch), Math.cos(pitch), -Math.cos(yaw) * Math.sin(pitch)];
  const eye = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)];

  function dot3(axis, x, y, z) {
    return axis[0] * x + axis[1] * y + axis[2] * z;
  }

  function mountedVector(u, v, depth = 0) {
    return { x: dot3(right, u, v, depth), y: -dot3(up, u, v, depth) };
  }

  function mountedPoint(x, y, r, angle, depth = 0) {
    const offset = mountedVector(r * Math.cos(angle), r * Math.sin(angle), depth);
    return { x: x + offset.x, y: y + offset.y };
  }

  function mountedArc(ctx, x, y, r, start, end, depth = 0) {
    const count = Math.max(1, Math.ceil(Math.abs(end - start) * 28));
    for (let i = 0; i <= count; i++) {
      const p = mountedPoint(x, y, r, start + (end - start) * i / count, depth);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
  }

  function profile(r, angle, teeth, sides = 48) {
    const points = [];
    if (teeth) {
      for (let k = 0; k < 24; k++) {
        for (const [offset, ratio] of [[0, 0.925], [0.25, 1], [0.57, 1], [0.83, 0.925]]) {
          const theta = angle + tau * (k + offset) / 24;
          points.push([r * ratio * Math.cos(theta), r * ratio * Math.sin(theta)]);
        }
      }
      return points;
    }
    for (let k = 0; k < sides; k++) {
      const theta = angle + tau * k / sides;
      points.push([r * Math.cos(theta), r * Math.sin(theta)]);
    }
    return points;
  }

  function projectedProfile(x, y, polygon, depth) {
    return polygon.map(([u, v]) => {
      const p = mountedVector(u, v, depth);
      return { x: x + p.x, y: y + p.y };
    });
  }

  function drawPolygon(ctx, points, fill, stroke, width = 1) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (const point of points.slice(1)) ctx.lineTo(point.x, point.y);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = width;
      ctx.stroke();
    }
  }

  function extrude(ctx, x, y, polygon, backZ, frontZ, face, metal) {
    const front = projectedProfile(x, y, polygon, frontZ);
    const back = projectedProfile(x, y, polygon, backZ);
    const visible = [];
    for (let i = 0; i < polygon.length; i++) {
      const j = (i + 1) % polygon.length;
      const [u, v] = polygon[i];
      const [nextU, nextV] = polygon[j];
      const du = nextU - u;
      const dv = nextV - v;
      const span = Math.hypot(du, dv);
      const normal = [dv / span, -du / span];
      if (dot3(eye, normal[0], normal[1], 0) <= 0) continue;
      const lighting = Math.max(0, Math.min(1, 0.5 - 0.34 * normal[0] + 0.42 * normal[1]));
      const shade = metal.map(channel => Math.round(channel * (0.61 + 0.39 * lighting)));
      visible.push({
        depth: dot3(eye, (u + nextU) / 2, (v + nextV) / 2, (backZ + frontZ) / 2),
        points: [front[i], back[i], back[j], front[j]],
        fill: 'rgb(' + shade.join(',') + ')'
      });
    }
    drawPolygon(ctx, back, '#576780', '#45556b', 1.15);
    visible.sort((a, b) => a.depth - b.depth);
    for (const facet of visible) drawPolygon(ctx, facet.points, facet.fill, facet.fill, 0.95);
    drawPolygon(ctx, front, face, '#4e6079', 1.55);
  }

  function surface(ctx, x, y, r) {
    const fill = ctx.createLinearGradient(x - r * 0.50, y - r * 0.76, x + r * 0.53, y + r * 0.71);
    fill.addColorStop(0, '#fdfdff');
    fill.addColorStop(0.48, '#f0f3f8');
    fill.addColorStop(1, '#cfd9e8');
    return fill;
  }

  function strokeSegment(ctx, from, to, color, width) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function wheel(ctx, { x, y, r, angle = 0, color = kit.palette.blue, ghost, mode }) {
    ctx.save();
    ctx.lineJoin = 'round';

    ctx.save();
    ctx.translate(x + 14, y + r * 0.91);
    ctx.scale(1, 0.19);
    const adjustedShadow = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 0.75);
    adjustedShadow.addColorStop(0, 'rgba(44, 59, 82, 0.17)');
    adjustedShadow.addColorStop(1, 'rgba(44, 59, 82, 0)');
    ctx.fillStyle = adjustedShadow;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.75, 0, tau);
    ctx.fill();
    ctx.restore();

    for (let k = 0; k < 24; k++) {
      const tick = tau * k / 24;
      const start = mountedPoint(x, y, r + 4, tick);
      const end = mountedPoint(x, y, r + (k % 6 === 0 ? 12 : 8), tick);
      strokeSegment(ctx, start, end, k === 0 ? kit.palette.ink : '#a7b2c3', k === 0 ? 2.4 : 1);
    }

    const plate = profile(r, angle, mode === 'gear');
    extrude(ctx, x, y, plate, -r * 0.25, 0, surface(ctx, x, y, r), [138, 155, 178]);

    ctx.beginPath();
    mountedArc(ctx, x, y, r * 0.814, 0, tau);
    ctx.closePath();
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#bdc8d9';
    ctx.lineWidth = 1.15;
    ctx.stroke();

    for (let i = 0; i < 2; i++) {
      const a = angle + i * tau / 4;
      const from = mountedPoint(x, y, 0.78 * r, a + Math.PI);
      const to = mountedPoint(x, y, 0.78 * r, a);
      strokeSegment(ctx, from, to, '#c4cdda', 1.15);
    }

    if (typeof ghost === 'number') {
      const hint = mountedPoint(x, y, r * 0.74, ghost);
      ctx.save();
      ctx.setLineDash([5, 5]);
      strokeSegment(ctx, { x, y }, hint, kit.palette.muted, 1.8);
      ctx.restore();
    }

    const point = mountedPoint(x, y, r * 0.77, angle);
    kit.arrow(ctx, x, y, point.x, point.y, color, 3.4);

    const collar = profile(r * 0.155, 0, false, 32);
    extrude(ctx, x, y, collar, 0, r * 0.077, '#cbd4e2', [142, 155, 177]);
    const axle = profile(r * 0.103, 0, false, 32);
    extrude(ctx, x, y, axle, r * 0.077, r * 0.285, '#8698b3', [112, 133, 164]);
    const cap = profile(r * 0.062, Math.PI / 6, false, 6);
    extrude(ctx, x, y, cap, r * 0.285, r * 0.32, '#425773', [90, 114, 144]);
    ctx.restore();
  }

  return { wheel };
}
