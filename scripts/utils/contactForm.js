const modal = document.getElementById("contact_modal");
const form = document.querySelector("form");
const validation = document.querySelector(".validation");
const formData = document.querySelectorAll(".formData");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const btn = document.querySelector(".contact_button");
const submit = document.querySelector("input[type=submit]");

function displayModal() {
	modal.style.display = "block";
  displayFirstname()
}

function closeModal() {
  modal.style.display = "none";
  hideFirstname()
}

const firstnamePhotographer = document.createElement( 'p' );
function displayFirstname() {
  const modalHeader = document.querySelector(".contact_header_text");
  firstnamePhotographer.textContent = photographerName;
  modalHeader.appendChild(firstnamePhotographer);
}

function hideFirstname() {
  firstnamePhotographer.style.display = "none";
}

function hideForm() {
  form.style.display = "none";
}

function displayValidation() {
  validation.style.display = "block";
}

// check if Firstname is valid & display or not error
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

// check if Lastname is valid & display or not error
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

// check if email is valid & display or not error
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

// check if message is valid & display or not error
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

// display error message
function showError(elt) {
  elt.setAttribute("data-error-visible", true);
  
  return false
}
  
// hide error message
function hideError(elt) {
  elt.removeAttribute("data-error-visible");

  return true
}

// check if all inputs are valid
function checkInputs() {
  let isInputsValid = isFirstnameValid() && isLastnameValid() && isEmailValid() && isMessageValid();
  if (isInputsValid) {
    return true
  }

  return false
}
  
// check if inputs are valid & display or not submit button
function disabledSubmit() {
  checkInputs ? btn.removeAttribute("disabled") : btn.setAttribute("disabled", true)
}

// check if all inputs are valid & submit the form
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
