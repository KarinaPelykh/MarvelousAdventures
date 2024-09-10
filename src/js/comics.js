import getData from "./modal.js";
import { handelMakeSlider } from "./sliderInicializacion.js";
import { fetchAuthorization, getInformationAboutComics } from "./Api.js";
const body = document.querySelector("body");
const list = document.querySelector(".js-comics");

const limit = 6;

fetchAuthorization(limit)
  .then((data) => {
    const { results } = data.data;
    handelAddHtml(results);
  })
  .catch((error) => {
    console.log(error);
  });

const defaultPhoto =
  "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";

const handelHtml = ({ id, title, name, imgUrl }, index) => {
  const changesTitle = title.indexOf("#");
  const newTitle = title.slice(0, changesTitle);

  return ` <li id=${id}     class="item-comics swiper-slide">
                 <img class="img-comics" src=${imgUrl} alt="marvel hero"/>
                  <div class="">
                 <h3 class="title-comics">${newTitle}</h3>
                 <p class="author">${name ? name : "Kat Gin"}</p>
                  </div>
                </li>
       `;
};

const handelAddHtml = (results) => {
  const item = results
    .map(({ id, title, creators, images }, index) => {
      const imgUrl = images[0]?.path
        ? `${images[0]?.path}.${images[0]?.extension}`
        : defaultPhoto;
      const name = creators.items ? creators.items[0]?.name : "-";
      return handelHtml({ id, title, name, imgUrl }, index);
    })
    .join("");
  list.innerHTML = item;

  list.addEventListener("click", handelGetIdInfo);
  const sliderElement = document.querySelectorAll(".item-comics");
  handelMakeSlider(sliderElement);
};

const handelGetIdInfo = (e) => {
  const item = e.target.closest(".item-comics");
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
