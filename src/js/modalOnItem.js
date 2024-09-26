import { getInformationAboutComics } from "./Api";
import getData from "./modal";
const list = document.querySelector(".all-comics");
const body = document.querySelector("body");

export const handelItemComics = (e) => {
  const item = e.target.closest(".comic-list-item");
  getInformationAboutComics(item.id)
    .then((data) => {
      getData(data);
      const modal = document.querySelector(".modal-window");
      modal.classList.toggle("is-modal-open");
      const IsOpen = modal.classList.contains("is-modal-open");
      body.style.overflow = "auto";
      if (IsOpen) {
        body.style.overflow = "hidden";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

list.addEventListener("click", handelItemComics);
