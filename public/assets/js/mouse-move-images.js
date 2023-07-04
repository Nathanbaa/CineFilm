const images = document.getElementsByClassName("image");
let globalIndex = 0,
  last = { x: 0, y: 0 };
let isScriptActive = true;

const activate = (image, x, y) => {
  const offsetX = 1; // décalage horizontal par rapport au curseur
  const offsetY = 1; // décalage vertical par rapport au curseur

  image.style.left = `${x - offsetX}px`;
  image.style.top = `${y - offsetY}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
};

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
};

const handleOnMove = (e) => {
  if (!isScriptActive) return;

  const popcornDiv = document.getElementById("popcorn");
  const rect = popcornDiv.getBoundingClientRect();

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  if (
    mouseX >= rect.left &&
    mouseX <= rect.right &&
    mouseY >= rect.top &&
    mouseY <= rect.bottom
  ) {
    if (distanceFromLast(mouseX, mouseY) > window.innerWidth / 20) {
      const lead = images[globalIndex % images.length],
        tail = images[(globalIndex - 5) % images.length];

      if (lead) {
        activate(lead, mouseX, mouseY);
      }

      if (tail) {
        tail.dataset.status = "inactive";
      }

      globalIndex++;
    }
  }
};

const pauseScript = () => {
  isScriptActive = false;
  for (const image of images) {
    image.remove();
  }
};

const resumeScript = () => {
  isScriptActive = true;
};

// document.getElementById("popcorn-box").addEventListener("mouseover", () => {
//   pauseScript();
// });

document.getElementById("popcorn").addEventListener("mouseover", () => {
  resumeScript();
});
// document.getElementById("popcorn-box").addEventListener("mouseout", () => {
//   resumeScript();
// });

window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
