/**
 * Entrance animations.
 *
 * Everything here is progressive enhancement: if the GSAP CDN is unreachable,
 * or the visitor asked for reduced motion, the page simply renders static —
 * the old version left every film card stuck at autoAlpha:0 in that case.
 */
(function () {
  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // --- Loader overlay ---
  const enterButton = document.getElementById("enter-btn");
  const overlay = document.querySelector(".overlay");

  const hideOverlay = () => {
    document.querySelector(".loader")?.remove();
    overlay?.remove();
    document.body.style.removeProperty("overflow");
  };

  if (enterButton && overlay) {
    // The overlay covers the page, so freeze the scroll behind it.
    if (getComputedStyle(overlay).display !== "none") {
      document.body.style.overflow = "hidden";
    }

    enterButton.addEventListener("click", () => {
      if (!hasGsap || reduceMotion) {
        hideOverlay();
        return;
      }

      document.body.style.removeProperty("overflow");

      gsap.to(".overlay", {
        duration: 2,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power4.inOut",
      });

      gsap.to(".img", {
        duration: 2,
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        ease: "power4.inOut",
        stagger: { amount: 1.5 },
      });

      gsap.to(".loader", {
        duration: 2,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power4.inOut",
        delay: 2,
        // Once it is out of the way, take it out of the document entirely.
        onComplete: hideOverlay,
      });
    });
  }

  // --- Reveal on scroll ---
  if (!hasGsap || !hasScrollTrigger || reduceMotion) return;

  const reveal = (selector, distance, toggleActions) => {
    gsap.utils.toArray(selector).forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        animation: gsap.fromTo(
          el,
          { autoAlpha: 0, y: distance },
          { duration: 1, autoAlpha: 1, y: 0 }
        ),
        toggleActions,
      });
    });
  };

  reveal(".card-film", 80, "play none none reverse");
  reveal(".accordion-item", 60, "play none none none");
})();
