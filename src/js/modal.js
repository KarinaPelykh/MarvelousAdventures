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
  const info = data.items
    .map(({ name, resourceURI }) => {
      return ` <li ><img src="${resourceURI}" alt="Characters" /> <p>${name}</p>
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

// const handelGetDetail = async (resourceURI) => {
//   try {
//     const { data } = await axios.get(
//       `${resourceURI}?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`
//     );
//     const photoCharacter = data.data.results[0].thumbnail;
//     const linkPhoto = `${photoCharacter.path}.${photoCharacter.extension}`;
//     return linkPhoto;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const d = (img, name) => {
// return ` <li ><img src="${img}" alt="Characters" /> <p>${name}</p>
//    </li>`;
// };
// const handelAddCharacters = (data) => {
//   const info = data.items
//     .map(
//       ({ name, resourceURI }) => {
//         return ` <li ><img src="${resourceURI}" alt="Characters" /> <p>${name}</p>
//      </li>`;
//       }
//       // handelGetDetail(resourceURI).then((img) => {
//       //   return { img, name };
//       // })
//     )
//     .join("");
//   return info;
// };

//  <button id="button" class="button-close"><svg><use href="../img/sprite.svg#close"></svg></button>
//   <div class="wrapper-modal">
//   ${slider}

//     </div>
//     <div class="thumb-modal">
//       <div class="daredevil">
//         <div class="info-comics">
//           <h3 class="comics-caption">${newTitle}</h3>
//            <p class="name-date">${name[0].name} | ${monthAndYear}</p>
//         </div>
//         <p class="comics-descriptions">${description}</p>

//       <ul class="list-info-comics">
//       <li>
//       <p class="text-inf">FORMAT
//       </p>
//       <p class="text-item">${format}</p>
//       </li>
//        <li>
//       <p   class="text-inf">YEAR RELEASED
//       </p>
//       <p class="text-item">${year}</p>
//       </li>
//        <li>
//       <p  class="text-inf">PAGES
//       </p>
//       <p class="text-item">${pageCount}</p>
//       </li>
//        <li>
//       <p  class="text-inf">PRICE
//       </p>
//       <p class="text-item">&#36;${price}</p>
//       </li>

//       </ul>
//       </div>
//       <div class="info-creators">
//           <h3 class="creators-title">Creators</h3>
//           <div class="creators">
//             <img class="images-creators" src=${imgCreators} alt="Creators" />
//             <div class="thumb-role">
//               <p class="role">${name[0].role}</p>
//               <p class="name-writer">${name[0].name}</p>
//             </div>
//           </div>
//       </div>
//         <div >
//           <h3 class="title-characters">Characters</h3>
//           <ul class="characters">
//               ${character}
//           </ul>
//         </div>
//     </div>
//   </div>
