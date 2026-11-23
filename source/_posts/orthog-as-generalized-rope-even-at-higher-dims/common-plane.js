import { defineScene, makeSlider, makeCanvas, clearCanvas, text, palette, format } from './scene-player.js';

function matrixGrid(context, matrix, left, top, title, subtitle) {
  text(context, title, left, top - 60, { size: 21, weight: 650 });
  text(context, subtitle, left, top - 30, { size: 15, color: palette.muted });
  const cell = 72;
  matrix.forEach((row, rowIndex) => row.forEach((value, columnIndex) => {
    const x = left + columnIndex * cell;
    const y = top + rowIndex * cell;
    context.fillStyle = Math.abs(value) > 0.0001 ? palette.blueLight : palette.panel;
    context.fillRect(x, y, cell - 5, cell - 5);
    context.strokeStyle = palette.line;
    context.strokeRect(x, y, cell - 5, cell - 5);
    text(context, format(value, 2), x + (cell - 5) / 2, y + (cell - 5) / 2, { size: 17, align: 'center' });
  }));
}

function rotatePlane(vector, angle) {
  const [x, y] = vector;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c - y * s, x * s + y * c];
}

function matrixFor(angle) {
  const a = rotatePlane([1, 0], angle);
  const b = rotatePlane([0, 1], angle);
  return [
    [a[0], -b[0], 0, 0],
    [a[1], -b[1], 0, 0],
    [0, 0, a[0], -b[0]],
    [0, 0, a[1], -b[1]]
  ];
}

function draw(figure, angle) {
  const { context } = figure.sceneCanvas;
  clearCanvas(context, 800, 430);
  text(context, 'One shared basis, two independent rotation planes', 32, 34, { size: 24, weight: 650 });
  text(context, `θ = ${format(angle, 2)}   P = diag(Rθ, Rθ)   θK = θ diag(K, K)`, 32, 68, { color: palette.muted, size: 16 });
  const left = matrixFor(angle);
  const right = [
    [0, -angle, 0, 0],
    [angle, 0, 0, 0],
    [0, 0, 0, -angle],
    [0, 0, angle, 0]
  ];
  matrixGrid(context, left, 35, 150, 'A(θ)', 'The same two planes in the standard basis');
  matrixGrid(context, right, 430, 150, 'Pᵀ A(θ) P', 'Off-diagonal blocks stay zero for every θ');
  text(context, 'P is fixed; only the two rotation angles change.', 35, 397, { size: 18, weight: 650 });
}

defineScene('common-plane', {
  mount(figure) {
    figure.classList.add('rope-interactive');
    figure.sceneCanvas = makeCanvas(figure, 800, 430, 'Interactive shared-plane matrix decomposition');
    const state = { angle: 0.7 };
    makeSlider(figure, 'plane-angle', 'θ', -Math.PI, Math.PI, 0.05, state.angle, value => {
      state.angle = value;
      draw(figure, state.angle);
    });
    draw(figure, state.angle);
    return { set: (name, value) => { state[name] = value; draw(figure, state.angle); } };
  }
});
