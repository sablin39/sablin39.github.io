import { mountScenes } from './scene-player.js';
import './relative-position.js';
import './quaternion-failure.js';
import './common-plane.js';
import './angle-map.js';
import './feature-slots.js';

const mount = () => mountScenes();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount, { once: true });
} else {
  mount();
}
window.addEventListener('pjax:complete', mount);

const generatorUrl = new URL('./animation-player.js', import.meta.url);
import(generatorUrl.href).then(({ mountAnimations }) => mountAnimations());
