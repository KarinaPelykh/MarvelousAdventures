import Pikaday from "pikaday";
import { handelRenderComics } from "./all-comics";
import { handelFilterAllComics, handelGetAllComics } from "./Api";

const form = document.querySelector(".form-filter");
const select = document.querySelector(".js-select");
const byOrder = document.querySelector(".js-by-order");
const loader = document.querySelector(".loader-container");
const body = document.querySelector("body");
const wrapperSelect = document.querySelectorAll(".select-wrapper");
const field = document.getElementById("datepicker-topright-forreal");
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
  console.log(searchComics, valueSelect, selectByOrder, formatDate);

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

wrapperSelect.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("select-wrapper-top");
  });
});

form.addEventListener("submit", handelFilterComics);
