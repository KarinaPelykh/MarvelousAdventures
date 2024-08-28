import axios from "axios";
import CryptoJS from "crypto-js";
import getData from "./modal.js";

const list = document.querySelector(".js-comics");

const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";

const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
const url = `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`;
const limit = 6;

const fetchAuthorization = async () => {
  try {
    const { data } = await axios.get(
      `${url}&limit=${limit}&dateDescriptor=lastWeek`
    );
    console.log(data);

    const { results } = data.data;

    handelAddHtml(results);
  } catch (error) {
    console.log(error);
  }
};

fetchAuthorization();

const defaultPhoto =
  "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";

const handelHtml = ({ id, title, name, imgUrl }) => {
  return ` <li id=${id}  class="item-comics swiper-slide">
                 <img class="img-comics" src=${imgUrl} alt="marvel hero"/>
                  <div class="">
                 <h3 class="title-comics">${title}</h3>
                 <p class="author">${name ? name : "Kat Gin"}</p>
                  </div>
                </li>
       `;
};

const handelAddHtml = (results) => {
  const item = results
    .map(({ id, title, creators, images }) => {
      const imgUrl = images[0]?.path
        ? `${images[0]?.path}.${images[0]?.extension}`
        : defaultPhoto;
      const name = creators.items ? creators.items[0]?.name : "-";
      return handelHtml({ id, title, name, imgUrl });
    })
    .join("");
  list.innerHTML = item;

  list.addEventListener("click", handelGetIdInfo);

  const sliderElement = document.querySelectorAll(".item-comics");
  handelMakeSlider(sliderElement);

  console.log(sliderElement);
};

const handelMakeSlider = (sliderElement) => {
  if (sliderElement.length !== 0) {
    const swiperInstance = new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      spaceBetween: 16,

      pagination: {
        el: ".swiper-pagination",
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        335: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },

        1440: {
          slidesPerView: 3,
        },
      },
    });
    swiperInstance.update();
  }
};

const getInformationAboutComics = async (comicId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/v1/public/comics/${comicId}?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`
    );
    getData(data);
    const modal = document.querySelector(".modal-window");
    modal.classList.toggle("is-modal-open");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const handelGetIdInfo = (e) => {
  const item = e.target.closest(".item-comics");
  getInformationAboutComics(item.id);
};
