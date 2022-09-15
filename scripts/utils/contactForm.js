import { getMedias } from "../database/services.js"
import { modalFactory } from "../factories/modalFactory.js"
import photographerName from "../pages/photographer.js"

// récupération des éléments html
const modal = document.querySelector(".modal");
const contactModal = document.querySelector(".contact_container");
const submit = document.querySelector("input[type=submit]");

// affichage de la modale de contact
export function displayContactModal() {
  modal.style.display = "block";
  contactModal.style.display = "block";
  lightboxModal.style.display = "none";
}

// fermeture de la modale
export function closeContactModal() {
  modal.style.display = "none";
}

// enlève le formulaire de la modale
function hideForm() {
  const form = document.querySelector("form");
  form.style.display = "none";
}

// affichage des datas du photographe sélectionné dans le header
// via la modalFactory
async function displayDataInContactForm(medias) {
  const contactSection = document.querySelector(".contact_container");
  medias.photographerName = photographerName;
  const formModel = modalFactory(medias);
  const formCardDOM = formModel.getFormCardDOM();
  contactSection.appendChild(formCardDOM);
};

async function init() {
  const {medias} = await getMedias();
  displayDataInContactForm(medias);
};

init();

// affiche le message de validation dans la modale
function displayValidation() {
  const validation = document.querySelector(".validation");
  validation.style.display = "flex";
}

// check si l'input prénom est valide et renvoi si message erreur ou non
export function isFirstnameValid() {
  const firstname = document.getElementById("firstname");
  let firstnameValue = firstname.value.trim();
  if (firstnameValue != "") {
    const regex = /[A-Za-z0-9]{2,}/;
    if (regex.test(firstnameValue)) {
      return hideError(firstname.parentNode);
    } 
    
    return showError(firstname.parentNode)
  }
  
  return showError(firstname.parentNode)
}

// check si l'input nom est valide et renvoi si message erreur ou non
export function isLastnameValid() {
  const lastname = document.getElementById("lastname");
  let lastnameValue = lastname.value.trim();
  if (lastnameValue != "") {
    const regex = /[A-Za-z0-9]{2,}/;
    if (regex.test(lastnameValue)) {
      return hideError(lastname.parentNode);
    } 
    
    return showError(lastname.parentNode)
  }
  
  return showError(lastname.parentNode)
}

// check si l'input email est valide et renvoi si message erreur ou non
export function isEmailValid() {
  const email = document.getElementById("email");
  let emailValue = email.value.trim();
  if (emailValue != "") {
    const regex = /[A-Za-z0-9]{1,}@[A-Za-z0-9]{2,}.[A-Za-z0-9]{2,}/;
    if (regex.test(emailValue)) {
      return hideError(email.parentNode);
    } 
    
    return showError(email.parentNode)
  }
  
  return showError(email.parentNode)
}

// check si l'input message est valide et renvoi si message erreur ou non
export function isMessageValid() {
  const message = document.getElementById("message");
  let messageValue = message.value.trim();
  if (messageValue != "") {
    const regex = /^.{10,}$/;
    if (regex.test(messageValue)) {
      return hideError(message.parentNode);
    } 
    
    return showError(message.parentNode)
  }
  
  return showError(message.parentNode)
}

// affiche le message d'erreur
function showError(elt) {
  elt.setAttribute("data-error-visible", true);
  
  return false
}

// enlève le message d'erreur
function hideError(elt) {
  elt.removeAttribute("data-error-visible");
  
  return true
}

// check si les inputs sont valides
function checkInputs() {
  let isInputsValid = isFirstnameValid() && isLastnameValid() && isEmailValid() && isMessageValid();
  if (isInputsValid) {
    return true
  }
  
  return false
}

// // donne accès au bouton si les inputs sont valides
function disabledSubmit() {
  const btn = document.querySelector(".contact_button");
  checkInputs ? btn.removeAttribute("disabled") : btn.setAttribute("disabled", true)
}

// // soumet le formulaire si les inputs sont valides
export function validateForm(elt) {
  elt.preventDefault();
  if (checkInputs()) {
    hideForm();
    displayValidation();
    form.reset();
  }
}

