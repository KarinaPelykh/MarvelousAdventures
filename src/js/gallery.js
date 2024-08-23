import { marvelHero } from "../../public/data";
const gallery = document.querySelector(".gallery");
const pagination = document.querySelector(".pagination");
const buttonLink = document.querySelector(".js-button");

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

const html = marvelHero.map((data) => {
  return handelAddHtml(data);
});

gallery.innerHTML = html.join("");

const slides = document.querySelectorAll(".gallery .item");
let currentIndex = 0;

const handelUpdateImg = () => {
  const offset = -currentIndex * 100;
  slides.forEach((slide) => {
    slide.style.transform =
      window.innerWidth >= 1440
        ? `translateY(${offset}%)`
        : `translateX(${offset}%)`;
  });
};
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

const handelAuto = () => {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  currentIndex = (currentIndex + 1) % slides.length;
  handelUpdateImg();
  handelChangeColor(prevIndex);
};

setInterval(handelAuto, 3000);

const handelAddPAgination = () => {
  slides.forEach(() => {
    const button = document.createElement("button");
    pagination.appendChild(button);
  });
};

handelAddPAgination();
