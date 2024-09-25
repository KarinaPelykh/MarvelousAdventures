import Pikaday from "pikaday";
import { handelRenderComics } from "./all-comics";
import { handelFilterAllComics } from "./Api";
import Pagination from "tui-pagination";
import "tui-pagination/dist/tui-pagination.css";
const paginationContainer = document.querySelector(".tui-pagination");
let limit = 5;
let currentPage = 1;

const start = (currentPage - 1) * limit;

const form = document.querySelector(".form-filter");
const select = document.querySelector(".js-select");
const byOrder = document.querySelector(".js-by-order");
// const loader = document.querySelector(".loader-container");
const body = document.querySelector("body");
const wrapperSelect = document.querySelectorAll(".select-wrapper");
const field = document.getElementById("datepicker-topright-forreal");

///Pikaday
let picker = new Pikaday({
  field: field,
  position: "top right",
  reposition: true,
  container: document.body,
  format: "D/MMM/YYYY",
  toString(date) {
    const day = date.getDate();

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },
  onSelect: function () {
    field.value = picker.toString();
  },
});
field.parentNode.insertBefore(picker.el, field.nextSibling);
// function that get info from filer
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
  console.log(
    searchComics,
    valueSelect,
    selectByOrder,
    formatDate,
    limit,
    start
  );

  handelIsGetData(params);
  form.reset();
};

// selected option
const handelSelectFormat = () => {
  return select.value.toLowerCase();
};
// selected year
const handelSelectByOrder = () => {
  return byOrder.value.toLowerCase().replaceAll(" ", "").replace("d", "D");
};

const handelIsGetData = (params) => {
  // loader.classList.remove("invisible");
  // body.style.overflow = "hidden";

  handelFilterAllComics(params, limit, start)
    .then((data) => {
      console.log("fileFilter", data);
      handelPagination(limit, data);
      handelRenderComics(data);
    })
    .catch((error) => {
      console.log(error);
    });
  // .finally(() => {
  //   setTimeout(() => {
  //     body.style.overflow = "auto";
  //     loader.classList.add("invisible");
  //   }, 1500);
  // });
  const handelPagination = (limit, data, currentPage) => {
    const { total } = data.data;

    let pagination = new Pagination(paginationContainer, {
      totalItems: total,
      itemsPerPage: limit,
      visiblePages: 5,
    });

    pagination.on("afterMove", function (eventData) {
      currentPage = eventData.page;

      const start = (currentPage - 1) * limit;

      //initialization
      handelFilterAllComics(params, limit, start)
        .then((data) => {
          console.log("fileFilter", data);

          handelRenderComics(data);
        })
        .catch((error) => {
          console.log(error);
        });
      // .finally(() => {
      //   setTimeout(() => {
      //     body.style.overflow = "auto";
      //     loader.classList.add("invisible");
      //   }, 1500);
      // });
    });
  };
};

// change position arrow on select
wrapperSelect.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("select-wrapper-top");
  });
});

form.addEventListener("submit", handelFilterComics);
