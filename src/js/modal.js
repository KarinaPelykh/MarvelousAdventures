const modal = document.querySelector(".overlae");
const window = document.querySelector(".modal-window");
// const API_KEY_PRIVATE = "86167992f51495ba975666074c2de2488a64fb00";
// const API_KEY_PUBLIC = "7f8ef27ce3f21548c1d09757433025a4";
// const BASE_URL = "https://gateway.marvel.com:443";
// import CryptoJS from "crypto-js";
// import axios from "axios";

// const TS = "karina";

// const HASH = CryptoJS.MD5(TS + API_KEY_PRIVATE + API_KEY_PUBLIC).toString();
// const url = `${BASE_URL}/v1/public/comics?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`;
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
  //   imgCreators,
}) => {
  return `<div>
  <button id="button">close</button>
    <div>
   
      <ul>${imageComics}</ul>
    </div>
    <div>
      <div class="daredevil">
        <div>
          <h3>${title}</h3>
           <p>${name[0].name} | ${data}</p>
        </div>
        <p>${description}</p>
       <table>
       <thead>
       <th>FORMAT</th>
        <th>YEAR REALEASED</th>
         <th>PEGES</th>
         <th>PRICE</th>
       </thead>
       <tbody>

       <tr><th>${format}</th></tr>
        <tr><th>${data}</th></tr>
         <tr><th>${pageCount}</th></tr>
          <tr><th>${price}</th></tr>
       </tbody>
       </table>
      </div>
      <div>
        <div>
          <h3>Creators</h3>
          <div class="creators">
            <img scr=${imgCreators} alt="Creators" />
            <div>
              <p>${name[0].role}</p>
              <p>${name[0].name}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>Characters</h3>
          <ul class="characters">
${character}
          </ul>
        </div>
      </div>
    </div>
  </div>`;
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
        // imgCreators,
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

// const handelGetDetail = async (resourceURI) => {
//   const { data } = await axios.get(
//     `${resourceURI}?apikey=${API_KEY_PUBLIC}&hash=${HASH}&ts=${TS}`
//   );
//   console.log(data);
// };
const handelAddCharacters = (data) => {
  console.log(data);
  return data.items
    .map(({ name, resourceURI }) => {
      return ` <li><img src=${resourceURI} alt="Characters" /> <p>${name}</p>
       </li>`;
    })
    .join("");
};
export default getData;
