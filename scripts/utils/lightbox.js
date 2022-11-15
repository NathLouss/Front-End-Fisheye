import { mediaFactory } from "../factories/mediaFactory.js";

// récupération éléments du DOM
const body = document.querySelector("body");
const main = document.querySelector("main");
const lightboxBg = document.querySelector(".lightbox_background");
const lightboxContainer = document.querySelector(".lightbox_container");
const closeBtn = document.querySelector(".svg_cross");
const mediasSection = document.querySelector(".slides_list");
let slides;
let activeSlide;
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
    const previous = document.createElement("button");
    previous.classList.add("prev");
    previous.setAttribute("aria-label", "Media précédent");
    const iLeft = document.createElement("i");
    iLeft.classList.add("fas", "fa-chevron-left");
    iLeft.setAttribute("aria-hidden", "true");
    previous.appendChild(iLeft);
    previous.addEventListener("click", () => changeMedia(-1));
    lightboxContainer.insertAdjacentElement("afterbegin", previous);

    const next = document.createElement("button");
    next.classList.add("next");
    next.setAttribute("aria-label", "Media suivant");
    const iRight = document.createElement("i");
    iRight.classList.add("fas", "fa-chevron-right");
    iRight.setAttribute("aria-hidden", "true");
    next.appendChild(iRight);
    next.addEventListener("click", () => changeMedia(1));
    lightboxContainer.insertAdjacentElement("beforeend", next);

    executed = true;
  }
}

//------------------------------------------------------------------------------------------
// récupération du media selectionné pour l'afficher dans la lightbox
let slideIndex = 1;
function currentSlide(currentPosition) {
  showSlides((slideIndex = currentPosition));
}

// changement de media dans la Lightbox
function changeMedia(n) {
  showSlides((slideIndex += n));
}

// affichage des medias dans la Lightbox
function showSlides(p) {
  slides = document.getElementsByClassName("slide");
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
    slides[i].classList.remove("active");
    slides[i].setAttribute("aria-hidden", "true");
    slides[i].blur();
  }
  // affiche le slide selon index
  slides[slideIndex - 1].style.display = "flex";
  slides[slideIndex - 1].classList.add("active");
  slides[slideIndex - 1].setAttribute("aria-hidden", "false");
  slides[slideIndex - 1].focus();
}

// fermeture de la lightbox
function closeLightbox() {
  lightboxBg.style.display = "none";
  lightboxContainer.style.display = "none";
  mediasSection.innerHTML = "";
  lightboxAccessibility();
}

//------------------------------------------------------------------------------------------
// accessibilité de la lightbox
function lightboxAccessibility() {
  if (main.ariaHidden == "false") {
    body.classList.add("no-scroll");
    main.setAttribute("aria-hidden", "true");
    lightboxBg.setAttribute("aria-hidden", "false");
    lightboxContainer.setAttribute("aria-hidden", "false");
  } else {
    body.classList.remove("no-scroll");
    main.setAttribute("aria-hidden", "false");
    lightboxBg.setAttribute("aria-hidden", "true");
    lightboxContainer.setAttribute("aria-hidden", "false");
  }
}

// garde le focus dans la modale
function trapFocus(e) {
  const focusableElements = "button:not([disabled])";
  const firstFocusableElement =
    lightboxContainer.querySelectorAll(focusableElements)[0];
  const focusableContent =
    lightboxContainer.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  }
}

// navigation lightbox au clavier
document.addEventListener("keydown", (e) => {
  const eventKey = e.code;
  if (eventKey === "ArrowRight") {
    changeMedia(1);
  } else if (eventKey === "ArrowLeft") {
    changeMedia(-1);
  } else if (eventKey === "Escape") {
    closeLightbox();
  } else if (eventKey === "Space") {
    playVideo();
  } else if (eventKey === "Tab") {
    trapFocus(e);
  }
});

// lecture video au clavier
function playVideo() {
  activeSlide = document.querySelector(".active");
  let slideActiveClass = activeSlide.firstChild.className;
  if (
    slideActiveClass == "slideVideo" ||
    slideActiveClass == "slideVideo inProgress"
  ) {
    if (slideActiveClass == "slideVideo inProgress") {
      activeSlide.firstChild.pause();
      activeSlide.firstChild.classList.remove("inProgress");
    } else {
      activeSlide.firstChild.play();
      activeSlide.firstChild.classList.add("inProgress");
    }
  }
}

//------------------------------------------------------------------------------------------
// eventlistener
closeBtn.addEventListener("click", closeLightbox);
