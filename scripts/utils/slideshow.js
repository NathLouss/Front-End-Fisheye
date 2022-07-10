// récupération des datas medias
async function getMedias() {
  const mediasData = "../../data/photographers.json";
  const response = await fetch(mediasData);
  const dataMedias = await response.json();
  const medias = dataMedias;

  return medias
}

async function displayMediasInSlideshow(medias) {
  const mediasSection = document.querySelector(".slideshow");
  const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);

  selectedMedias.forEach((media) => {
      media.photographerName = photographerName;
      const mediaModel = modalFactory(media);
      const mediaCardDOM = mediaModel.getSlideshowCardDOM();
      mediasSection.appendChild(mediaCardDOM);
  });
};

async function init() {
  const {medias} = await getMedias();
  displayMediasInSlideshow(medias);
};

init();


// récupération des éléments html
const slideshowModal = document.querySelector(".slideshow_container");

function openSlideshowModal() {
  modal.style.display = "block";
  contactModal.style.display = "none";
  slideshowModal.style.display = "block";
  // getSlideshowCardDOM();
}

function closeSlideshowModal() {
  modal.style.display = "none";
}

// async function displayDataMedias(medias) {
//   const mediasSection = document.querySelector(".photographer_portfolio");
//   const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);

  // animation slideshow Eventpik
// var EslideIndex = 1;
// EshowSlides(EslideIndex);

// function EplusSlides(n) {
//   EshowSlides(EslideIndex += n);
// }

// function EcurrentSlide(n) {
//   EshowSlides(EslideIndex = n);
// }

// function EshowSlides(n) {
//   var i;
//   var Eslides = document.getElementsByClassName("ESlides");
//   if (n > Eslides.length) {EslideIndex = 1}    
//   if (n < 1) {EslideIndex = Eslides.length}
//   for (i = 0; i < Eslides.length; i++) {
//       Eslides[i].style.display = "none";  
//   }
//   Eslides[EslideIndex-1].style.display = "block";  
// }