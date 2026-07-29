const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const navigationLinks = navigation.querySelectorAll("a");
const dropdowns = document.querySelectorAll(".nav-dropdown");

function closeDropdown(dropdown) {
  const button = dropdown.querySelector(".dropdown-toggle");
  button.setAttribute("aria-expanded", "false");
  dropdown.classList.remove("is-open");
}

function closeAllDropdowns() {
  dropdowns.forEach(closeDropdown);
}

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  closeAllDropdowns();
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".dropdown-toggle");

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = button.getAttribute("aria-expanded") === "true";
    closeAllDropdowns();
    button.setAttribute("aria-expanded", String(!isOpen));
    dropdown.classList.toggle("is-open", !isOpen);
  });
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", () => {
  closeAllDropdowns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openDropdown = document.querySelector(".nav-dropdown.is-open");
    if (openDropdown) {
      const button = openDropdown.querySelector(".dropdown-toggle");
      closeDropdown(openDropdown);
      button.focus();
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
