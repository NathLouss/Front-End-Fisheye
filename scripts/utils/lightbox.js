import { displayMediasInLightbox } from '../pages/photographer.js'

// récupération éléments du DOM
const lightbox = document.querySelector('.lightbox');
const lightboxContainer = document.querySelector('.lightbox_container');
const lightboxContent = document.querySelector('.lightbox_content');
const closeBtn = document.querySelector('.svg_cross');

// lancement de la lightbox
export function openLightboxModal() {
    lightbox.style.display = 'block';
    lightboxContainer.style.display = 'block';
    displayMediasInLightbox();
    // currentSlide(currentPosition);
}

// fermeture de la lightbox
function closeLightbox(){
    lightbox.style.display = 'none';
    lightboxContainer.style.display = 'none';
}

// eventlistener
closeBtn.addEventListener('click', closeLightbox);

// défilement de la Lightbox
// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

// function showSlides(n) {
//     var i;
//     var slides = document.getElementsByClassName('slide');
//     if (n > slides.length) {
//         slideIndex = 1
//     }
//     if (n < 1) {
//         slideIndex = slides.length
//     }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = 'none';
//     }
//     slides[slideIndex-1].style.display = 'flex';
// }


// // affichage des medias du photographe sélectionné dans la lightbox via la modalFactory
// function displayMediasInLightbox(medias) {
//   const mediasSection = document.querySelector('.lightbox_container');
//   const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);
  
//   selectedMedias.forEach((media) => {
//     media.photographerName = photographerName;
//     media.currentPosition = currentPosition;
//     const mediaModel = mediaFactory(media);
//     const mediaCardDOM = mediaModel.getLightboxCardDOM();
//     mediasSection.appendChild(mediaCardDOM);
//   });
// };

// async function init() {
//   const medias = await getMedias();
//   displayMediasInLightbox(medias);
// };

// init();