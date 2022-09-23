import { getPhotographers } from "../database/services.js"
import { modalFactory } from "../factories/modalFactory.js"

// Récupération de l'objet photographer
async function getSelectedPhotographerData(photographers) {
  photographer = photographers.filter(p => p.id == idPhotographer)[0];

  return photographer
}

// affichage du prénom du photographe sélectionné dans le formulaire
// et création du formulaire via la modalFactory
async function displayContactForm(photographer) {
  const contactSection = document.querySelector(".contact_container");
  elt.preventDefault();
  if (document.querySelector(".contact_button").style.display === "block") {
debugger
  // const photographer = photographers.filter(p => p.id == idPhotographer)[0];
  // photographerName = photographer.name.split(' ')[0];
  // photographers.photographerName = photographerName;

  const formModel = modalFactory(photographer);
  const formCardDOM = formModel.getFormCardDOM();
  contactSection.appendChild(formCardDOM);
  }
};

async function init() {
  const photographers = await getPhotographers();
  getSelectedPhotographerData(photographers);
  displayContactForm(photographer);
};

init();


// function displayContactForm(photographer) {
//   const contactSection = document.querySelector(".contact_container");
//   debugger

//   modal.style.display = "block";
//   contactForm.style.display = "block";
//   ligthbox.style.display = "none";

//   const formModel = modalFactory(photographer);
//   const formCardDOM = formModel.getFormCardDOM();
//   contactSection.appendChild(formCardDOM);

// };

//déclaration variable
// const btnOpenForm = document.querySelector(".contact_button");
let btnOpenForm;
if (document.querySelector(".contact_button").style.display === "block") {
  btnOpenForm = document.querySelector(".contact_button");
}

console.log(btnOpenForm);

// function displayContactModal() {
//   modal.style.display = "block";
//   contactForm.style.display = "block";
//   ligthbox.style.display = "none";
// }

//Eventlisteners
btnOpenForm.addEventListener("click", () => {
  // displayContactModal();
  displayContactForm(photographer);
})