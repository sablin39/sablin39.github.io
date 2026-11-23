import { defineScene, autoPlay, makeCanvas, clearCanvas, text, arrow, vectorAt, palette, format } from './scene-player.js';

function wheel(context, x, y, angle, label) {
  context.beginPath();
  context.arc(x, y, 55, 0, 2 * Math.PI);
  context.fillStyle = palette.panel;
  context.fill();
  context.strokeStyle = palette.line;
  context.lineWidth = 2;
  context.stroke();
  arrow(context, { x, y }, vectorAt({ x, y }, 47, angle), palette.blue, 3);
  text(context, label, x, y + 82, { size: 18, align: 'center', weight: 650 });
}

function draw(figure, x1, x2, shared) {
  const { context } = figure.sceneCanvas;
  clearCanvas(context, 800, 450);
  const omega1 = x1 + x2;
  const omega2 = shared ? omega1 : x2;
  const title = shared ? 'Shared generator: two planes, one independent direction' : 'Axial map: two independent position directions';
  text(context, title, 32, 34, { size: 23, weight: 650 });
  text(context, 'Move x₁ and x₂. When Ωx = 0, neither rotation changes.', 32, 68, { color: palette.muted, size: 16 });

  wheel(context, 190, 190, omega1, 'θ₁');
  wheel(context, 420, 190, omega2, 'θ₂');
  text(context, `θ₁ = ${format(omega1, 2)}`, 115, 305, { size: 18, weight: 650 });
  text(context, `θ₂ = ${format(omega2, 2)}`, 345, 305, { size: 18, weight: 650 });

  text(context, 'Ω', 570, 135, { size: 23, weight: 650 });
  const rows = shared ? [[1, 1], [1, 1]] : [[1, 0], [0, 1]];
  rows.forEach((row, i) => row.forEach((value, j) => {
    const left = 545 + j * 76;
    const top = 160 + i * 66;
    context.fillStyle = palette.blueLight;
    context.fillRect(left, top, 66, 56);
    context.strokeStyle = palette.line;
    context.strokeRect(left, top, 66, 56);
    text(context, value, left + 33, top + 28, { size: 20, align: 'center' });
  }));
  text(context, `rank Ω = ${shared ? 1 : 2}`, 570, 305, { size: 20, weight: 650 });
  text(context, shared ? 'ker Ω = span{(1, −1)}' : 'ker Ω = {0}', 32, 372, { size: 19, color: shared ? palette.orange : palette.green, weight: 650 });
  text(context, shared ? 'Move along (1, −1): position changes, encoding does not.' : 'Every nonzero displacement changes the encoding.', 32, 410, { size: 17, color: palette.muted });
}

defineScene('angle-map', {
  mount(figure) {
    figure.classList.add('rope-interactive');
    figure.sceneCanvas = makeCanvas(figure, 800, 450, 'Animated position-angle map and kernel');
    const state = { x1: 0.5, x2: -0.2, shared: false };
    autoPlay(figure, {
      duration: 12000,
      onFrame(progress) {
        const phase = progress * Math.PI * 2;
        state.shared = progress >= 0.5;
        state.x1 = 0.5 + 0.8 * Math.sin(phase);
        state.x2 = state.shared ? -state.x1 : -0.2 + 0.6 * Math.sin(phase + 0.6);
        draw(figure, state.x1, state.x2, state.shared);
      }
    });
  }
});
