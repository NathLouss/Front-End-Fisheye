// récupération des éléments html
const modal = document.querySelector(".modal");
const contactModal = document.querySelector(".contact_container");
const form = document.querySelector("form");
const validation = document.querySelector(".validation");
const formData = document.querySelectorAll(".formData");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const btn = document.querySelector(".contact_button");
const submit = document.querySelector("input[type=submit]");

// affichage de la modale de contact
function displayContactModal() {
  media.photographerName = photographerName;
  const mediaModel = modalFactory(media);
  const mediaCardDOM = mediaModel.getFormCardDOM();
  modal.appendChild(mediaCardDOM);

	modal.style.display = "block";
  // contactModal.style.display = "block";
  // lightboxModal.style.display = "none";
  // displayFirstname()
}

// fermeture de la modale
function closeContactModal() {
  modal.style.display = "none";
  // hideFirstname()
}

// affichage du nom du photographe dans le header de la modale
// const firstnamePhotographer = document.createElement( 'p' );
// function displayFirstname() {
//   const modalHeader = document.querySelector(".contact_header_text");
//   firstnamePhotographer.textContent = photographerName;
//   modalHeader.appendChild(firstnamePhotographer);
// }

// enlève le formulaire de la modale
function hideForm() {
  form.style.display = "none";
}

// affiche le message de validation dans la modale
function displayValidation() {
  validation.style.display = "block";
}

// check si l'input prénom est valide et renvoi si message erreur ou non
function isFirstnameValid() {
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
function isLastnameValid() {
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
function isEmailValid() {
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
function isMessageValid() {
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
  
// donne accès au bouton si les inputs sont valides
function disabledSubmit() {
  checkInputs ? btn.removeAttribute("disabled") : btn.setAttribute("disabled", true)
}

// soumet le formulaire si les inputs sont valides
function validateForm(elt) {
  elt.preventDefault();
  if (checkInputs()) {
    hideForm();
    displayValidation();
    form.reset();
  }
}

// EVENT LISTENERS
firstname.addEventListener("blur", isFirstnameValid);
lastname.addEventListener("blur", isLastnameValid);
email.addEventListener("blur", isEmailValid);
message.addEventListener("blur", isMessageValid);
formData.forEach(input => input.addEventListener("change", disabledSubmit));
form.addEventListener("submit", validateForm);
 