/**
 * Poster trail — film posters follow the cursor across the "billetterie" section.
 *
 * The previous version fed viewport coordinates (e.clientX/Y) straight into the
 * `left`/`top` of posters that are absolutely positioned inside #popcorn, so the
 * whole trail landed at the wrong offset and piled up in a corner of the section.
 * Everything here is expressed relative to the section instead.
 */
(function () {
  const section = document.getElementById("popcorn");
  if (!section) return;

  const images = Array.from(section.getElementsByClassName("image"));
  if (!images.length) return;

  const TRAIL = Math.min(5, images.length - 1); // how many posters stay visible
  const Z_MAX = 20; // stays under the popcorn box / bandeau layers

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const cta = document.getElementById("button-reserver");

  let globalIndex = 0;
  let last = null;
  let frame = 0;
  let overCta = false; // pointer is on the "réserver" button

  /** Minimum travel between two posters, tied to the poster size itself. */
  const step = () => Math.max(70, images[0].offsetWidth * 0.8);

  const place = (image, x, y) => {
    const w = image.offsetWidth || 110;
    const h = image.offsetHeight || w * 1.5;

    // Keep the poster fully inside the section instead of letting it bleed out.
    const cx = Math.min(Math.max(x, w / 2), section.clientWidth - w / 2);
    const cy = Math.min(Math.max(y, h / 2), section.clientHeight - h / 2);

    image.style.left = cx + "px";
    image.style.top = cy + "px";
    image.style.setProperty("--tilt", (globalIndex % 2 ? 1 : -1) * 6 + "deg");
    image.style.zIndex = String((globalIndex % Z_MAX) + 1);
    image.dataset.status = "active";
  };

  const handleOnMove = (point) => {
    if (!point || overCta) return;

    const rect = section.getBoundingClientRect();
    const x = point.clientX - rect.left;
    const y = point.clientY - rect.top;

    // Only react while the pointer is actually over the section.
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    if (last && Math.hypot(x - last.x, y - last.y) < step()) return;
    last = { x, y };

    place(images[globalIndex % images.length], x, y);

    // `(i - TRAIL) % n` goes negative in JS, so the tail never used to clear.
    const tail = images[(globalIndex - TRAIL + images.length * 2) % images.length];
    if (tail && globalIndex >= TRAIL) tail.dataset.status = "inactive";

    globalIndex++;
  };

  const onPointerMove = (e) => {
    if (frame) return; // one update per animation frame
    frame = requestAnimationFrame(() => {
      frame = 0;
      handleOnMove(e);
    });
  };

  const clear = () => {
    images.forEach((image) => (image.dataset.status = "inactive"));
    last = null;
    globalIndex = 0;
  };

  const enabled = () => finePointer.matches && !reduceMotion.matches;

  const sync = () => {
    window.removeEventListener("pointermove", onPointerMove);
    section.removeEventListener("pointerleave", clear);

    if (!enabled()) {
      clear();
      return;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", clear);
  };

  // The "réserver" button is the point of the section: clear the trail out of
  // the way as soon as the pointer reaches it.
  if (cta) {
    cta.addEventListener("pointerenter", () => {
      overCta = true;
      clear();
    });
    cta.addEventListener("pointerleave", () => {
      overCta = false;
    });
  }

  sync();
  reduceMotion.addEventListener("change", sync);
  finePointer.addEventListener("change", sync);
  window.addEventListener("resize", clear);
})();
