{
  const playerUrl = new URL('./animation-player.js', document.currentScript.src);
  import(playerUrl.href).then(({ mountAnimations }) => mountAnimations());
}
