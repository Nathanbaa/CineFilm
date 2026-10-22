(function () {
  const btn = document.querySelector("#back-to-top");
  if (!btn) return;

  const update = () => btn.classList.toggle("show", window.scrollY > 600);

  update();
  window.addEventListener("scroll", update, { passive: true });

  btn.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();
