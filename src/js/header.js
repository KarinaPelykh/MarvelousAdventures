const header = document.querySelector(".header");

const handelChangeBackground = () => {
  const scrollingPosition = window.scrollY;

  if (scrollingPosition > 0) {
    header.style.background = "#000000aa";
  } else {
    header.style.background = "transparent ";
  }
};
window.addEventListener("scroll", handelChangeBackground);
