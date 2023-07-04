// --- Loader Overlay Script ---
document.addEventListener("DOMContentLoaded", function () {
  let enterButton = document.getElementById("enter-btn");
  enterButton.addEventListener("click", function () {
    gsap.to(".overlay", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
    });

    gsap.to(".img", 2, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
      ease: "power4.inOut",
      stagger: {
        amount: 1.5,
      },
    });

    gsap.to(".loader", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      delay: 2,
    });
  });
});

// --- Card Film Appear ---
const boxes = gsap.utils.toArray(".card-film");
boxes.forEach((box, i) => {
  const anim = gsap.fromTo(
    box,
    {
      autoAlpha: 0,
      y: 80,
    },
    {
      duration: 1,
      autoAlpha: 1,
      y: 0,
    }
  );
  ScrollTrigger.create({
    trigger: box,
    animation: anim,
    toggleActions: "play none none reverse",
  });
});

const informations = gsap.utils.toArray(".accordion-item");
informations.forEach((info, i) => {
  const animation = gsap.fromTo(
    info,
    {
      autoAlpha: 0,
      y: 60,
    },
    {
      duration: 1,
      autoAlpha: 1,
      y: 0,
    }
  );
  ScrollTrigger.create({
    trigger: info,
    animation: animation,
    toggleActions: "play none none none",
  });
});
