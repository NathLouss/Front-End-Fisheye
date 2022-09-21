import { getMedias } from "../database/services.js"
import { modalFactory } from "../factories/modalFactory.js"

// affichage du prénom du photographe sélectionné dans le formulaire
// et création du formulaire
// via la modalFactory
async function displayDataInContactForm(medias) {
  const contactSection = document.querySelector(".contact_container");
  medias.photographerName = photographerName;
  const formModel = modalFactory(medias);
  const formCardDOM = formModel.getFormCardDOM();
  contactSection.appendChild(formCardDOM);
};

async function init() {
  const medias = await getMedias();
  displayDataInContactForm(medias);
};

init();


