import { marvelHero } from "../../public/data";
const gallery = document.querySelector(".gallery");
const pagination = document.querySelector(".pagination");
const buttonLink = document.querySelector(".js-button");
const buttonPrev = document.querySelector(".js-previous");

let currentIndex = 0;
const buttons = [];
// add html
const handelAddHtml = ({ img1, img2, text, name }) => {
  return `<li class="item"  data-action=${name}>
             <div class="slid-hero">
             <img src=${img1} alt="marvel hero"/>
                  <div class="block-info">
                  <img src=${img2}  alt="marvel hero"/>
                 <div class="info-wrapper">
                    <span class="span">Characters</span>
                   <p class="text-span">${text}</p>
                  </div>
                   </div>
             </div>
            </li>`;
};
// add html slide
const handelAddHtmlOnPage = () => {
  const html = marvelHero
    .map((data) => {
      return handelAddHtml(data);
    })
    .join("");

  gallery.innerHTML = html;
};
handelAddHtmlOnPage();

const slides = document.querySelectorAll(".gallery .item");

//update slide
const handelUpdateImg = () => {
  const offset = -currentIndex * 100;
  slides.forEach((slide) => {
    slide.style.transform =
      window.innerWidth >= 1440
        ? `translateY(${offset}%)`
        : `translateX(${offset}%)`;
  });
};

// autoswitch slide
const handelAuto = () => {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  currentIndex = (currentIndex + 1) % slides.length;

  handelUpdateImg();
  handelChangeColor(prevIndex);
  handleChangeColorButton(prevIndex);
};

setInterval(handelAuto, 3000);

// add pagination
const handelAddPAgination = () => {
  slides.forEach((_, index) => {
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      currentIndex = index;
      handelUpdateImg();
    });
    pagination.appendChild(button);
    buttons.push(button);
  });
};
handelAddPAgination();

// change color button pagination slide
const handleChangeColorButton = (prevIndex) => {
  buttons.forEach((button, index) => {
    if (index === currentIndex) {
      const background =
        (prevIndex == 0 && "#600404") ||
        (prevIndex == 1 && "#34387F") ||
        (prevIndex == 2 && "#5B7F3C");
      button.style.background = background;
    } else {
      button.style.background = "white";
    }
  });
};
// change color link and pagination
const handelChangeColor = (prevIndex) => {
  switch (prevIndex) {
    case 0:
      buttonPrev.style.backgroundColor = "#600404";
      buttonLink.style.backgroundColor = "#600404";
      break;
    case 1:
      buttonPrev.style.backgroundColor = "#34387F";
      buttonLink.style.backgroundColor = "#34387F";
      break;
    case 2:
      buttonPrev.style.backgroundColor = "#5B7F3C";
      buttonLink.style.backgroundColor = "#5B7F3C";
      break;
    default:
      buttonLink.style.backgroundColor = "#34387F";
      break;
  }
};

// change color background
const bg = ["../img/pantera.png", "../img/hulk-gr.png", "../img/spider.png"];
const handelChangeBg = () => {
  const items = document.querySelectorAll(".item .block-info");
  items.forEach((el, index) => {
    const background = bg[index % bg.length];
    el.style.backgroundImage = `url(${background})`;
  });
};
handelChangeBg();
