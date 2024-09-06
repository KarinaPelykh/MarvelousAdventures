export const handelSliderModal = (imageComics) => {
  return `<div class="maybe-slider" >
    <div

      class=" mySwiper"
    >
      <div class="swiper-wrapper">

        ${imageComics}
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <div thumbsSlider="" class="thumbsSlider">
      <div class="swiper-wrapper-thumb">
         ${imageComics}

      </div>

    </div> `;
};
