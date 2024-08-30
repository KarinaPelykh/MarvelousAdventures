export const handelMakeSlider = (sliderElement) => {
  if (sliderElement.length !== 0) {
    const swiperInstance = new Swiper(".swiper", {
      direction: "horizontal",
      spaceBetween: 16,
      navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
      },

      breakpoints: {
        376: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },

        1440: {
          slidesPerView: 3,
        },
      },
      on: {
        slideChange: function () {
          const nextButton = document.querySelector(".button-next");
          const prevButton = document.querySelector(".button-prev");

          nextButton.classList.remove("active-button");
          prevButton.classList.remove("active-button");

          if (this.isEnd) {
            nextButton.classList.remove("active-button");
          } else {
            nextButton.classList.add("active-button");
          }

          if (this.isBeginning) {
            prevButton.classList.remove("active-button");
          } else {
            prevButton.classList.add("active-button");
          }
        },
      },
    });
    // swiperInstance.update();
  }
};
