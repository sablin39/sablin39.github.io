const sceneDefinitions = new Map();
const sceneStates = new WeakMap();

export function defineScene(name, definition) {
  sceneDefinitions.set(name, definition);
}

export function mountScenes(root = document) {
  for (const figure of root.querySelectorAll('[data-rope-scene]')) {
    const name = figure.dataset.ropeScene;
    const definition = sceneDefinitions.get(name);
    if (!definition || figure.dataset.sceneMounted) continue;
    const state = definition.mount(figure);
    sceneStates.set(figure, state);
    figure.dataset.sceneMounted = 'true';
  }
}

export function sceneAt(figure, property, value) {
  const state = sceneStates.get(figure);
  state?.set(property, value);
}

export function makeSlider(figure, name, label, min, max, step, value, onChange) {
  const wrapper = document.createElement('label');
  wrapper.className = 'rope-slider';
  const caption = document.createElement('span');
  caption.textContent = label;
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  input.name = name;
  input.setAttribute('aria-label', label);
  const output = document.createElement('output');
  output.className = 'rope-slider-value';
  const update = () => {
    output.value = input.value;
    onChange(Number(input.value));
  };
  input.addEventListener('input', update);
  wrapper.append(caption, input, output);
  figure.append(wrapper);
  update();
  return input;
}

export function autoPlay(figure, { duration = 6000, onFrame, onState }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'rope-scene-play';
  button.setAttribute('aria-label', 'Pause animation');
  button.textContent = 'Pause';
  figure.append(button);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reducedMotion.matches;
  let requestId = null;
  let startedAt;
  let elapsed = 0;

  function updateButton() {
    button.textContent = playing ? 'Pause' : 'Play';
    button.setAttribute('aria-label', playing ? 'Pause animation' : 'Play animation');
  }

  function stop() {
    if (requestId !== null) cancelAnimationFrame(requestId);
    requestId = null;
    startedAt = undefined;
  }

  function frame(time) {
    if (!figure.isConnected) {
      stop();
      return;
    }
    startedAt ??= time - elapsed;
    elapsed = (time - startedAt) % duration;
    onFrame(elapsed / duration);
    if (playing) requestId = requestAnimationFrame(frame);
  }

  function play() {
    if (requestId !== null) return;
    playing = true;
    updateButton();
    requestId = requestAnimationFrame(frame);
  }

  function pause() {
    playing = false;
    updateButton();
    stop();
  }

  button.addEventListener('click', () => {
    if (playing) pause();
    else play();
  });

  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting) && !reducedMotion.matches) play();
    else pause();
  });
  observer.observe(figure);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) {
      pause();
      onFrame(1);
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else if (!reducedMotion.matches) play();
  });
  onFrame(playing ? 0 : 1);
  updateButton();
  return { play, pause };
}

export function makeCanvas(figure, width, height, ariaLabel) {
  const canvas = document.createElement('canvas');
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.aspectRatio = `${width} / ${height}`;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', ariaLabel);
  const context = canvas.getContext('2d');
  context.scale(2, 2);
  figure.prepend(canvas);
  return { canvas, context, width, height };
}

export function clearCanvas(context, width, height) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = '#f7f5ef';
  context.fillRect(0, 0, width, height);
}

export function text(context, value, x, y, options = {}) {
  const {
    size = 16,
    weight = 500,
    color = '#17243a',
    align = 'left',
    font = 'Segoe UI, sans-serif',
    baseline = 'middle'
  } = options;
  context.save();
  context.font = `${weight} ${size}px ${font}`;
  context.fillStyle = color;
  context.textAlign = align;
  context.textBaseline = baseline;
  context.fillText(String(value), x, y);
  context.restore();
}

export function arrow(context, from, to, color = '#245fc5', width = 3) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  if (length < 1) return;
  const angle = Math.atan2(dy, dx);
  const head = Math.min(14, 5 + width);
  context.save();
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = width;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(from.x, from.y);
  context.lineTo(to.x, to.y);
  context.stroke();
  context.beginPath();
  context.moveTo(to.x, to.y);
  context.lineTo(to.x - head * Math.cos(angle - 0.5), to.y - head * Math.sin(angle - 0.5));
  context.lineTo(to.x - head * Math.cos(angle + 0.5), to.y - head * Math.sin(angle + 0.5));
  context.closePath();
  context.fill();
  context.restore();
}

export function vectorAt(center, radius, angle) {
  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle)
  };
}

export function format(value, digits = 3) {
  return Number(value).toFixed(digits).replace(/\.0+$|(?<=\.\d*?)0+$/g, '');
}

export const palette = {
  background: '#f7f5ef',
  panel: '#fffefa',
  ink: '#17243a',
  muted: '#52617a',
  line: '#cad1dc',
  blue: '#245fc5',
  orange: '#b94a21',
  green: '#146d55',
  blueLight: '#e5edfb',
  orangeLight: '#f8e7dc',
  neutral: '#eceef1'
};
