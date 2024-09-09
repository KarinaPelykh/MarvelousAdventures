export const handelSliderModal = (imageComics) => {
  if (imageComics) {
    return `    <div class="swiper-container">
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
           ${imageComics}
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
        <div thumbsSlider="" class="swiper thumbsSlider">
          <div class="swiper-wrapper">
               ${imageComics}
          </div>
        </div>
      </div> `;
  }
};
