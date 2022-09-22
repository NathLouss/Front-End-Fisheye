import { getPhotographers } from "../database/services.js"
import { modalFactory } from "../factories/modalFactory.js"

// affichage du prénom du photographe sélectionné dans le formulaire
// et création du formulaire
// via la modalFactory
async function displayDataInContactForm(photographers) {
  const contactSection = document.querySelector(".contact_container");

  const photographer = photographers.filter(photographer => photographer.id == idPhotographer);
  photographerName = photographer[0].name.split(' ')[0];
  photographers.photographerName = photographerName;

  const formModel = modalFactory(photographers);
  const formCardDOM = formModel.getFormCardDOM();
  contactSection.appendChild(formCardDOM);
};

async function init() {
  const photographers = await getPhotographers();
  displayDataInContactForm(photographers);
};

init();


