import Swiper from "swiper/bundle";

import "swiper/css/bundle";

export const handelInitializationThumbModal = () => {
  let swiper = new Swiper(".thumbsSlider", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  new Swiper(".mySwiper", {
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    thumbs: {
      swiper: swiper,
    },
  });
};
