import axios from "axios";
import CryptoJS, { format } from "crypto-js";
const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const BASE_URL = "https://gateway.marvel.com";
const list = document.querySelector(".js-comics");
const TS = "karina";
const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
const url = `${BASE_URL}/v1/public/comics?`;

const handelAddHtml = ({ title, creators, images }) => {
  return `<li class="">
             <img src=${images.path} alt="marvel hero"/>
                  <div class="">
                 <h3>${title}</h3>
                 <p>${creators}</p>
             </div>
            </li>`;
};

const fetchAuthorization = () => {
  axios
    .get(url, {
      params: {
        ts: TS,
        format: "comic",
        apikey: API_KEY_PUBLIC,
        hash: HASH,
      },
    })
    .then(
      ({
        data: {
          data: { results },
        },
      }) => {
        results.forEach(({ title, creators, images }) => {
          console.log({ title, creators, images });

          //   const item = handelAddHtml({ title, creators, images });
          //   list.insertAdjacentElement("beforeend", item);
        });
        console.log(results);
      }
    )
    .catch((error) => {
      console.log(error);
    });
};
fetchAuthorization();
