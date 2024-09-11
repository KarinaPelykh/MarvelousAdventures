import { handelRenderComics } from "./all-comics";
import { handelFilterAllComics, handelGetAllComics } from "./Api";

const form = document.querySelector(".form-filter");
const select = document.querySelector(".js-select");
const inputDate = document.querySelector(".js-date");
const byOrder = document.querySelector(".js-by-order");
const loader = document.querySelector(".loader-container");
const body = document.querySelector("body");

const handelFilterComics = (e) => {
  e.preventDefault();
  const form = e.target;

  const searchComics = form.elements.search.value.toLowerCase().trim();
  const valueSelect = handelSelectFormat();
  const selectByOrder = handelSelectByOrder();
  const formatDate = handelSelectStarYear();
  const params = {
    searchComics,
    valueSelect,
    selectByOrder,
    formatDate,
  };
  handelIsGetData(params);
  form.reset();
};

const handelSelectFormat = () => {
  return select.value.toLowerCase();
};

const handelSelectByOrder = () => {
  return byOrder.value.toLowerCase().replaceAll(" ", "").replace("d", "D");
};

const handelSelectStarYear = () => {
  const date = inputDate.value;
  return date.slice(0, date.indexOf("-"));
};

const handelIsGetData = (params) => {
  console.log(params);

  loader.classList.remove("invisible");
  body.style.overflow = "hidden";
  handelFilterAllComics(params)
    .then((data) => {
      console.log(data);

      if (data) {
        handelRenderComics(data);
      } else {
        handelGetAllComics().then((data) => {
          handelRenderComics(data);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        body.style.overflow = "auto";
        loader.classList.add("invisible");
      }, 1500);
    });
};

form.addEventListener("submit", handelFilterComics);
