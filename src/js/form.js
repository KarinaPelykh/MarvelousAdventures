import { handelGetComics } from "./Api";

const comics = "request_user";

const form = document.querySelector(".form-search");
const newListComic = document.querySelector(".new-list-comic");

const renderListComics = (comics) => {
  newListComic.innerHTML = "";

  comics.forEach(({ title }) => {
    const item = document.createElement("li");
    item.classList.add("new-comic-item");

    item.textContent = title;
    newListComic.appendChild(item);
  });
};

const getTitle = (e) => {
  e.preventDefault();
  const title = e.target.elements.input.value;
  if (title) {
    handelGEtResultSearches(title);
  }
};

const handelGEtResultSearches = (title) => {
  console.log(title);

  handelGetComics(title).then((data) => {
    const amount = data.data.results.length > 0;
    if (amount) {
      renderListComics(data.data.results);
      newListComic.style.display = "flex";
      newListComic.style.flexDirection = "column";
    } else {
      newListComic.innerHTML = "<li class=new-comic-item >Nothing found</li>";
    }
  });
};

newListComic.addEventListener("click", (e) => {
  const title = e.target.textContent;

  const userSelected = JSON.stringify(title);
  localStorage.setItem(comics, userSelected);
  window.location.replace("../page-comics.html");
});
form.addEventListener("submit", getTitle);
