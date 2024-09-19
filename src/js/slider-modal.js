export const handelInitializationThumbModal = () => {
  let swiper = new Swiper(".thumbsSlider", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  let swiper2 = new Swiper(".mySwiper", {
    spaceBetween: 10,

    thumbs: {
      swiper: swiper,
    },
  });
};
