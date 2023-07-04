var btn = document.querySelector("#back-to-top");
// Show back to top button
window.addEventListener("scroll", function () {
  if (window.scrollY > 600) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});
// Back to top effect
btn.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
