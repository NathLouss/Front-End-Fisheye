// import { getMedias } from '../database/services.js'
// import { modalFactory } from '../factories/modalFactory.js'

// // Récupération de l'id du photographe
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const idPhotographer = urlParams.get('id');

// // déclaration des variables
// // let photographerName;
// // let currentPosition = 0;
// const modal = document.querySelector('.modal');

// // affichage des médias du photographe sélectionné dans la lightbox
// // via la modalFactory
// async function displayMediasInLightbox(medias) {
//   const mediasSection = document.querySelector('.lightbox_container');
//   const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);
  
//   selectedMedias.forEach((media) => {
//     media.photographerName = photographerName;
//     media.currentPosition = currentPosition;
//     const mediaModel = modalFactory(media);
//     const mediaCardDOM = mediaModel.getLightboxCardDOM();
//     mediasSection.appendChild(mediaCardDOM);
//   });
// };

// async function init() {
//   const medias = await getMedias();
//   displayMediasInLightbox(medias);
// };

// init();

// // fermeture de la lightbox
// function closeLightboxModal() {
//   modal.style.display = 'none';
// }

// // Lightbox
// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName('slide');
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = 'none';
//   }
//   slides[slideIndex-1].style.display = 'flex';
// }

// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }
  