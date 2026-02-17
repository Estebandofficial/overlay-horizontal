// dist/player.js — versión lista para el navegador (transpilada desde TypeScript)
(function () {
  function initVideo() {
    var video = document.querySelector('.video');
    if (!video)
      return;
    // Garantizar autoplay silencioso
    video.muted = true;
    video.setAttribute('playsinline', '');
    var playSafely = function () {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () {
          video.muted = true;
          video.play().catch(function () { });
        });
      }
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      playSafely();
    }
    else {
      document.addEventListener('DOMContentLoaded', playSafely);
    }
  }
  initVideo();
})();
