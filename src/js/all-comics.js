import { handelPagination } from "./pagination";
import { handelGetAllComics } from "./Api";
import { handelShowLoader, handelHideLoader } from "./loader";

const list = document.querySelector(".all-comics");
const sectionDefault = document.querySelector(".section-default ");
const sectionGallery = document.querySelector(".section-gallery");

let limit = 5;
let currentPage = 1;

const defaultPhoto =
  "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";

handelShowLoader();

const handelResize = () => {
  if (window.innerWidth <= 335) {
    limit = 5;
  } else if (window.innerWidth <= 768) {
    limit = 8;
  } else if (window.innerWidth >= 1440) {
    limit = 16;
  }

  const start = (currentPage - 1) * limit;

  handelGetAllComics(limit, start)
    .then((data) => {
      handelRenderComics(data);

      handelPagination(limit, data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      handelHideLoader();
    });
};

export const handelRenderComics = (data) => {
  const { results } = data.data;

  if (results.length > 0) {
    sectionGallery.style.display = "flex";
    sectionDefault.style.display = "none";
    handelRenderItemComics(results);
  } else {
    sectionGallery.style.display = "none";
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

window.addEventListener("resize", handelResize());
