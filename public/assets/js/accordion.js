/**
 * "Infos pratiques" accordion.
 *
 * Headers are real <button>s, so keyboard and screen-reader users get the
 * behaviour for free; this only animates the height and keeps aria-expanded
 * truthful.
 */
(function () {
  const headers = document.querySelectorAll(".accordion-item-header");

  const close = (header) => {
    header.setAttribute("aria-expanded", "false");
    header.nextElementSibling.style.maxHeight = "0px";
  };

  const open = (header) => {
    const body = header.nextElementSibling;
    header.setAttribute("aria-expanded", "true");
    body.style.maxHeight = body.scrollHeight + "px";
  };

  headers.forEach((header) => {
    if (!header.nextElementSibling) return;
    close(header);

    header.addEventListener("click", () => {
      const expanded = header.getAttribute("aria-expanded") === "true";
      expanded ? close(header) : open(header);
    });
  });

  // A reflow (font swap, rotation, resize) changes the natural height of an
  // open panel; re-measure instead of leaving it clipped.
  window.addEventListener("resize", () => {
    headers.forEach((header) => {
      if (header.getAttribute("aria-expanded") === "true") open(header);
    });
  });
})();
