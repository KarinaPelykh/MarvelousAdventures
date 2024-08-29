import { format } from "date-fns";
import CryptoJS from "crypto-js";
import axios from "axios";
const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
const TS = "karina";

const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
const modal = document.querySelector(".overlae");
const window = document.querySelector(".modal-window");

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

  return `
  <button id="button" class="button-close"><svg><use href="../img/sprite.svg#close"></svg></button>
  <div class="wrapper-modal">
  <div class="maybe-slider" >
   
      <ul class="modal-list-comics">${imageComics}</ul>
    </div>
    <div class="thumb-modal">
      <div class="daredevil">
        <div class="info-comics">
          <h3 class="comics-caption">${title}</h3>
           <p class="name-date">${name[0].name} | ${monthAndYear}</p>
        </div>
        <p class="comics-descriptions">${description}</p>
     
      <ul class="list-info-comics">
      <li>
      <p class="text-inf">FORMAT
      </p>
      <p class="text-item">${format}</p>
      </li>
       <li>
      <p   class="text-inf">YEAR RELEASED 
      </p>
      <p class="text-item">${year}</p>
      </li>
       <li>
      <p  class="text-inf">PAGES
      </p>
      <p class="text-item">${pageCount}</p>
      </li>
       <li>
      <p  class="text-inf">PRICE
      </p>
      <p class="text-item">&#36;${price}</p>
      </li>
      
      </ul>
      </div>
      <div class="info-creators">
          <h3 class="creators-title">Creators</h3>
          <div class="creators">
            <img class="images-creators" scr=${imgCreators} alt="Creators" />
            <div class="thumb-role">
              <p class="role">${name[0].role}</p>
              <p class="name-writer">${name[0].name}</p>
            </div>
          </div>
      </div>
        <div >
          <h3 class="title-characters">Characters</h3>
          <ul class="characters">
              ${character}
          </ul>
        </div>
    </div>
  </div>
    
  `;
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
      console.log(character);

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
  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    window.classList.toggle("is-modal-open");
  });
};

const handelImageComics = (data) => {
  return data
    .map(({ extension, path }) => {
      const imgs = `${path}.${extension}`;
      return `<li><img class="photo-comics" src=${imgs} alt="photo comics"/></li>`;
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

const handelGetDetail = async (resourceURI) => {
  try {
    const { data } = await axios.get(
      `${resourceURI}?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`
    );
    const photoCharacter = data.data.results[0].thumbnail;
    const linkPhoto = `${photoCharacter.path}.${photoCharacter.extension}`;
    return linkPhoto;
  } catch (error) {
    console.log(error);
  }
};
const d = (img, name) => {
  return ` <li ><img src="${img}" alt="Characters" /> <p>${name}</p>
     </li>`;
};
const handelAddCharacters = (data) => {
  const info = data.items.map(({ name, resourceURI }) =>
    handelGetDetail(resourceURI).then((img) => {
      return { img, name };
    })
  );
  return info;
};

const formattingDate = (data) => {
  const monthAndYear = format(new Date(data), "MMMM MM,yyy");
  const year = format(new Date(data), "yyyy");
  return { monthAndYear, year };
};
export default getData;
