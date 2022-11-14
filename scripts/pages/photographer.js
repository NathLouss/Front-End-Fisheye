import { getPhotographers, getMedias } from "../database/services.js";
import { photographerFactory } from "../factories/photographerFactory.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { launchContactModal } from "../utils/modal.js";
import { openLightboxModal } from "../utils/lightbox.js";
import { toggleDropDown, updateSort } from "../utils/filter.js";
import { incrementLikes } from "../utils/likes.js";

// déclaration des variables
let photographer;
let photographerName;
let selectedMedias = [];
let likesArray = [];

// récupération de l'id du photographe
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotographer = urlParams.get("id");
if (!idPhotographer) {
  window.location.href = "index.html";
}

// insertion des informations du photographe sélectionné via la photographerFactory
async function displayDataPhotographer(photographers) {
  photographer = photographers.find((p) => p.id == idPhotographer);
  const photographerModel = photographerFactory(photographer);
  photographerName = photographerModel.getSelectedPhotographerName();

  // dans le header
  const headerSection = document.querySelector(".photographer_header");
  photographerModel.insertDataInHeader();
  const imgDOM = photographerModel.insertPhotoInHeader();
  headerSection.appendChild(imgDOM);

  // dans l'étiquette
  const thumbnail = document.querySelector(".photographer_thumbnail");
  const rateDOM = photographerModel.insertRateInThumbnail();
  thumbnail.appendChild(rateDOM);

  // dans le titre de la page
  const titlePage = document.querySelector(".title");
  titlePage.innerHTML = `Fisheye - ${photographer.name}`;
}

// affichage des médias dans le portfolio du photographe via la mediaFactory
async function displayDataMedias() {
  const mediasSection = document.querySelector(".photographer_portfolio");
  let currentPosition = 0;

  selectedMedias.forEach((media) => {
    currentPosition = parseInt(currentPosition) + 1;
    media.currentPosition = currentPosition;
    media.photographerName = photographerName;
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediasSection.appendChild(mediaCardDOM["articlePortfolio"]);
    mediaCardDOM["anchor"].addEventListener("click", () =>
      openLightboxModal(media.currentPosition, selectedMedias)
    );
    mediaCardDOM["btn"].addEventListener(
      "click",
      (e) => {
        incrementLikes(e, media);
      },
      { once: true }
    );
    mediaCardDOM["btn"].addEventListener(
      "keydown",
      (e) => {
        e.key === "Enter" && incrementLikes(e, media);
        e.preventDefault();
      },
      { once: true }
    );
  });
}

// affichage des likes photo dans le compteur
async function displayLikesCounter() {
  selectedMedias.forEach((media) => {
    likesArray.push(media.likes);
  });

  const sumLikes = (previousValue, currentValue) =>
    previousValue + currentValue;
  let totalLikes = likesArray.reduce(sumLikes);
  const counter = document.querySelector(".totalLikes");
  counter.insertAdjacentHTML("afterbegin", totalLikes);
}

//------------------------------------------------------------------------------------------
// initialisation des fonctions asynchrones
async function init() {
  const photographers = await getPhotographers();
  const medias = await getMedias();
  selectedMedias = medias.filter((m) => m.photographerId == idPhotographer);
  displayDataPhotographer(photographers);
  displayDataMedias();
  displayLikesCounter();
}

init();

//------------------------------------------------------------------------------------------
// garde le focus sur la page
// function trapFocus(e) {
//   // const body = document.querySelector("body");
//   // const focusableElements = "button:not([disabled]), a:not([disabled])";
//   // const firstFocusableElement = body.querySelectorAll(focusableElements)[0];
//   // const focusableContent = body.querySelectorAll(focusableElements);
//   // const lastFocusableElement = focusableContent[focusableContent.length - 1];
//   debugger;
//   const focusableElements = document.querySelectorAll('[role="button"]');
//   const firstFocusableElement = focusableElements[0];
//   const lastFocusableElement = focusableElements[focusableElements.length - 1];

//   if (e.shiftKey) {
//     // si la touche Maj est enfoncée pour la combinaison Maj + tabulation
//     if (document.activeElement === firstFocusableElement) {
//       lastFocusableElement.focus(); // ajouter le focus pour le dernier élément focalisable
//       e.preventDefault();
//     }
//   } else {
//     // si la touche de tabulation est enfoncée
//     if (document.activeElement === lastFocusableElement) {
//       // si la focalisation a atteint le dernier élément focalisable, alors focalisez le premier élément focalisable après avoir appuyé sur la tabulation
//       firstFocusableElement.focus(); // ajouter le focus pour le premier élément focalisable
//       e.preventDefault();
//     }
//   }
// }

// document.addEventListener("keydown", (e) => {
//   e.code == "Tab" && trapFocus(e);
// });

//------------------------------------------------------------------------------------------
// Event listener lancement de la modale
const contactBtn = document.querySelector(".contact_button");
contactBtn.addEventListener("click", () => launchContactModal(photographer));

// Event listener lancement dropdown de tri des médias
const triggers = document.querySelectorAll(".trigger");
triggers.forEach((btn) =>
  btn.addEventListener("click", () => toggleDropDown())
);

// Event listeners tri des médias
const optionSort = document.querySelectorAll(".list_option");
optionSort.forEach((option) =>
  option.addEventListener("click", (e) => updateSort(e, selectedMedias))
);
optionSort.forEach((option) =>
  option.addEventListener("keydown", (e) => {
    e.key === "Enter" && updateSort(e, selectedMedias);
  })
);
