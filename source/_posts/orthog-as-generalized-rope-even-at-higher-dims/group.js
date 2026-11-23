import { angleA, angleB, angleBetween, compose, drawAxis, drawCube, progress } from './so3.js';

const caseDuration = 6;
const duration = caseDuration * 2;

function drawRun(ctx, kit, view, title, axisB, reverse, first, second) {
  const { blue, orange } = kit.palette;
  kit.text(ctx, title, view.x, 152, { size: 17, weight: 650, align: 'center' });
  drawAxis(ctx, kit, view, 'x', blue);
  if (axisB !== 'x') drawAxis(ctx, kit, view, axisB, orange);

  const attitude = reverse
    ? compose(axisB, angleB * first, 'x', angleA * second)
    : compose('x', angleA * first, axisB, angleB * second);
  drawCube(ctx, kit, view, attitude);
  return attitude;
}

export default {
  duration,
  draw(ctx, t, kit) {
    const sharedAxis = t < caseDuration;
    const local = t % caseDuration;
    const axisB = sharedAxis ? 'x' : 'y';
    const first = progress(local, 0.45, 1.95);
    const second = progress(local, 2.35, 4.0);
    const finished = second === 1;

    kit.header(ctx, 'Group composition in SO(3)', 'Apply the same two turns about fixed world axes.');
    kit.pill(ctx, 'A  +30° about x', 36, 123, { kind: 'blue' });
    kit.pill(ctx, 'B  +45° about ' + axisB, 169, 123, { kind: 'orange' });

    const left = drawRun(ctx, kit, { x: 212, y: 264, scale: 103 }, 'A then B', axisB, false, first, second);
    const right = drawRun(ctx, kit, { x: 588, y: 264, scale: 103 }, 'B then A', axisB, true, first, second);

    if (finished) {
      const distance = angleBetween(left, right);
      if (sharedAxis) {
        kit.text(ctx, 'Same final orientation · 75° about x', 400, 391, {
          size: 20, weight: 650, align: 'center', color: kit.palette.green
        });
      } else {
        kit.text(ctx, 'Different final orientations · ' + distance.toFixed(1) + '° apart', 400, 391, {
          size: 20, weight: 650, align: 'center'
        });
      }
    }

    const stage = sharedAxis ? 'A and B share one axis' : 'A and B use perpendicular axes';
    const cue = finished ? (sharedAxis ? 'Next, move B to the y-axis' : 'Zoom into the start of turn A') : '';
    kit.footer(ctx, stage, cue);
  }
};
