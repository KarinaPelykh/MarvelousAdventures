import axios from "axios";
import CryptoJS from "crypto-js";

const ref = {
  buttonPrev: document.querySelector(".js-previous"),
  buttonNext: document.querySelector(".js-next"),
  wrapper: document.querySelector(".js-button-wrapper"),
};
const list = document.querySelector(".js-comics");

const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";

const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
const url = `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`;

let page = 2;
const limit = 3;

const defaultPhoto =
  "https://cdn.marvel.com/u/prod//i/mg/3/a0/6451109c83f5f/portrait_uncanny.jpg";
const handelAddHtml = (results) => {
  const item = results
    .map(({ title, creators, images }) => {
      const imgUrl = images[0]?.path
        ? `${images[0]?.path}.${images[0]?.extension}`
        : defaultPhoto;
      const name = creators.items ? creators.items[0]?.name : "-";
      return `<li class="item-comics">
             <img class="img-comics" src=${imgUrl} alt="marvel hero"/>
                  <div class="">
                 <h3>${title}</h3>
                 <p>${name}</p>
             </div>
            </li>`;
    })
    .join("");

  list.innerHTML = item;
};

ref.wrapper.style.display = "none";
const fetchAuthorization = async (offset) => {
  axios
    .get(`${url}&limit=${limit}&offset=${offset}`)
    .then(
      ({
        data: {
          data: { results },
        },
      }) => {
        if (results) {
          ref.wrapper.style.display = "flex";
        }

        handelAddHtml(results);
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

const handelNext = () => {
  page += 1;

  const offset = (page - 1) * 3;

  fetchAuthorization(offset);
};
const handelPrevious = () => {
  if (page > 1) {
    page -= 1;
    const offset = (page - 1) * 3;
    fetchAuthorization(offset);
  }
};
fetchAuthorization();

ref.buttonPrev.addEventListener("click", handelPrevious);
ref.buttonNext.addEventListener("click", handelNext);
