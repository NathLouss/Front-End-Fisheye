import { getPhotographers } from "../database/services.js";
import { photographerFactory } from "../factories/photographerFactory.js";

// affichage des datas des Photographes via la photographerFactory
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();

//------------------------------------------------------------------------------------------
// garde le focus sur la page
function trapFocus(e) {
  const body = document.querySelector("body");
  const focusableElements = "a";
  const firstFocusableElement = body.querySelectorAll(focusableElements)[0];
  const focusableContent = body.querySelectorAll(focusableElements);
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

document.addEventListener("keydown", (e) => {
  e.code == "Tab" && trapFocus(e);
});
