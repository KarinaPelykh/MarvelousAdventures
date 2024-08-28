import axios from "axios";
import CryptoJS from "crypto-js";

const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com:443";
const TS = "karina";

const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
const url = `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`;
const input = document.querySelector(".input");
const select = document.querySelector(".select");
const getTitle = (e) => {
  const title = e.target.value;
  handelGetComics(title);
};

const handelGetComics = async (title) => {
  const { data } = await axios.get(
    `${BASE_URL}/v1/public/comics?titleStartsWith=${title}&apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}&limit=4`
  );
  data.data.results.forEach(({ title }) => {
    const item = document.createElement("li");
    const li = (item.textContent = title);
    console.log(li);

    select.insertAdjacentHTML("beforeend", li);
  });
};

input.addEventListener("input", getTitle);
