// import axios from "axios";
// import CryptoJS from "crypto-js";

// const ref = {
//   buttonPrev: document.querySelector(".js-previous"),
//   buttonNext: document.querySelector(".js-next"),
//   wrapper: document.querySelector(".js-button-wrapper"),
// };
// const list = document.querySelector(".js-comics");

// const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
// const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
// const BASE_URL = "https://gateway.marvel.com:443";
// const TS = "karina";

// const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
// const url = `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`;

// let page = 2;
// const limit = 3;

// const defaultPhoto =
//   "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";
// const handelAddHtml = (results) => {
//   const item = results
//     .map(({ title, creators, images }) => {
//       const imgUrl = images[0]?.path
//         ? `${images[0]?.path}.${images[0]?.extension}`
//         : defaultPhoto;
//       const name = creators.items ? creators.items[0]?.name : "-";
//       return `<li class="item-comics">
//              <img class="img-comics" src=${imgUrl} alt="marvel hero"/>
//                   <div class="">
//                  <h3 class="title-comics">${title}</h3>
//                  <p class="author">${name ? name : "Kat Gin"}</p>
//              </div>
//             </li>`;
//     })
//     .join("");

//   list.innerHTML = item;
// };

// ref.wrapper.style.display = "none";
// const fetchAuthorization = async (offset) => {
//   try {
//     const { data } = await axios.get(`${url}&limit=${limit}&offset=${offset}`);
//     const { results } = data.data;
//     if (results) {
//       ref.wrapper.style.display = "flex";
//     }

//     handelAddHtml(results);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handelNext = () => {
//   page += 1;
//   const offset = (page - 1) * 3;

//   ref.buttonNext.classList.add("is-active");
//   fetchAuthorization(offset);
// };
// const handelPrevious = () => {
//   if (page > 1) {
//     page -= 1;
//     const offset = (page - 1) * 3;
//     fetchAuthorization(offset);
//     if (offset > 0) {
//       ref.buttonNext.classList.add("is-active");
//     } else {
//       ref.buttonNext.classList.remove("is-active");
//     }
//   }
// };
// fetchAuthorization();

// ref.buttonPrev.addEventListener("click", handelPrevious);
// ref.buttonNext.addEventListener("click", handelNext);

import axios from "axios";
import CryptoJS from "crypto-js";

// const ref = {
//   buttonPrev: document.querySelector(".js-previous"),
//   buttonNext: document.querySelector(".js-next"),
// };
const list = document.querySelector(".js-comics");

const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";

const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
const url = `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`;

const limit = 6;

const defaultPhoto =
  "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";
const handelAddHtml = (results) => {
  const item = results
    .map(({ title, creators, images }) => {
      const imgUrl = images[0]?.path
        ? `${images[0]?.path}.${images[0]?.extension}`
        : defaultPhoto;
      const name = creators.items ? creators.items[0]?.name : "-";
      return ` <li class="item-comics swiper-slide">
             <img class="img-comics" src=${imgUrl} alt="marvel hero"/>
                  <div class="">
                 <h3 class="title-comics">${title}</h3>
                 <p class="author">${name ? name : "Kat Gin"}</p>
             </div>
            </li>
       `;
    })
    .join("");
  list.innerHTML = item;

  const sliderElement = document.querySelectorAll(".item-comics");
  if (sliderElement.length !== 0) {
    new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      spaceBetween: 16,
      // grabCursor: true,

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
  }

  console.log(sliderElement);
};

const fetchAuthorization = async () => {
  try {
    const { data } = await axios.get(
      `${url}&limit=${limit}&dateDescriptor=lastWeek`
    );
    const { results } = data.data;

    handelAddHtml(results);
  } catch (error) {
    console.log(error);
  }
};

fetchAuthorization();
