// récupération éléments du DOM
const body = document.querySelector("body");
const main = document.getElementById("main");
const modalBg = document.querySelector(".contact_background");
const contactSection = document.querySelector(".contact_container");
const contactHeader = document.querySelector(".contact_header");
let btnClose;
const firstname = document.getElementById("firstname");
const form = document.querySelector("form");
let inputs = document.querySelectorAll(".text-control");
const message = document.getElementById("validation");
let dataSend = {};

// lancement de la modale
export function launchContactModal(photographer) {
  modalBg.style.display = "flex";
  insertFirstnameInForm(photographer);
  createBtnClose();
  modalAccessibility();
  document.addEventListener("keydown", (e) => trapFocus(e));
}

// insertion prénom du photographe dans le header modale
function insertFirstnameInForm(photographer) {
  const nameSpace = document.querySelector("#name");
  const h1 = photographer["name"].split(" ")[0];
  nameSpace.innerHTML = `Contactez-moi<br />${h1}`;
}

// création du bouton de fermeture de la modale
function createBtnClose() {
  btnClose = document.createElement("button");
  btnClose.setAttribute("aria-label", "Fermer le formulaire");
  btnClose.classList.add("contact_close");
  // btnClose.classList.add("tabindex", "0");

  const cross = document.createElement("i");
  cross.classList.add("fas", "fa-times");
  cross.setAttribute("aria-hidden", "true");
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
  document.removeEventListener("keydown", (e) => trapFocus(e));
}

//------------------------------------------------------------------------------------------
// accessibilité de la modale
function modalAccessibility() {
  if (main.ariaHidden == "false") {
    main.setAttribute("aria-hidden", "true");
    modalBg.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    message.setAttribute("disabled", "true");
    firstname.focus();
  } else {
    main.setAttribute("aria-hidden", "false");
    modalBg.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");
  }
}

// garde le focus dans la modale
function trapFocus(e) {
  let isTabPressed = e.key === "Tab";
  const focusableElements =
    "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), p:not([disabled])";
  const firstFocusableElement =
    contactSection.querySelectorAll(focusableElements)[0];
  const focusableContent = contactSection.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (!isTabPressed) {
    return;
  }

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

// fermeture de la modale au clavier
function onKey(e) {
  let keynum = e.key;
  if (keynum == "Escape") {
    closeContactModal();
  }
}

//------------------------------------------------------------------------------------------
// check si les inputs sont valides
function isInputValid(e) {
  const inputValue = e.currentTarget.value.trim();
  const regex = {
    firstname: /[A-Za-z0-9]{2,}/,
    lastname: /[A-Za-z0-9]{2,}/,
    email: /[A-Za-z0-9]{1,}@[A-Za-z0-9]{2,}.[A-Za-z0-9]{2,}/,
    message: /^.{10,}$/,
  };
  const regexInput = regex[e.currentTarget.name];

  if (inputValue != "") {
    if (regexInput.test(inputValue)) {
      dataSend[e.currentTarget.name] = inputValue;
      return hideError(e.currentTarget.parentNode);
    }

    return showError(e.currentTarget.parentNode);
  }

  return showError(e.currentTarget.parentNode);
}

// affiche le message d'erreur
function showError(e) {
  e.setAttribute("data-error-visible", true);
  e.lastElementChild.setAttribute("data-validation", "false");
}

// enlève le message d'erreur
function hideError(e) {
  e.removeAttribute("data-error-visible");
  e.lastElementChild.setAttribute("data-validation", "true");
}

// check si tous les inputs sont valides
function checkInputs() {
  inputs = Array.from(inputs);
  let check = inputs.every((input) => input.dataset.validation == "true");
  return check;
}

// soumet le formulaire si les inputs sont valides
function validateForm(elt) {
  elt.preventDefault();
  if (checkInputs()) {
    form.style.display = "none";
    form.reset();
    displayValidation();
    // updateFocusElt();
    console.log(dataSend);
  }
}

// update du focus après suppression du formulaire
function updateFocusElt() {
  message.removeAttribute("disabled");
  const inputs = document.querySelectorAll(".text-control");
  const submit = document.querySelector(".submit_contact");
  inputs.forEach((input) => {
    input.setAttribute("disabled", "true");
  });
  submit.setAttribute("disabled", "true");
}

// affiche le message de validation dans la modale
function displayValidation() {
  const validation = document.querySelector(".contact_validation");
  validation.style.display = "flex";
  updateFocusElt();
  btnClose.focus();
  message.setAttribute("tabindex", "0");
  document.addEventListener("keydown", (e) => trapFocus(e));
}

//------------------------------------------------------------------------------------------
//eventlisteners
contactSection.addEventListener("keydown", (e) => onKey(e));
form.addEventListener("submit", validateForm);
inputs.forEach((input) =>
  input.addEventListener("blur", (e) => isInputValid(e))
);
