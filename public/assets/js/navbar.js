// Responsive navbar
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".nav__icon").addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector("nav ul").classList.toggle("active");
    if (document.querySelector("nav ul").classList.contains("active")) {
      document.querySelector("nav ul").style.display = "block";
    } else {
      document.querySelector("nav ul").style.display = "none";
    }
  });

  window.addEventListener("load", function () {
    adjustNavigation();
  });

  window.addEventListener("resize", function () {
    adjustNavigation();
  });

  function adjustNavigation() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var x = 700;
    if (w >= x) {
      document.querySelector("nav ul").style.display = "flex";
      document.querySelector("nav ul").style.height = "auto";
    } else {
      document.querySelector("nav ul").style.display = "none";
      document.querySelector("nav ul").style.height = h + "px";
    }
  }
});

// Hover effect
const listItems = document.querySelectorAll(".list-item");
const svgCode =
  '<svg class="navbar-hover" style="position: absolute; top:25px; left:1px" width="90%" height="110"><path d="M 0 0 C 0 8 200 -1 125 0" fill="none" stroke="#FF725E" stroke-width="3"/></svg>';
let activeSvg = null;
let isDefaultSvgRemoved = false;

listItems.forEach((listItem) => {
  const link = listItem.querySelector("a");
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (!isDefaultSvgRemoved) {
      const defaultSvg = document.querySelector(".list-item:first-child svg");
      defaultSvg.remove();
      isDefaultSvgRemoved = true;
    }

    if (activeSvg) {
      activeSvg.remove();
    }

    const svgElement = document.createElement("div");
    svgElement.innerHTML = svgCode;
    activeSvg = svgElement.firstElementChild;

    link.appendChild(activeSvg);

    // Scroll vers l'ancre
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});
