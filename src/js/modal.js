import { format } from "date-fns";
import { handelModal } from "./modalMarking";
import { handelInitializationThumbModal } from "./slider-modal";

const modal = document.querySelector(".overlay");
const modalWindow = document.querySelector(".modal-window");
const body = document.querySelector("body");
const imgCreators = "https://www.svgrepo.com/show/86725/person.svg";
const handelAddInfoHtml = ({
  title,
  name,
  pageCount,
  description,
  format,
  imageComics,
  price,
  character,
  data,
}) => {
  const { monthAndYear, year } = formattingDate(data);
  const changesTitle = title.indexOf("#");
  const newTitle = title.slice(0, changesTitle);

  const infoForModal = {
    imageComics,
    newTitle,
    name,
    monthAndYear,
    description,
    format,
    year,
    pageCount,
    price,
    imgCreators,
    character,
  };
  const markingModal = handelModal(infoForModal);
  return `
 ${markingModal}
  `;
};
const handelScroll = () => {
  const IsOpen = modalWindow.classList.contains("is-modal-open");
  body.style.overflow = IsOpen ? "hidden" : "auto";
};
const getData = (data) => {
  const { results } = data.data;
  const modalHtml = results.map(
    ({
      title,
      creators,
      pageCount,
      description,
      format,
      images,
      prices,
      characters,
      dates,
    }) => {
      const name = handelMapCreators(creators);
      const data = dates.length > 0 ? dates[0].date : "-";
      const price = prices.length > 0 ? prices[0].price : "$0.00";
      const imageComics = handelImageComics(images);
      const character = handelAddCharacters(characters);

      return handelAddInfoHtml({
        title,
        name,
        pageCount,
        description,
        format,
        imageComics,
        price,
        character,
        data,
      });
    }
  );

  modal.innerHTML = modalHtml.join("");
  handelInitializationThumbModal();
  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    modalWindow.classList.toggle("is-modal-open");
    handelScroll();
  });
};

const handelImageComics = (data) => {
  return data
    .map(({ extension, path }) => {
      const imgs = `${path}.${extension}`;
      return `<div class="swiper-slide"><img class="photo-comics" src=${imgs} alt="photo comics"/></div>`;
    })
    .join("");
};

const handelMapCreators = (data) => {
  return data.items.filter(({ role, name }) => {
    if (role === "writer") {
      return { role, name };
    }
  });
};

const handelAddCharacters = (data) => {
  if (data.items.length === 0) {
    return `<li><p>We don't have Characters,Sorry</p></li>`;
  }
  const info = data.items
    .map(({ name }) => {
      return ` <li><svg class="svg-characters" ><use href="../img/sprite.svg#character"></use></svg> <p>${name}</p>
     </li>`;
    })
    .join("");
  return info;
};

const formattingDate = (data) => {
  const monthAndYear = format(new Date(data), "MMMM MM,yyy");
  const year = format(new Date(data), "yyyy");
  return { monthAndYear, year };
};

const handleCloseModal = (e) => {
  const clickOnModal = e.target === e.currentTarget;
  if (clickOnModal) {
    modalWindow.classList.remove("is-modal-open");
    handelScroll();
  }
};
const handleCloseModalEscape = (e) => {
  const clickEscape = e.code === "Escape";
  if (clickEscape) {
    modalWindow.classList.remove("is-modal-open");
    handelScroll();
  }
};
modalWindow.addEventListener("click", handleCloseModal);
document.addEventListener("keydown", handleCloseModalEscape);
export default getData;
