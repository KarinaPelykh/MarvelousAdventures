import axios from "axios";
import CryptoJS from "crypto-js";
import getData from "./modal";

const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";
let limit = 5;

const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();

const list = document.querySelector(".all-comics");
const defaultPhoto =
  "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";

const handelApiComics = () => {
  return `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}&limit=${limit}`;
};

const handelGetAllComics = async () => {
  try {
    const url = handelApiComics();
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const html = ({ newTitle, imgUrl, id, name }) => {
  return ` <li id=${id}     class="comic-list-item">
                 <img class="all-img-comics" src=${imgUrl} alt="marvel hero"/>
                  <div class="">
                 <h3 class="title-comics">${newTitle}</h3>
                 <p class="author">${name ? name : "Kat Gin"}</p>
                  </div>
                </li>
       `;
};

const handelRenderComics = (data) => {
  const { results } = data.data;
  const comics = results
    .map(({ id, title, name, images }) => {
      const imgUrl = images[0]?.path
        ? `${images[0]?.path}.${images[0]?.extension}`
        : defaultPhoto;
      const changesTitle = title.indexOf("#");
      const newTitle = title.slice(0, changesTitle);

      return html({ newTitle, imgUrl, id, name });
    })
    .join("");

  list.innerHTML = comics;
};

handelGetAllComics().then((data) => {
  handelRenderComics(data);
});

const handelResize = () => {
  if (window.innerWidth <= 335) {
    limit = 5;
  } else if (window.innerWidth <= 768) {
    limit = 8;
  } else if (window.innerWidth >= 1440) {
    limit = 16;
  }
  handelGetAllComics().then((data) => {
    handelRenderComics(data);
  });
};

const getInformationAboutComics = async (comicId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/v1/public/comics/${comicId}?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`
    );

    getData(data);
    const modal = document.querySelector(".modal-window");
    modal.classList.toggle("is-modal-open");
    const IsOpen = modal.classList.contains("is-modal-open");
    body.style.overflow = "auto";
    if (IsOpen) {
      body.style.overflow = "hidden";
    }
  } catch (error) {}
};

const handelItemComics = (e) => {
  const item = e.target.closest(".comic-list-item");
  getInformationAboutComics(item.id);
};

list.addEventListener("click", handelItemComics);
window.addEventListener("resize", handelResize);
