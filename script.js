document.addEventListener("DOMContentLoaded", function () {
  const navBar = document.querySelector(".nav-bar");
  if (!navBar) return;
  const brand = navBar.querySelector(".nav-brand");
  const navLinks = navBar.querySelector(".nav-links");
  if (!brand || !navLinks) return;

  brand.tabIndex = 0;
  brand.setAttribute("role", "button");
  brand.setAttribute("aria-expanded", "false");

  function toggleMenu(e) {
    e && e.preventDefault();
    const opening = !navBar.classList.contains("expanded");
    navBar.classList.toggle("expanded");
    brand.setAttribute("aria-expanded", opening ? "true" : "false");
    if (!opening) {
      try {
        brand.blur();
      } catch (err) {}
    }
  }

  brand.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu(e);
  });

  brand.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu(e);
    }
  });

  document.addEventListener("click", function (e) {
    if (navBar.classList.contains("expanded") && !navBar.contains(e.target)) {
      navBar.classList.remove("expanded");
      brand.setAttribute("aria-expanded", "false");
      try {
        brand.blur();
      } catch (err) {}
    }
  });

  const links = navLinks.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function () {
      navBar.classList.remove("expanded");
      brand.setAttribute("aria-expanded", "false");
      try {
        brand.blur();
      } catch (err) {}
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 600 && navBar.classList.contains("expanded")) {
      navBar.classList.remove("expanded");
      brand.setAttribute("aria-expanded", "false");
      try {
        brand.blur();
      } catch (err) {}
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      navBar.classList.remove("expanded");
      brand.setAttribute("aria-expanded", "false");
      try {
        brand.blur();
      } catch (err) {}
    }
  });
});
