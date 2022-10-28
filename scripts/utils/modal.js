// récupération éléments du DOM
const body = document.querySelector("body");
const main = document.getElementById("main");
const modalBg = document.querySelector(".contact_background");
const contactSection = document.querySelector(".contact_container");
const contactHeader = document.querySelector(".contact_header");
let btnClose;
const form = document.querySelector("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
let firstnameValue;
let lastnameValue;
let emailValue;
let messageValue;

// lancement de la modale
export function launchContactModal(photographer) {
  modalBg.style.display = "flex";
  insertFirstnameInForm(photographer);
  createBtnClose();
  modalAccessibility();
}

// insertion prénom du photographe dans le header modale
function insertFirstnameInForm(photographer) {
  const name = document.querySelector("#name");
  name.innerHTML = photographer["name"].split(" ")[0];
}

// création du bouton de fermeture de la modale
function createBtnClose() {
  btnClose = document.createElement("button");
  btnClose.setAttribute("aria-label", "Fermer le formulaire");
  btnClose.classList.add("contact_close");

  const cross = document.createElement("img");
  cross.setAttribute("src", "assets/icons/close.svg");
  cross.setAttribute("alt", "Croix pour fermer le formulaire");
  btnClose.appendChild(cross);

  btnClose.addEventListener("click", (event) => {
    closeContactModal(event);
  });
  contactHeader.appendChild(btnClose);
}

// fermeture de la modale
function closeContactModal() {
  modalBg.style.display = "none";
  contactHeader.removeChild(btnClose);
  modalAccessibility();
}

//------------------------------------------------------------------------------------------
// accessibilité de la modale
function modalAccessibility() {
  if (main.ariaHidden == "false") {
    main.setAttribute("aria-hidden", "true");
    modalBg.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    btnClose.focus();
    document.addEventListener("keydown", (e) => trapFocus(e));
  } else {
    main.setAttribute("aria-hidden", "false");
    modalBg.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
    document.removeEventListener("keydown", (e) => trapFocus(e));
  }
}

// garde le focus dans la modale
function trapFocus(e) {
  // debugger;
  let isTabPressed = e.key === "Tab";
  const focusableElements =
    "button:not([disabled]), input:not([disabled]), textarea:not([disabled])";
  const firstFocusableElement =
    contactSection.querySelectorAll(focusableElements)[0];
  const focusableContent = contactSection.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
}

// fermeture de la modale au clavier
function onKey(e) {
  let keynum = e.key;
  if (keynum == "Escape") {
    closeContactModal();
  }
}

//------------------------------------------------------------------------------------------
// validation input prénom
function isFirstnameValid() {
  firstnameValue = firstname.value.trim();
  if (firstnameValue != "") {
    const regex = /[A-Za-z0-9]{2,}/;
    if (regex.test(firstnameValue)) {
      return hideError(firstname.parentNode);
    }

    return showError(firstname.parentNode);
  }

  return showError(firstname.parentNode);
}

// validation input nom
function isLastnameValid() {
  lastnameValue = lastname.value.trim();
  if (lastnameValue != "") {
    const regex = /[A-Za-z0-9]{2,}/;
    if (regex.test(lastnameValue)) {
      return hideError(lastname.parentNode);
    }

    return showError(lastname.parentNode);
  }

  return showError(lastname.parentNode);
}

// validation input email
function isEmailValid() {
  emailValue = email.value.trim();
  if (emailValue != "") {
    const regex = /[A-Za-z0-9]{1,}@[A-Za-z0-9]{2,}.[A-Za-z0-9]{2,}/;
    if (regex.test(emailValue)) {
      return hideError(email.parentNode);
    }

    return showError(email.parentNode);
  }

  return showError(email.parentNode);
}

// validation input message
function isMessageValid() {
  messageValue = message.value.trim();
  if (messageValue != "") {
    const regex = /^.{10,}$/;
    if (regex.test(messageValue)) {
      return hideError(message.parentNode);
    }

    return showError(message.parentNode);
  }

  return showError(message.parentNode);
}

// affiche le message d'erreur
function showError(elt) {
  elt.setAttribute("data-error-visible", true);

  return false;
}

// enlève le message d'erreur
function hideError(elt) {
  elt.removeAttribute("data-error-visible");

  return true;
}

// check si tous les inputs sont valides
function checkInputs() {
  let isInputsValid =
    isFirstnameValid() &&
    isLastnameValid() &&
    isEmailValid() &&
    isMessageValid();
  if (isInputsValid) {
    return true;
  }

  return false;
}

// soumet le formulaire si les inputs sont valides
function validateForm(elt) {
  elt.preventDefault();
  if (checkInputs()) {
    form.style.display = "none";
    form.reset();
    displayValidation();
    updateFocusElt();
    console.log(`Prénom: ${firstnameValue}`);
    console.log(`Nom: ${lastnameValue}`);
    console.log(`E-mail: ${emailValue}`);
    console.log(`Message: ${messageValue}`);
  }
}

// enlève le formulaire de la modale
function updateFocusElt() {
  const inputs = document.querySelectorAll(".text-control");
  const submit = document.querySelector(".submit_contact");
  inputs.forEach((input) => {
    input.setAttribute("disabled", "true");
  });
  submit.setAttribute("disabled", "true");
  btnClose.focus();
}

// affiche le message de validation dans la modale
function displayValidation() {
  const validation = document.querySelector(".contact_validation");
  validation.style.display = "flex";
}

//eventlisteners
contactSection.addEventListener("keydown", (e) => onKey(e));
firstname.addEventListener("blur", isFirstnameValid);
lastname.addEventListener("blur", isLastnameValid);
email.addEventListener("blur", isEmailValid);
message.addEventListener("blur", isMessageValid);
form.addEventListener("submit", validateForm);
