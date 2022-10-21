import { mediaFactory } from '../factories/mediaFactory.js';

// récupération éléments du DOM
const lightboxBg = document.querySelector('.lightbox_background');
const lightboxContainer = document.querySelector('.lightbox_container');
const closeBtn = document.querySelector('.svg_cross');
const mediasSection = document.querySelector('.slides_list');
let executed = false;

// lancement de la lightbox
export function openLightboxModal(currentPosition, selectedMedias) {
  lightboxBg.style.display = 'block';
  lightboxContainer.style.display = 'flex';
  displayMediasInLightbox(selectedMedias);
  getSlideBtnOnce();
  console.log(currentPosition);
  currentSlide(currentPosition);
  lightboxAccessibility();
}

// création des medias du photographe sélectionné dans la lightbox via la modalFactory
function displayMediasInLightbox(selectedMedias) {
    selectedMedias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getLightboxCardDOM();
    mediasSection.appendChild(mediaCardDOM);
  });
};

// création des boutons de défilement de la lightbox une seule fois
function getSlideBtnOnce() {
  if (!executed) { 
  const previous = document.createElement('a');
  previous.innerHTML = '<';
  previous.classList.add('prev');
  previous.setAttribute('aria-label', 'Contenu précédent');
  previous.addEventListener('click', () => changeSlide(-1));
  lightboxContainer.insertAdjacentElement('afterbegin', previous);

  const next = document.createElement('a');
  next.innerHTML = '>';
  next.classList.add('next');
  next.setAttribute('aria-label', 'Contenu suivant');
  next.addEventListener('click', () => changeSlide(1));
  lightboxContainer.insertAdjacentElement('beforeend' , next);

  executed = true;
  }
}

function lightboxAccessibility() {
  if (main.ariaHidden == 'false') {
    main.removeAttribute('aria-hidden');
    main.setAttribute('aria-hidden', 'true');
  }
  else {
    main.removeAttribute('aria-hidden');
    main.setAttribute('aria-hidden', 'false');
  }
}

//------------------------------------------------------------------------------------------
// récupération du media selectionné pour l'afficher dans la lightbox
let slideIndex = 1;
function currentSlide(currentPosition) {
  slideIndex = currentPosition;
  showSlides(slideIndex);
}

// défilement des medias dans la Lightbox
function changeSlide(n) {
  showSlides(slideIndex += n);
}

// affichage des medias dans la Lightbox
function showSlides(n) {
  const slides = document.getElementsByClassName('slide');
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

//------------------------------------------------------------------------------------------
// fermeture de la lightbox
function closeLightbox(){
  lightboxBg.style.display = 'none';
  lightboxContainer.style.display = 'none';
  mediasSection.innerHTML = '';
}

// eventlistener
closeBtn.addEventListener('click', closeLightbox);
