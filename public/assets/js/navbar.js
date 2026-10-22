/**
 * Responsive navigation.
 *
 * The menu is opened/closed with a single `data-nav-open` flag on the header —
 * the stylesheet owns the layout, so there are no inline `display` values left
 * to fight the media queries on resize.
 */
(function () {
  const header = document.getElementById("header");
  if (!header) return;

  const toggle = header.querySelector(".nav__icon");
  const list = header.querySelector("nav ul");
  const links = Array.from(header.querySelectorAll("nav ul a"));
  if (!toggle || !list) return;

  const setOpen = (open) => {
    header.dataset.navOpen = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(header.dataset.navOpen !== "true");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.dataset.navOpen === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // --- Hand-drawn underline on the current section ---
  const underline = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "navbar-hover");
    svg.setAttribute("viewBox", "0 0 130 12");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 2 8 C 40 2 90 10 128 3");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#FF725E");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);
    return svg;
  };

  const markActive = (link) => {
    header.querySelectorAll(".navbar-hover").forEach((el) => el.remove());
    link.appendChild(underline());
  };

  const sections = links
    .map((link) => {
      const id = link.getAttribute("href");
      const target = id && id.startsWith("#") ? document.querySelector(id) : null;
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  sections.forEach(({ link, target }) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      markActive(link);
      setOpen(false);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  // Keep the underline in sync with whatever section is actually on screen.
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const match = sections.find(({ target }) => target === visible.target);
        if (match) markActive(match.link);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(({ target }) => observer.observe(target));
  }
})();
