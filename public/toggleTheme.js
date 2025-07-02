const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("mode");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }
});
