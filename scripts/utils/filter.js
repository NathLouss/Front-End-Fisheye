import { mediaFactory } from "../factories/mediaFactory.js";
import { openLightboxModal } from "./lightbox.js";
import { incrementLikes } from "../utils/likes.js";

// récupération des éléments DOM
const filterBtn = document.querySelector(".filter_btn");
filterBtn.style.display = "inline";
const filterList = document.querySelector(".filter_list");
export const popularity = document.querySelector("#popularity");
export const date = document.querySelector("#date");
export const title = document.querySelector("#title");
const portfolio = document.querySelector(".photographer_portfolio");
let sortedMedias = [];

// ouverture/fermeture de la dropdown de tri
export function toggleDropDown() {
  if (filterBtn.style.display == "inline") {
    filterBtn.style.display = "none";
    filterList.style.display = "block";
    filterBtn.setAttribute("aria-expanded", "true");
    popularity.focus();
  } else {
    filterList.style.display = "none";
    filterBtn.style.display = "inline";
    filterBtn.setAttribute("aria-expanded", "false");
    popularity.blur();
  }
}

// lancement du tri des médias
export function updateSort(e, selectedMedias) {
  const property = e.target.dataset.property;
  const choice = e.currentTarget.innerText;
  sortBy(property, selectedMedias);
  displaySelected(choice);
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
function displaySelected(choice) {
  filterList.style.display = "none";
  filterBtn.style.display = "inline";
  filterBtn.innerHTML = "";
  const closeArrow = document.createElement("i");
  closeArrow.classList.add("fas", "fa-chevron-down");
  filterBtn.innerHTML = choice;
  filterBtn.appendChild(closeArrow);
  filterBtn.style.display = "inline";
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
    mediaCardDOM["icon"].addEventListener("click", (e) =>
      incrementLikes(e, media)
    );
  });
}
