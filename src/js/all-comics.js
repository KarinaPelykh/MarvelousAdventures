import getData from "./modal";
import {
  getInformationAboutComics,
  handelGetAllComics,
  handelFilterAllComics,
} from "./Api";

let limit = 5;

const list = document.querySelector(".all-comics");
const loader = document.querySelector(".loader-container");
const form = document.querySelector(".form-filter");
const select = document.querySelector(".js-select");
const inputDate = document.querySelector(".js-date");
const byOrder = document.querySelector(".js-by-order");
const sectionDefault = document.querySelector(".section-default ");
const body = document.querySelector("body");
const defaultPhoto =
  "https://image.cnbcfm.com/api/v1/image/105828186-1554212544565avengers-endgame-poster-og-social-crop.jpg?v=1555618903&w=929&h=523&vtcrop=y";

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

const handelRenderComics = (data) => {
  const { results } = data.data;
  if (results.length > 0) {
    handelRenderItemComics(results);
  } else {
    sectionDefault.style.display = "flex";
  }
};
// function witch reply for limit
const handelResize = () => {
  if (window.innerWidth <= 335) {
    limit = 5;
  } else if (window.innerWidth <= 768) {
    limit = 8;
  } else if (window.innerWidth >= 1440) {
    limit = 16;
  }

  //show some  comics  in depending on limit
  handelGetAllComics(limit)
    .then((data) => {
      handelRenderComics(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(
      setTimeout(() => {
        loader.classList.add("invisible"), 1500;
      })
    );
};

const handelItemComics = (e) => {
  const item = e.target.closest(".comic-list-item");
  getInformationAboutComics(item.id)
    .then((data) => {
      console.log(data);

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
window.addEventListener("resize", handelResize);

//filter

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

loader.classList.remove("invisible");
body.style.overflow = "hidden";

//show all comics on visit first page
handelGetAllComics()
  .then((data) => {
    handelRenderComics(data);
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
