import { defineScene, autoPlay, makeCanvas, clearCanvas, text, arrow, vectorAt, palette, format } from './scene-player.js';

const center = { x: 220, y: 205 };
const q = [1, 0.45];
const k = [-0.2, 1];
const norm = vector => Math.hypot(vector[0], vector[1]);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const unit = vector => {
  const length = norm(vector);
  return vector.map(value => value / length);
};
const rotate = (vector, angle) => {
  const [x, y] = unit(vector);
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c - y * s, x * s + y * c];
};
const angleOf = vector => Math.atan2(vector[1], vector[0]);

function draw(figure, x, y) {
  const { context } = figure.sceneCanvas;
  clearCanvas(context, 800, 460);
  text(context, 'The score depends on displacement, not absolute position', 32, 34, { size: 24, weight: 650 });
  text(context, 'Move x and y together: the dot product is invariant.', 32, 68, { color: palette.muted, size: 16 });
  text(context, `x = ${format(x, 1)}   y = ${format(y, 1)}   y − x = ${format(y - x, 1)}`, 32, 102, { size: 18, weight: 650 });

  const qRotated = rotate(q, x);
  const kRotated = rotate(k, y);
  const score = dot(unit(qRotated), unit(kRotated));
  const relativeAngle = Math.acos(Math.max(-1, Math.min(1, score)));
  const origin = { x: center.x, y: center.y };
  for (const radius of [65, 125]) {
    context.beginPath();
    context.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
    context.strokeStyle = palette.line;
    context.lineWidth = 1;
    context.stroke();
  }
  arrow(context, origin, vectorAt(origin, 145, angleOf(qRotated)), palette.blue, 4);
  arrow(context, origin, vectorAt(origin, 145, angleOf(kRotated)), palette.orange, 4);
  text(context, 'q', vectorAt(origin, 166, angleOf(qRotated)).x, vectorAt(origin, 166, angleOf(qRotated)).y, { color: palette.blue, size: 20, weight: 650 });
  text(context, 'k', vectorAt(origin, 166, angleOf(kRotated)).x, vectorAt(origin, 166, angleOf(kRotated)).y, { color: palette.orange, size: 20, weight: 650 });
  text(context, `angle = ${format(relativeAngle)}`, 32, 385, { size: 18, weight: 650 });
  text(context, `score = qᵀ Rₓᵀ Rᵧ k = ${format(score)}`, 32, 420, { size: 21, weight: 650 });
  figure.dataset.score = String(score);

  text(context, 'score against y − x', 490, 130, { size: 18, weight: 650 });
  const graph = { left: 490, top: 160, width: 265, height: 175 };
  context.strokeStyle = palette.line;
  context.lineWidth = 1.4;
  context.strokeRect(graph.left, graph.top, graph.width, graph.height);
  context.beginPath();
  context.moveTo(graph.left, graph.top + graph.height / 2);
  context.lineTo(graph.left + graph.width, graph.top + graph.height / 2);
  context.stroke();
  for (let index = 0; index <= 40; index++) {
    const displacement = -2 * Math.PI + index * Math.PI / 20;
    const px = graph.left + index / 40 * graph.width;
    const py = graph.top + graph.height / 2 - Math.cos(displacement) * 60;
    if (index === 0) context.moveTo(px, py);
    else context.lineTo(px, py);
  }
  context.strokeStyle = palette.blue;
  context.lineWidth = 2;
  context.stroke();
  const currentX = graph.left + (y - x + 2 * Math.PI) / (4 * Math.PI) * graph.width;
  const currentY = graph.top + graph.height / 2 - score * 60;
  context.beginPath();
  context.arc(currentX, currentY, 6, 0, 2 * Math.PI);
  context.fillStyle = palette.orange;
  context.fill();
  text(context, 'independent of x alone', 490, 365, { size: 16, color: palette.muted });
}

defineScene('relative-position', {
  mount(figure) {
    figure.classList.add('rope-interactive');
    figure.sceneCanvas = makeCanvas(figure, 800, 460, 'Animated relative-position dot-product demonstration');
    const state = { x: 0.4, y: 1.3 };
    autoPlay(figure, {
      duration: 9000,
      onFrame(progress) {
        const angle = progress * Math.PI * 2;
        state.x = 0.4 + 0.8 * Math.sin(angle);
        state.y = 1.3 + 0.8 * Math.sin(angle + 0.65);
        draw(figure, state.x, state.y);
      }
    });
  }
});
