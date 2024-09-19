import getData from "./modal";
import { getInformationAboutComics, handelGetAllComics } from "./Api";

import Pagination from "tui-pagination";
import "tui-pagination/dist/tui-pagination.css";

const list = document.querySelector(".all-comics");
const loader = document.querySelector(".loader-container");
const paginationContainer = document.querySelector(".tui-pagination");
const sectionDefault = document.querySelector(".section-default ");
const body = document.querySelector("body");

let limit = 5;
let currentPage = 1;

const defaultPhoto =
  "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";
// function witch reply for limit

loader.classList.remove("invisible");
body.style.overflow = "hidden";

const handelResize = () => {
  if (window.innerWidth <= 335) {
    limit = 5;
  } else if (window.innerWidth <= 768) {
    limit = 8;
  } else if (window.innerWidth >= 1440) {
    limit = 16;
  }

  const start = (currentPage - 1) * limit;
  // const end = start + limit;

  //show some  comics  in depending on limit

  handelGetAllComics(limit, start)
    .then((data) => {
      //list
      handelRenderComics(data);
      //pagination
      handelPagination(limit, data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        loader.classList.add("invisible");
        body.style.overflow = "auto";
      }, 1500);
    });
};

export const handelRenderComics = (data) => {
  const { results } = data.data;

  if (results.length > 0) {
    handelRenderItemComics(results);
  } else {
    sectionDefault.style.display = "flex";
  }
};
const handelRenderItemComics = (results) => {
  const comics = results
    .map(({ id, title, name, images }) => {
      const newTitle = title.slice(0, title.indexOf("#"));

      return handelCardComics({ newTitle, images, id, name });
    })
    .join("");

  list.innerHTML = comics;
};

const handelCardComics = ({ newTitle, images, id, name }) => {
  const imgUrl = images[0]?.path
    ? `${images[0]?.path}.${images[0]?.extension}`
    : defaultPhoto;
  return ` <li id=${id}     class="comic-list-item">
                 <img class="all-img-comics" src=${imgUrl} alt="marvel hero"/>
                  <div class="">
                 <h3 class="title-comics">${newTitle}</h3>
                 <p class="author">${name ? name : "Kat Gin"}</p>
                  </div>
                </li>
       `;
};

const handelItemComics = (e) => {
  const item = e.target.closest(".comic-list-item");
  getInformationAboutComics(item.id)
    .then((data) => {
      getData(data);
      const modal = document.querySelector(".modal-window");
      modal.classList.toggle("is-modal-open");
      const IsOpen = modal.classList.contains("is-modal-open");
      body.style.overflow = "auto";
      if (IsOpen) {
        body.style.overflow = "hidden";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

list.addEventListener("click", handelItemComics);
window.addEventListener("resize", handelResize());

loader.classList.remove("invisible");
body.style.overflow = "hidden";

// pagination
const handelPagination = (limit, data) => {
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
    handelGetAllComics(limit, start)
      .then((data) => {
        handelRenderComics(data, start, start + limit);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          loader.classList.add("invisible");
          body.style.overflow = "auto";
        }, 1500);
      });
  });
};
