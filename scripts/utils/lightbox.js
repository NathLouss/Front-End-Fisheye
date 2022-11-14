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
    document.addEventListener("keydown", (e) => trapFocus(e));
  } else {
    body.classList.remove("no-scroll");
    main.setAttribute("aria-hidden", "false");
    lightboxBg.setAttribute("aria-hidden", "true");
    lightboxContainer.setAttribute("aria-hidden", "false");
    document.removeEventListener("keydown", (e) => trapFocus(e));
  }
}

// garde le focus dans la modale
function trapFocus(e) {
  let isTabPressed = e.key === "Tab";
  const focusableElements = "button:not([disabled])";
  const firstFocusableElement =
    lightboxContainer.querySelectorAll(focusableElements)[0];
  const focusableContent =
    lightboxContainer.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // si la touche Maj est enfoncée pour la combinaison Maj + tabulation
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // ajouter le focus pour le dernier élément focalisable
      e.preventDefault();
    }
  } else {
    // si la touche de tabulation est enfoncée
    if (document.activeElement === lastFocusableElement) {
      // si la focalisation a atteint le dernier élément focalisable, alors focalisez le premier élément focalisable après avoir appuyé sur la tabulation
      firstFocusableElement.focus(); // ajouter le focus pour le premier élément focalisable
      e.preventDefault();
    }
  }
}

// lecture video au clavier
function playVideo() {
  debugger;
  let slideActive = document.querySelector(".active");
  let slideActiveClass = slideActive.firstChild.className;
  if (
    slideActiveClass == "slideVideo" ||
    slideActiveClass == "slideVideo inProgress"
  ) {
    if (slideActiveClass == "slideVideo inProgress") {
      slideActive.firstChild.pause();
      slideActive.firstChild.classList.remove("inProgress");
    } else {
      slideActive.firstChild.play();
      slideActive.firstChild.classList.add("inProgress");
    }
  }
}

// désactive effet touche Enter
function cancelEnter(e) {
  e.preventDefault;
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
    slides[i].classList.remove("active");
    slides[i].setAttribute("aria-hidden", "false");
  }
  // affiche le slide selon index
  slides[slideIndex - 1].style.display = "flex";
  slides[slideIndex - 1].classList.add("active");
  slides[slideIndex - 1].setAttribute("aria-hidden", "true");
}

//------------------------------------------------------------------------------------------
// eventlistener
closeBtn.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  const eventKey = e.key;
  if (eventKey === "ArrowRight") {
    changeMedia(1);
  } else if (eventKey === "ArrowLeft") {
    changeMedia(-1);
  } else if (eventKey === "Escape") {
    closeLightbox();
  }
});
lightboxContainer.addEventListener("keydown", (e) => {
  e.code == "Space" && playVideo();
});
lightboxContainer.addEventListener("keydown", (e) => {
  e.code == "Enter" && cancelEnter(e);
});
