let menuIcon = document.querySelector(".menu-icon");
let navList = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
  navList.classList.toggle("open");
});
