// import axios from "axios";
// import CryptoJS from "crypto-js";

// const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
// const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
// const BASE_URL = "https://gateway.marvel.com:443";
// const TS = "karina";
// const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();

// const form = document.querySelector(".form-filter");
// const select = document.querySelector(".js-select");
// const inputDate = document.querySelector(".js-date");
// const byOrder = document.querySelector(".js-by-order");

// // filterDate.addEventListener("change", () => {
// //   const currentDate = filterDate.value.split();
// //   const changeInRow = currentDate.reverse().join("");
// //   const replaceSymbolInDate = changeInRow.replaceAll("-", "/");
// //   console.log(replaceSymbolInDate);
// //   filterDate.value = replaceSymbolInDate;
// //   console.log(filterDate.value);
// // });

// const handelApiComics = ({ searchComics, valueSelect, selectByOrder }) => {
//   return {
//     url: `${BASE_URL}/v1/public/comics?`,
//     params: {
//       titleStartsWith: searchComics,
//       format: valueSelect,
//       orderBy: selectByOrder,
//       apikey: API_KEY_PUBLIC,
//       hash: HASH,
//       ts: TS,
//     },
//   };
// };

// const handelFilterAllComics = async () => {
//   try {
//     const url = handelApiComics();
//     console.log(url);

//     const { data } = await axios.get(url);

//     console.log(data);

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const handelFilterComics = (e) => {
//   e.preventDefault();
//   const form = e.target;
//   const searchComics = form.elements.search.value.toLowerCase().trim();
//   const valueSelect = select.value;
//   const selectByOrder = byOrder.value;
//   const date = inputDate.value;
//   const params = {
//     searchComics,
//     valueSelect,
//     selectByOrder,
//     date,
//   };
//   handelApiComics(params);
// };

// form.addEventListener("submit", handelFilterComics);
// select.addEventListener("chang", handelFilterComics);
// byOrder.addEventListener("chang", handelFilterComics);

// export default handelFilterAllComics;
