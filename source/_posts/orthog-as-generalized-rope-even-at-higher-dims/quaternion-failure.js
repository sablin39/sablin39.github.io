import { defineScene, autoPlay, makeCanvas, clearCanvas, text, palette, format } from './scene-player.js';

function product(xi, eta, reverse) {
  const a = reverse ? eta : xi;
  const b = reverse ? xi : eta;
  const first = [Math.cos(a), Math.sin(a), 0, 0];
  const second = [Math.cos(b), 0, Math.sin(b), 0];
  if (reverse) {
    return [
      first[0] * second[0],
      first[1] * second[0],
      first[0] * second[2],
      -first[1] * second[2]
    ];
  }
  return [
    first[0] * second[0],
    first[1] * second[0],
    first[0] * second[2],
    first[1] * second[2]
  ];
}

function bar(context, x, y, value, index, label, max = 1) {
  text(context, label, x, y - 20, { size: 15, weight: 650 });
  context.fillStyle = palette.neutral;
  context.fillRect(x, y, 170, 30);
  const height = Math.max(1, Math.abs(value) / max * 30);
  context.fillStyle = value >= 0 ? palette.blue : palette.orange;
  if (Math.abs(value) < 0.0001) context.fillStyle = palette.line;
  context.fillRect(x, y + 30 - height, 170, height);
  context.strokeStyle = palette.line;
  context.strokeRect(x, y, 170, 30);
  text(context, format(value), x + 85, y + 57, { size: 17, align: 'center' });
}

function draw(figure, xi, eta) {
  const { context } = figure.sceneCanvas;
  clearCanvas(context, 800, 480);
  text(context, 'Quaternion products differ only in the k component', 32, 34, { size: 24, weight: 650 });
  text(context, 'Move ξ and η. If either is zero, both products coincide.', 32, 68, { color: palette.muted, size: 16 });
  const first = product(xi, eta, false);
  const second = product(xi, eta, true);
  const difference = first.map((value, index) => value - second[index]);
  const expected = 2 * Math.sin(xi) * Math.sin(eta);

  for (const [row, values, label] of [[115, first, 'e^{ξi}e^{ηj}'], [225, second, 'e^{ηj}e^{ξi}']]) {
    text(context, label, 32, row - 24, { size: 19, weight: 650 });
    values.forEach((value, index) => bar(context, 190 + index * 145, row, value, index, ['w', 'x', 'y', 'z'][index]));
  }
  text(context, 'Difference', 32, 337, { size: 19, weight: 650 });
  difference.forEach((value, index) => bar(context, 190 + index * 145, 350, value, index, ['w', 'x', 'y', 'z'][index], 2));
  text(context, `2 sin ξ sin η = ${format(expected)}`, 490, 430, { size: 20, weight: 650 });
  text(context, `nonzero k = ${format(difference[3])}`, 32, 430, { size: 19, color: palette.orange, weight: 650 });
}

defineScene('quaternion-failure', {
  mount(figure) {
    figure.classList.add('rope-interactive');
    figure.sceneCanvas = makeCanvas(figure, 800, 480, 'Animated quaternion product comparison');
    const state = { xi: 0.7, eta: 1.3 };
    autoPlay(figure, {
      duration: 8000,
      onFrame(progress) {
        const angle = progress * Math.PI * 2;
        state.xi = 0.7 + 0.65 * Math.sin(angle);
        state.eta = 1.3 + 0.8 * Math.sin(angle + 0.8);
        draw(figure, state.xi, state.eta);
      }
    });
  }
});
