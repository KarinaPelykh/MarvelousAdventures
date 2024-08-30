import axios from "axios";
import CryptoJS from "crypto-js";

const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";
const comics = "request_user";
const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();

const input = document.querySelector(".input");
const newListComic = document.querySelector(".new-list-comic");

const handelGetComics = async (title) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/v1/public/comics?titleStartsWith=${title}&apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getTitle = (e) => {
  const title = e.target.value;

  if (title) {
    handelGetComics(title).then((data) => {
      data.data.results.forEach(({ title }) => {
        const item = document.createElement("li");
        item.classList.add("new-comic-item");

        item.textContent = title;
        newListComic.appendChild(item);
      });
    });
  }
};

newListComic.addEventListener("click", (e) => {
  const userSelected = JSON.stringify(e.target.value);
  localStorage.setItem(comics, userSelected);
  window.location.replace("../page-comics.html");
});
input.addEventListener("input", getTitle);
