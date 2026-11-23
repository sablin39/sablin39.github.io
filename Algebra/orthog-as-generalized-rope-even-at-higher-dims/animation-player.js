import algebra from './algebra.js';

const drawing = {
  width: 800,
  height: 480,
  palette: algebra.palette,
  header: algebra.header,
  footer: algebra.footer,
  text: algebra.text,
  pill: algebra.pill,
  arrow: algebra.arrow
};
const scene = algebra;

function mount(figure, scene) {
  const canvas = document.createElement('canvas');
  const density = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(drawing.width * density);
  canvas.height = Math.round(drawing.height * density);
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', scene.description);
  canvas.textContent = scene.description;
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return;

  const controls = document.createElement('div');
  controls.className = 'rope-scene-controls';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'rope-scene-play';

  const timeline = document.createElement('input');
  timeline.type = 'range';
  timeline.className = 'rope-scene-seek';
  timeline.min = '0';
  timeline.max = String(scene.duration);
  timeline.step = 'any';
  timeline.value = '0';
  timeline.setAttribute('aria-label', scene.title + ' timeline in seconds');
  controls.append(toggle, timeline);
  figure.prepend(canvas, controls);

  let elapsed = 0;
  let startedAt;
  let requestId = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function updateButton(label) {
    toggle.textContent = label;
    toggle.setAttribute('aria-label', label + ' ' + scene.title.toLowerCase());
  }

  function paint() {
    context.save();
    context.setTransform(canvas.width / drawing.width, 0, 0, canvas.height / drawing.height, 0, 0);
    scene.draw(context, Math.min(elapsed, scene.duration - 0.000001), drawing);
    context.restore();
    timeline.value = String(elapsed);
  }

  function pause() {
    if (requestId !== null) cancelAnimationFrame(requestId);
    requestId = null;
    startedAt = undefined;
    updateButton(elapsed >= scene.duration ? 'Replay' : 'Play');
  }

  function frame(time) {
    if (!figure.isConnected) {
      pause();
      return;
    }

    startedAt ??= time - elapsed * 1000;
    elapsed = Math.min(scene.duration, (time - startedAt) / 1000);
    paint();
    if (elapsed >= scene.duration) pause();
    else requestId = requestAnimationFrame(frame);
  }

  toggle.addEventListener('click', () => {
    if (requestId !== null) {
      pause();
      return;
    }

    if (elapsed >= scene.duration) elapsed = 0;
    updateButton('Pause');
    requestId = requestAnimationFrame(frame);
  });

  timeline.addEventListener('input', () => {
    elapsed = timeline.valueAsNumber;
    pause();
    paint();
  });

  updateButton('Play');
  paint();
  if (!reducedMotion.matches) {
    updateButton('Pause');
    requestId = requestAnimationFrame(frame);
  }
}

export function mountAnimations() {
  for (const figure of document.querySelectorAll('figure.rope-scene[data-rope-scene="algebra"]')) {
    if (!figure.querySelector('canvas')) mount(figure, scene);
  }
}
