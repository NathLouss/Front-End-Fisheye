import { mediaFactory } from '../factories/mediaFactory.js';
// import { selectedMedias } from '../pages/photographer.js'
// const mamediaFactory = mediaFactory();

// récupération éléments du DOM
const lightbox = document.querySelector('.lightbox');
const lightboxContainer = document.querySelector('.lightbox_container');
const lightboxContent = document.querySelector('.lightbox_content');
const closeBtn = document.querySelector('.svg_cross');
const mediasSection = document.querySelector('.slides_list');
let executed = false;

// // lancement de la lightbox
export function openLightboxModal(currentPosition, selectedMedias) {
  lightbox.style.display = 'block';
  lightboxContainer.style.display = 'block';
  displayMediasInLightbox(selectedMedias);
  // currentSlide(currentPosition);
  getSlideBtnOnce();
  showSlides(slideIndex);
  // plusSlides(n)
}

// fermeture de la lightbox
function closeLightbox(){
  lightbox.style.display = 'none';
  lightboxContainer.style.display = 'none';
  mediasSection.innerHTML = '';
}

// exécution only once fonction getSlideBtn
function getSlideBtnOnce() {
  if (!executed) { 
    getSlideBtn()
  }
}

// création des boutons défilement 
function getSlideBtn() {
  const previous = document.createElement('a');
  previous.innerHTML = '<';
  previous.classList.add('prev');
  previous.setAttribute('aria-label', 'Contenu précédent');
  lightboxContent.insertAdjacentElement('afterbegin', previous);

  const next = document.createElement('a');
  next.innerHTML = '>';
  next.classList.add('next');
  next.setAttribute('aria-label', 'Contenu suivant');
  lightboxContent.insertAdjacentElement('beforeend' , next);

  executed = true;
};

// eventlistener
closeBtn.addEventListener('click', closeLightbox);


// affichage des medias du photographe sélectionné dans la lightbox via la modalFactory
function displayMediasInLightbox(selectedMedias) {
    selectedMedias.forEach((media) => {
    // media.photographerName = photographerName;
    // media.currentPosition = currentPosition;
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getLightboxCardDOM();
    mediasSection.appendChild(mediaCardDOM);
  });
};


// défilement de la Lightbox
let slideIndex = 1;
// showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function toSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    // let i;
    var slides = document.getElementsByClassName('slide');
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex-1].style.display = 'flex';
}




