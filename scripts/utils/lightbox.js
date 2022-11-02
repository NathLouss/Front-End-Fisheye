import { mediaFactory } from "../factories/mediaFactory.js";

// récupération éléments du DOM
const body = document.querySelector("body");
const main = document.querySelector("main");
const lightboxBg = document.querySelector(".lightbox_background");
const lightboxContainer = document.querySelector(".lightbox_container");
const closeBtn = document.querySelector(".svg_cross");
const mediasSection = document.querySelector(".slides_list");
let executed = false;

// lancement de la lightbox
export function openLightboxModal(currentPosition, selectedMedias) {
  lightboxBg.style.display = "block";
  lightboxContainer.style.display = "flex";
  displayMediasInLightbox(selectedMedias);
  getSlideBtnOnce(currentPosition);
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
}

// création des boutons de défilement de la lightbox une seule fois
function getSlideBtnOnce() {
  if (!executed) {
    const previous = document.createElement("a");
    previous.innerHTML = "<";
    previous.classList.add("prev");
    previous.setAttribute("type", "button");
    previous.setAttribute("aria-label", "Media précédent");
    previous.addEventListener("click", () => changeMedia(-1));
    lightboxContainer.insertAdjacentElement("afterbegin", previous);

    const next = document.createElement("a");
    next.innerHTML = ">";
    next.classList.add("next");
    next.setAttribute("type", "button");
    next.setAttribute("aria-label", "Media suivant");
    next.addEventListener("click", () => changeMedia(1));
    lightboxContainer.insertAdjacentElement("beforeend", next);

    executed = true;
  }
}

// accessibilité de la lightbox
function lightboxAccessibility() {
  if (main.ariaHidden == "false") {
    body.classList.add("no-scroll");
    main.setAttribute("aria-hidden", "true");
    lightboxBg.setAttribute("aria-hidden", "false");
  } else {
    body.classList.remove("no-scroll");
    main.setAttribute("aria-hidden", "false");
    lightboxBg.setAttribute("aria-hidden", "true");
  }
}

//------------------------------------------------------------------------------------------
let slideIndex = 1;

// récupération du media selectionné pour l'afficher dans la lightbox
function currentSlide(currentPosition) {
  showSlides((slideIndex = currentPosition));
}

// changement de media dans la Lightbox
function changeMedia(n) {
  showSlides((slideIndex += n));
}

// affichage des medias dans la Lightbox
function showSlides(p) {
  var slides = document.getElementsByClassName("slide");
  // si dde position sup au total des slides,
  // réinitialise slideindex pour revenir au dbt
  if (p > slides.length) {
    slideIndex = 1;
  }
  // si dde position inf au total des slides,
  // affiche la dernière slide
  if (p < 1) {
    slideIndex = slides.length;
  }
  // cache tous les slides par défaut
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // affiche le slide selon index
  slides[slideIndex - 1].style.display = "flex";
}

//------------------------------------------------------------------------------------------
// fermeture de la lightbox
function closeLightbox() {
  lightboxBg.style.display = "none";
  lightboxContainer.style.display = "none";
  mediasSection.innerHTML = "";
}

// eventlistener
closeBtn.addEventListener("click", closeLightbox);
