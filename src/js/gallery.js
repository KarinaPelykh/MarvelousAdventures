import { MARVEL_HEROES_DATA, BACKGROUND } from "../../public/data";

const gallery = document.querySelector(".gallery");

const pagination = document.querySelector(".pagination");
const buttonLink = document.querySelector(".js-button");

let currentIndex = 0;

const buttons = [];

const backgroundColors = ["#34387F", "#5B7F3C", "#600404"];

let heroSlides;

const createHeroSlideMarkup = (data) => {
  const { img, imgSecond, heroDescription, name } = data;

  return `<li class="item"  data-action=${name}>
             <div class="slid-hero">
             <img src=${img} alt="marvel hero"/>
                  <div class="block-info">
                  <img src=${imgSecond}  alt="marvel hero"/>
                 <div class="info-wrapper">
                    <span class="span">Characters</span>
                   <p class="text-span">${heroDescription}</p>
                  </div>
                   </div>
             </div>
            </li>`;
};

const renderHeroSlides = () => {
  const heroSlidesMarkup = MARVEL_HEROES_DATA.map((data) =>
    createHeroSlideMarkup(data)
  ).join("");

  gallery.innerHTML = heroSlidesMarkup;

  heroSlides = document.querySelectorAll(".gallery .item");
};

renderHeroSlides();

const updateHeroSlidePositions = () => {
  const offsetY = -currentIndex * 100;
  const offsetX = -currentIndex * 105;

  heroSlides.forEach((heroSlide) => {
    heroSlide.style.transform =
      window.innerWidth >= 1440
        ? `translateY(${offsetY}%)`
        : `translateX(${offsetX}%)`;
  });
};

const autoAdvanceSlide = () => {
  currentIndex = (currentIndex + 1) % heroSlides.length;
  updateLinkButtonColor();
  updateHeroSlidePositions();
  updatePaginationButtonsColor();
};

setInterval(autoAdvanceSlide, 3000);

const createPaginationButtons = () => {
  heroSlides.forEach((_, index) => {
    const button = document.createElement("button");

    button.addEventListener("click", () => {
      currentIndex = index;
      updateHeroSlidePositions();
      updatePaginationButtonsColor();
    });

    pagination.appendChild(button);

    buttons.push(button);
  });
};

createPaginationButtons();

const updatePaginationButtonsColor = () => {
  buttons.forEach((button, index) => {
    button.style.background =
      index === currentIndex ? backgroundColors[currentIndex] : "#1717174C";
  });
};

updatePaginationButtonsColor();

const updateLinkButtonColor = () => {
  buttonLink.style.backgroundColor = backgroundColors[currentIndex];
};

const updateBackgroundSlides = () => {
  heroSlides.forEach(
    (el, index) => (el.style.backgroundImage = `url(${BACKGROUND[index]})`)
  );
};

updateBackgroundSlides();
