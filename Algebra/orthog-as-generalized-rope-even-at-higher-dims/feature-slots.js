import { defineScene, autoPlay, makeCanvas, clearCanvas, text, arrow, vectorAt, palette } from './scene-player.js';

function slot(context, x, y, index, angle, occupied) {
  context.strokeStyle = occupied ? palette.blue : palette.line;
  context.lineWidth = occupied ? 2.5 : 1.5;
  context.strokeRect(x, y, 100, 112);
  text(context, `plane ${index + 1}`, x + 50, y - 20, { size: 16, align: 'center', weight: 650 });
  text(context, `features ${2 * index + 1}, ${2 * index + 2}`, x + 50, y + 137, { size: 14, align: 'center', color: palette.muted });
  context.beginPath();
  context.arc(x + 50, y + 56, 34, 0, 2 * Math.PI);
  context.stroke();
  if (occupied) arrow(context, { x: x + 50, y: y + 56 }, vectorAt({ x: x + 50, y: y + 56 }, 29, angle), palette.blue, 3);
  else text(context, 'shared', x + 50, y + 56, { size: 15, align: 'center', color: palette.muted });
}

function draw(figure, n, used, progress = 0) {
  const { context } = figure.sceneCanvas;
  clearCanvas(context, 800, 450);
  const m = Math.floor(n / 2);
  text(context, `Feature slots: n = ${n}, so m = ⌊n/2⌋ = ${m}`, 32, 34, { size: 24, weight: 650 });
  text(context, 'Each plane can carry one independent position-angle direction.', 32, 68, { color: palette.muted, size: 16 });
  const gap = (800 - 64 - m * 100) / Math.max(1, m - 1);
  for (let index = 0; index < m; index++) {
    const angle = index < used ? index * 0.65 + 0.35 + progress * Math.PI * 2 : 0;
    slot(context, 32 + index * (100 + gap), 135, index, angle, index < used);
  }
  if (n % 2) text(context, 'One coordinate remains fixed.', 32, 315, { size: 17, color: palette.muted });
  text(context, `Independent position directions used: ${used} / ${m}`, 32, 370, { size: 21, weight: 650 });
  text(context, used === m ? 'All available planes are used; another direction must share an angle.' : 'An unused plane can receive a new independent direction.', 32, 410, { size: 17, color: used === m ? palette.orange : palette.muted });
}

defineScene('feature-slots', {
  mount(figure) {
    figure.classList.add('rope-interactive');
    figure.sceneCanvas = makeCanvas(figure, 800, 450, 'Animated feature-slot count for orthogonal RoPE');
    const state = { n: 6, used: 2 };
    autoPlay(figure, {
      duration: 10000,
      onFrame(progress) {
        state.n = progress < 0.5 ? 6 : 5;
        const phase = progress < 0.5 ? progress * 2 : (progress - 0.5) * 2;
        state.used = Math.min(Math.floor(state.n / 2), Math.floor(phase * (Math.floor(state.n / 2) + 1)));
        draw(figure, state.n, state.used, progress);
      }
    });
  }
});
