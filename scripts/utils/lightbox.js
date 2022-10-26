import { mediaFactory } from "../factories/mediaFactory.js";

// récupération éléments du DOM
const body = document.querySelector("body");
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
  console.log(currentPosition);
  showSlides(currentPosition);
  // currentSlide(currentPosition);
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
function getSlideBtnOnce(currentPosition) {
  if (!executed) {
    const previous = document.createElement("a");
    previous.innerHTML = "<";
    previous.classList.add("prev");
    previous.setAttribute("type", "button");
    previous.setAttribute("aria-label", "Contenu précédent");
    previous.addEventListener("click", () => changeSlide(-1));
    lightboxContainer.insertAdjacentElement("afterbegin", previous);

    const next = document.createElement("a");
    next.innerHTML = ">";
    next.classList.add("next");
    next.setAttribute("type", "button");
    next.setAttribute("aria-label", "Contenu suivant");
    next.addEventListener("click", () => changeSlide(1));
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
// récupération du media selectionné pour l'afficher dans la lightbox
// let slideIndex = 1;
// function currentSlide(currentPosition) {
//   slideIndex = currentPosition;
//   showSlides(slideIndex);
// }

let currentPosition = 1;
// défilement des medias dans la Lightbox
function changeSlide(n) {
  // let newCurrentPosition = currentPosition + n;
  // showSlides(newCurrentPosition);
  showSlides((currentPosition += n));
}

// affichage des medias dans la Lightbox
function showSlides(currentPosition) {
  const slides = document.getElementsByClassName("slide");
  if (currentPosition > slides.length) {
    currentPosition = 1;
  }
  if (currentPosition < 1) {
    currentPosition = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentPosition - 1].style.display = "flex";
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
