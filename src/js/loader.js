const body = document.querySelector("body");
const loader = document.querySelector(".loader-container");

export const handelShowLoader = () => {
  loader.classList.remove("invisible");
  body.style.overflow = "hidden";
};

export const handelHideLoader = () => {
  setTimeout(() => {
    loader.classList.add("invisible");
    body.style.overflow = "auto";
  }, 1500);
};
