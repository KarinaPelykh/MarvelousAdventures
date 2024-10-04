import { handelRenderComics } from "./all-comics";
import { handelFilterAllComics } from "./Api";
import { handelHideLoader, handelShowLoader } from "./loader";
import { handelPagination } from "./pagination";

const form = document.querySelector(".form-filter");
const select = document.querySelector(".js-select");
const byOrder = document.querySelector(".js-by-order");
const wrapperSelect = document.querySelectorAll(".select-wrapper");
const field = document.getElementById("datepicker-topright-forreal");

let limit = 5;
let currentPage = 1;

const start = (currentPage - 1) * limit;

const handelFilterComics = (e) => {
  e.preventDefault();
  const form = e.target;

  const searchComics = form.elements.search.value.toLowerCase().trim();
  const valueSelect = handelSelectFormat();
  const selectByOrder = handelSelectByOrder();
  const date = field.value;
  const formatDate = date.slice(date.indexOf("2024"));

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

const handelIsGetData = (params) => {
  handelShowLoader();

  handelFilterAllComics(params, limit, start)
    .then((data) => {
      handelRenderComics(data);

      handelPagination(limit, data, currentPage, params);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      handelHideLoader();
    });
};

wrapperSelect.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("select-wrapper-top");
  });
});

form.addEventListener("submit", handelFilterComics);
