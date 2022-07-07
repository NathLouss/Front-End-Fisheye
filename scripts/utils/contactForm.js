function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    displayFirstname()
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function displayFirstname() {
    const modalHeader = document.querySelector(".contact_header_text");
    const firstnamePhotographer = document.createElement( 'p' );
    firstnamePhotographer.textContent = photographerName;
    modalHeader.appendChild(firstnamePhotographer);
}

const formData = document.querySelectorAll(".formData");
const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");

// check if Firstname is valid & display or not error
isFirstnameValid = () => {
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
  isLastnameValid = () => {
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
  isEmailValid = () => {
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

  // display error message
showError = (element) => {
    element.setAttribute("data-error-visible", true);
  
    return false
  }
  
  // hide error message
  hideError = (element) => {
    element.removeAttribute("data-error-visible");
  
    return true
  }

  // check if all inputs are valid
checkInputs = () => {
    let isInputsValid = isFirstnameValid() && isLastnameValid() && isEmailValid() && isBirthdateValid() && isQuantityValid() && isRadioChecked() && isCheckboxChecked();
    if (isInputsValid) {
      return true
    }
  
    return false
  }
  
  // check if inputs are valid & display or not submit button
  disabledSubmit = () => {
    checkInputs ? submit.removeAttribute("disabled") : submit.setAttribute("disabled", true)
  }
  
  // check if all inputs are valid & submit the form
  validateForm = (e) => {
    e.preventDefault();
    if (checkInputs()) {
      modalContainer.classList.remove("active");
      modalValidation.classList.add("active")
    }
  }

  // EVENT LISTENERS
firstname.addEventListener("blur", isFirstnameValid);
lastname.addEventListener("blur", isLastnameValid);
email.addEventListener("blur", isEmailValid);
formData.forEach(input => input.addEventListener("change", disabledSubmit));
form.addEventListener("submit", validateForm);
