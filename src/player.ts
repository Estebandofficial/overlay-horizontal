/**
 * src/player.ts
 * Lógica para forzar autoplay seguro en el video (muted + playsinline).
 */

const initVideo = (): void => {
  const video = document.querySelector<HTMLVideoElement>('.video');
  if (!video) return;

  // Garantizar que el navegador permita autoplay
  video.muted = true;
  video.setAttribute('playsinline', '');

  const playSafely = (): void => {
    const p = video.play();
    if (p && typeof (p as Promise<void>).catch === 'function') {
      (p as Promise<void>).catch(() => {
        // Si el primer intento es bloqueado, mantener en mute e intentar de nuevo
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    playSafely();
  } else {
    document.addEventListener('DOMContentLoaded', playSafely);
  }
};

initVideo();
