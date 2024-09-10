export const handelModal = ({
  imageComics,
  newTitle,
  name,
  monthAndYear,
  description,
  format,
  year,
  pageCount,
  price,
  imgCreators,
  character,
}) => {
  if (imageComics) {
    return `    
  <button id="button" class="button-close"><svg><use href="../img/sprite.svg#close"></svg></button>
  <div class="wrapper-modal">
<div class="swiper-container">
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
      </div>

    </div>
    <div class="thumb-modal">
      <div class="daredevil">
        <div class="info-comics">
          <h3 class="comics-caption">${newTitle}</h3>
           <p class="name-date">${name[0].name} | ${monthAndYear}</p>
        </div>
        <p class="comics-descriptions">${description}</p>
     
      <ul class="list-info-comics">
      <li>
      <p class="text-inf">FORMAT
      </p>
      <p class="text-item">${format}</p>
      </li>
       <li>
      <p   class="text-inf">YEAR RELEASED 
      </p>
      <p class="text-item">${year}</p>
      </li>
       <li>
      <p  class="text-inf">PAGES
      </p>
      <p class="text-item">${pageCount}</p>
      </li>
       <li>
      <p  class="text-inf">PRICE
      </p>
      <p class="text-item">&#36;${price}</p>
      </li>
      
      </ul>
      </div>
      <div class="info-creators">
          <h3 class="creators-title">Creators</h3>
          <div class="creators">
            <img class="images-creators" src=${imgCreators} alt="Creators" />
            <div class="thumb-role">
              <p class="role">${name[0].role}</p>
              <p class="name-writer">${name[0].name}</p>
            </div>
          </div>
      </div>
        <div >
          <h3 class="title-characters">Characters</h3>
          <ul class="characters">
              ${character}
          </ul>
        </div>
    </div>
  </div>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      `;
  }
};
