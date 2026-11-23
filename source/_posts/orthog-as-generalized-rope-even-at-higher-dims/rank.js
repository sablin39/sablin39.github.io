import { angleA, angleB, angleBetween, compose, drawCube, progress } from './so3.js';

const duration = 7.75;
const degrees = radians => Math.round(radians * 180 / Math.PI) + '°';

function drawCubeRun(ctx, kit, center, label, orientation) {
  kit.text(ctx, label, center, 180, { size: 15, weight: 650, align: 'center' });
  drawCube(ctx, kit, { x: center, y: 265, scale: 69 }, orientation);
}

function drawWheelRun(ctx, kit, y, label, angleFirst, angleSecond, finished) {
  const { blue, orange, green, muted } = kit.palette;
  kit.text(ctx, label, 432, y - 15, { size: 14, weight: 650 });
  kit.text(ctx, '(' + degrees(angleFirst) + ', ' + degrees(angleSecond) + ')',
    432, y + 12, { size: 15, color: finished ? green : muted });
  kit.wheel(ctx, { x: 600, y, r: 40, angle: angleFirst, color: blue, mode: 'gear' });
  kit.wheel(ctx, { x: 715, y, r: 40, angle: angleSecond, color: orange, mode: 'gear' });
}

export default {
  duration,
  draw(ctx, t, kit) {
    const first = progress(t, 0.7, 2.55);
    const second = progress(t, 3.05, 5.1);
    const finished = second === 1;
    const orderAB = compose('x', angleA * first, 'y', angleB * second);
    const orderBA = compose('y', angleB * first, 'x', angleA * second);
    const { line, muted, blue, orange, green } = kit.palette;

    kit.header(ctx, 'One order test, two constructions', 'Replay A (+30°) and B (+45°) in both orders.');
    ctx.save();
    ctx.strokeStyle = line;
    ctx.beginPath();
    ctx.moveTo(400.5, 111);
    ctx.lineTo(400.5, 408);
    ctx.stroke();
    ctx.restore();

    kit.text(ctx, 'Quaternion turns', 36, 124, { size: 21, weight: 650 });
    kit.text(ctx, 'so(3) · A about x, B about y', 36, 149, { size: 15, color: muted });
    drawCubeRun(ctx, kit, 118, 'A then B', orderAB);
    drawCubeRun(ctx, kit, 300, 'B then A', orderBA);

    kit.text(ctx, 'Disjoint feature planes', 432, 124, { size: 21, weight: 650 });
    kit.text(ctx, 'so(4) · Each turn acts on its own pair', 432, 149, { size: 15, color: muted });
    kit.text(ctx, 'A · (1, 2)', 600, 175, { size: 14, weight: 650, align: 'center', color: blue });
    kit.text(ctx, 'B · (3, 4)', 715, 175, { size: 14, weight: 650, align: 'center', color: orange });

    drawWheelRun(ctx, kit, 231, 'A then B', angleA * first, angleB * second, finished);
    drawWheelRun(ctx, kit, 334, 'B then A', angleA * second, angleB * first, finished);

    if (finished) {
      const angle = angleBetween(orderAB, orderBA).toFixed(1);
      kit.text(ctx, 'Different orientations · ' + angle + '° apart', 213, 399, {
        size: 16, weight: 650, align: 'center'
      });
      kit.text(ctx, 'Same pair of angles', 599, 399, {
        size: 16, weight: 650, align: 'center', color: green
      });
      kit.footer(ctx, 'Rank 1 in so(3)', 'Rank 2 in so(4)');
    } else {
      kit.footer(ctx, second > 0 ? 'Apply each second turn' : 'Apply each first turn');
    }
  }
};
