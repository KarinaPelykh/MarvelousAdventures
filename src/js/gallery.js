import { marvelHero } from "../../public/data";

const gallery = document.querySelector(".gallery");
const pagination = document.querySelector(".pagination");

const handelAddHtml = ({ img1, img2, text }) => {
  return `<li class="item">
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
const buttons = [];
const handelUpdateImg = () => {
  // const offset = -currentIndex * 113;

  slides.forEach((slide) => {
    slide.style.transform = `translateX(${offset}%)`;
  });
};

const handelAuto = () => {
  currentIndex = (currentIndex + 1) % slides.length;
  handelUpdateImg();
};

setInterval(handelAuto, 3000);

const handelAddPAgination = () => {
  slides.forEach(() => {
    const button = document.createElement("button");
    pagination.appendChild(button);
    buttons.push(button);
  });
};

handelAddPAgination();
