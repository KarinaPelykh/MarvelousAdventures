import { marvelHero } from "../../public/data";
const gallery = document.querySelector(".gallery");
const pagination = document.querySelector(".pagination");
const buttonLink = document.querySelector(".js-button");

let currentIndex = 0;
const buttons = [];

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
  const offsets = -currentIndex * 105;
  slides.forEach((slide) => {
    slide.style.transform =
      window.innerWidth >= 1440
        ? `translateY(${offset}%)`
        : `translateX(${offsets}%)`;
  });
};

// autoswitch slide
const handelAuto = () => {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  currentIndex = (currentIndex + 1) % slides.length;

  handelUpdateImg();
  handelChangeColor(prevIndex);
  handleChangeColorButton();
};

setInterval(handelAuto, 3000);

// add pagination
const handelAddPAgination = () => {
  slides.forEach((_, index) => {
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      currentIndex = index;
      handelUpdateImg();
      handleChangeColorButton();
    });
    pagination.appendChild(button);
    buttons.push(button);
  });
};
handelAddPAgination();

// change color button pagination slide
const backgroundButton = ["#34387F", "#5B7F3C", "#600404"];
const handleChangeColorButton = () => {
  buttons.forEach((button, index) => {
    if (index === currentIndex) {
      const background =
        backgroundButton[currentIndex % backgroundButton.length];
      button.style.background = background;
    } else {
      button.style.background = "#1717174C";
    }
  });
};

// change color link and pagination
const handelChangeColor = (prevIndex) => {
  switch (prevIndex) {
    case 0:
      buttonLink.style.backgroundColor = "#600404";
      break;
    case 1:
      buttonLink.style.backgroundColor = "#34387F";
      break;
    case 2:
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
  const items = document.querySelectorAll(".item");
  items.forEach((el, index) => {
    const background = bg[index % bg.length];
    el.style.backgroundImage = `url(${background})`;
  });
};
handelChangeBg();
