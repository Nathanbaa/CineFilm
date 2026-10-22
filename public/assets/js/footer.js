/**
 * Footer "screen" animation.
 *
 * The waving hands are a hover reward: they stay stopped until the pointer is
 * on the white screen. On touch (no hover available) they play whenever the
 * footer is on screen instead.
 */
(function () {
  const player = document.getElementById("player");
  const screen = document.getElementById("player-event");
  const footer = document.getElementById("cinema");
  if (!player || !screen || !footer) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  let ready = false;
  let wanted = false;

  const sync = () => {
    if (!ready) return;
    wanted ? player.play() : player.stop();
  };

  const want = (value) => {
    wanted = value;
    sync();
  };

  player.addEventListener("ready", () => {
    ready = true;
    sync();
  });

  screen.addEventListener("pointerenter", () => canHover.matches && want(true));
  screen.addEventListener("pointerleave", () => canHover.matches && want(false));
  screen.addEventListener("focusin", () => want(true));
  screen.addEventListener("focusout", () => want(false));

  // Touch devices get no hover, so tie it to visibility instead.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        if (!canHover.matches) want(entry.isIntersecting);
        else if (!entry.isIntersecting) want(false);
      },
      { threshold: 0.2 }
    ).observe(footer);
  }
})();
