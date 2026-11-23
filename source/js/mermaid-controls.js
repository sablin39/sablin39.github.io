'use strict';

(() => {
  const rendered = '.mermaid-frame > pre.mermaid[data-mermaid-rendered]';
  const initialized = new WeakMap();
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
  const directions = new Map([
    ['ArrowLeft', [-1, 0]], ['ArrowRight', [1, 0]],
    ['ArrowUp', [0, -1]], ['ArrowDown', [0, 1]]
  ]);

  function addControls(diagram) {
    const svg = diagram.querySelector(':scope > svg');
    if (!svg || initialized.get(diagram) === svg) return;
    initialized.set(diagram, svg);
    const frame = diagram.parentElement;
    frame.querySelector('.mermaid-inline-controls')?.remove();
    const { x, y, width, height } = svg.viewBox.baseVal;
    if (width <= 0 || height <= 0) return;

    const original = { x, y, width, height };
    let view = original;
    let drag;

    function setView(next) {
      view = {
        ...next,
        x: clamp(next.x, x, x + width - next.width),
        y: clamp(next.y, y, y + height - next.height)
      };
      svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.width} ${view.height}`);
      svg.classList.toggle('mermaid-zoomed', view.width < width);
      svg.setAttribute('tabindex', view.width < width ? '0' : '-1');
    }

    function zoom(factor) {
      const nextWidth = clamp(view.width / factor, width / 8, width);
      const nextHeight = nextWidth * height / width;
      setView({
        x: view.x + (view.width - nextWidth) / 2,
        y: view.y + (view.height - nextHeight) / 2,
        width: nextWidth,
        height: nextHeight
      });
    }

    const toolbar = document.createElement('div');
    toolbar.className = 'mermaid-inline-controls';
    toolbar.setAttribute('role', 'group');
    toolbar.setAttribute('aria-label', 'Diagram zoom');
    for (const [label, text, action] of [
      ['Zoom out', '−', () => zoom(1 / 1.25)],
      ['Zoom in', '+', () => zoom(1.25)],
      ['Reset diagram zoom', 'Reset', () => setView(original)]
    ]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = text;
      button.setAttribute('aria-label', label);
      button.addEventListener('click', action);
      toolbar.appendChild(button);
    }
    frame.prepend(toolbar);

    svg.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || view.width >= width || event.target.closest('a')) return;
      const scale = svg.getScreenCTM();
      if (!scale?.a || !scale.d) return;
      event.preventDefault();
      drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, view, scale };
      svg.focus({ preventScroll: true });
      svg.setPointerCapture(event.pointerId);
    });
    svg.addEventListener('pointermove', event => {
      if (drag?.pointerId !== event.pointerId) return;
      setView({
        ...drag.view,
        x: drag.view.x - (event.clientX - drag.x) / drag.scale.a,
        y: drag.view.y - (event.clientY - drag.y) / drag.scale.d
      });
    });
    svg.addEventListener('lostpointercapture', () => { drag = undefined; });

    svg.addEventListener('keydown', event => {
      const direction = directions.get(event.key);
      if (!direction || event.target !== svg || view.width >= width) return;
      event.preventDefault();
      const [dx, dy] = direction;
      setView({ ...view, x: view.x + dx * view.width / 10, y: view.y + dy * view.height / 10 });
    });
  }

  const update = () => document.querySelectorAll(rendered).forEach(addControls);
  new MutationObserver(records => {
    if (records.some(({ target, addedNodes }) =>
      target.matches?.('pre.mermaid, .mermaid-frame') ||
      Array.from(addedNodes).some(node => node.matches?.('.mermaid-frame, #main'))
    )) update();
  }).observe(document.body, { childList: true, subtree: true });
  update();

  // PJAX history stores HTML. Render restored diagrams again to restore their event handlers.
  window.addEventListener('pjax:complete', () => {
    for (const diagram of document.querySelectorAll('pre.mermaid[data-mermaid-source]')) {
      if (initialized.has(diagram)) continue;
      delete diagram.dataset.mermaidRendered;
      delete diagram.dataset.mermaidRendering;
    }
  }, { capture: true });
})();
