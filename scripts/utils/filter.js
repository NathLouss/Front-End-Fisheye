import { mediaFactory } from "../factories/mediaFactory.js";
import { openLightboxModal } from "./lightbox.js";
import { incrementLikes } from "../utils/likes.js";

// récupération des éléments DOM
const filterBtn = document.querySelector(".filter_btn");
filterBtn.style.display = "inline";
const filterList = document.querySelector(".filter_list");
const popularity = document.querySelector("#popularity");
const portfolio = document.querySelector(".photographer_portfolio");
let sortedMedias = [];

// ouverture/fermeture de la dropdown de tri
export function toggleDropDown() {
  if (filterBtn.style.display == "inline") {
    filterBtn.style.display = "none";
    filterList.style.display = "block";
    filterBtn.setAttribute("aria-expanded", "true");
    popularity.focus();
    document.addEventListener("keydown", (e) => trapFocus(e));
    document.addEventListener(
      "keydown",
      (e) => e.key === "Escape" && toggleDropDown()
    );
  } else {
    filterList.style.display = "none";
    filterBtn.style.display = "inline";
    filterBtn.setAttribute("aria-expanded", "false");
    popularity.blur();
    document.removeEventListener("keydown", (e) => trapFocus(e));
    document.removeEventListener("keydown", (e) => toggleDropDown(e));
  }
}

// lancement du tri des médias
export function updateSort(e, selectedMedias) {
  const property = e.currentTarget.dataset.property;
  const optionName = e.currentTarget.innerText;
  const optionElt = e.currentTarget;
  sortBy(property, selectedMedias);
  displaySelected(optionName);
  accessibilityFilter(optionElt);
  displayMediasSorted(sortedMedias);
}

// tri des médias selon la propriété sélectionnée
function sortBy(property, selectedMedias) {
  sortedMedias = selectedMedias.sort((a, b) =>
    a[property] < b[property] ? -1 : b[property] > a[property] ? 1 : 0
  );

  return sortedMedias;
}

// affichage de la propriété selectionnée dans le bouton de tri
function displaySelected(optionName) {
  filterList.style.display = "none";
  filterBtn.style.display = "inline";
  filterBtn.innerHTML = "";
  const closeArrow = document.createElement("i");
  closeArrow.classList.add("fas", "fa-chevron-down");
  filterBtn.innerHTML = optionName;
  filterBtn.appendChild(closeArrow);
  filterBtn.style.display = "inline";
}

// indication accessibilité sur les options de filtre
function accessibilityFilter(optionElt) {
  const options = document.querySelectorAll(".list_option");
  options.forEach((option) => option.setAttribute("aria-selected", "false"));
  optionElt.setAttribute("aria-selected", "true");
}

// garde le focus sur la page
function trapFocus(e) {
  const focusableElements = "li";
  const firstFocusableElement =
    filterList.querySelectorAll(focusableElements)[0];
  const focusableContent = filterList.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

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

// affichage des médias triés et passage en argument pour l'affichage dans la lightbox
function displayMediasSorted(sortedMedias) {
  const mediasSection = document.querySelector(".photographer_portfolio");
  portfolio.innerHTML = "";
  let currentPosition = 0;

  sortedMedias.forEach((media) => {
    currentPosition += 1;
    media.currentPosition = currentPosition;
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediasSection.appendChild(mediaCardDOM["articlePortfolio"]);
    mediaCardDOM["anchor"].addEventListener("click", () =>
      openLightboxModal(media.currentPosition, sortedMedias)
    );
    mediaCardDOM["btn"].addEventListener(
      "click",
      (e) => incrementLikes(e, media),
      { once: true }
    );
    mediaCardDOM["btn"].addEventListener(
      "keydown",
      (e) => e.key === "Enter" && incrementLikes(e, media),
      { once: true }
    );
  });
}
