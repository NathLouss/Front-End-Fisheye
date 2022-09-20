export function modalFactory(dataMedias) {
  const { photographerName, title, image, video } = dataMedias;
  const picture = `assets/photographers/${photographerName}/${image}`;
  const movie = `assets/photographers/${photographerName}/${video}`;

  
  function getFormCardDOM() { 
    const contactContent = document.createElement( 'div' );
    contactContent.classList.add("contact_content");
    
    const header = document.createElement( 'header' );
    header.classList.add("header");
    contactContent.appendChild(header);
    
    const headerText = document.createElement( 'div' );
    headerText.classList.add("header_text");
    header.appendChild(headerText);
    
    const h2 = document.createElement( 'h2' );
    h2.textContent = "Contactez-moi";
    headerText.appendChild(h2);

    const p = document.createElement( 'p' );
    p.textContent = photographerName;
    headerText.appendChild(p);
    
    const icon = document.createElement( 'img' );
    icon.setAttribute("src", "assets/icons/close.svg");
    icon.addEventListener("click", () => {
      // closeContactModal()
      modal.style.display = "none";
    })
    header.appendChild(icon);
    
    const form = document.createElement( 'form' );
    form.classList.add("formContact");
    form.addEventListener("submit", (elt) => {
      validateForm(elt)
    })
    contactContent.appendChild(form);
    
    const firstnameDiv = document.createElement( 'div' );
    firstnameDiv.classList.add("formData");
    firstnameDiv.setAttribute("data-error", "Veuillez saisir votre prénom.");
    form.appendChild(firstnameDiv);
    
    const firstnameLabel = document.createElement( 'label' );
    firstnameLabel.setAttribute("for", "firstname");
    firstnameLabel.textContent = "Prénom";
    firstnameDiv.appendChild(firstnameLabel);
    
    const firstnameInput = document.createElement( 'input' );
    firstnameInput.classList.add("text-control");
    firstnameInput.setAttribute("type", "text");
    firstnameInput.setAttribute("id", "firstname");
    firstnameInput.setAttribute("name", "firstname");
    firstnameInput.addEventListener("blur", () => {
      isFirstnameValid()
    })
    firstnameDiv.appendChild(firstnameInput);
    
    const lastnameDiv = document.createElement( 'div' );
    lastnameDiv.classList.add("formData");
    lastnameDiv.setAttribute("data-error", "Veuillez saisir votre nom.");
    form.appendChild(lastnameDiv);
    
    const lastnameLabel = document.createElement( 'label' );
    lastnameLabel.setAttribute("for", "lastname");
    lastnameLabel.textContent = "Nom";
    lastnameDiv.appendChild(lastnameLabel);
    
    const lastnameInput = document.createElement( 'input' );
    lastnameInput.classList.add("text-control");
    lastnameInput.setAttribute("type", "text");
    lastnameInput.setAttribute("id", "lastname");
    lastnameInput.setAttribute("name", "lastname");
    lastnameInput.addEventListener("blur", () => {
      isLastnameValid()
    })
    lastnameDiv.appendChild(lastnameInput);

    const emailDiv = document.createElement( 'div' );
    emailDiv.classList.add("formData");
    emailDiv.setAttribute("data-error", "Veuillez saisir un email valide.");
    form.appendChild(emailDiv);
    
    const emailLabel = document.createElement( 'label' );
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Email";
    emailDiv.appendChild(emailLabel);
    
    const emailInput = document.createElement( 'input' );
    emailInput.classList.add("text-control");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("id", "email");
    emailInput.setAttribute("name", "email");
    emailInput.addEventListener("blur", () => {
      isEmailValid()
    })
    emailDiv.appendChild(emailInput);
    
    const messageDiv = document.createElement( 'div' );
    messageDiv.classList.add("formData");
    messageDiv.setAttribute("data-error", "Veuillez saisir votre message.");
    form.appendChild(messageDiv);
    
    const messageLabel = document.createElement( 'label' );
    messageLabel.setAttribute("for", "message");
    messageLabel.textContent = "Message";
    messageDiv.appendChild(messageLabel);
    
    const messageInput = document.createElement( 'input' );
    messageInput.classList.add("text-control");
    messageInput.setAttribute("type", "text");
    messageInput.setAttribute("id", "message");
    messageInput.setAttribute("name", "message");
    messageInput.addEventListener("blur", () => {
      isMessageValid()
    })
    messageDiv.appendChild(messageInput);
    
    const submit = document.createElement( 'button' );
    submit.classList.add("contact_button");
    submit.setAttribute("type", "submit");
    submit.textContent = "Envoyer";
    form.appendChild(submit);
    
    const validationDiv = document.createElement( 'div' );
    validationDiv.classList.add("validation");
    contactContent.appendChild(validationDiv);
    
    const validationText = document.createElement( 'p' );
    validationText.textContent = "Votre message a bien été envoyé !";
    validationDiv.appendChild(validationText);
    
    return (contactContent)
  }

  // déclaration des variables
  const modal = document.querySelector(".modal");
  const contactModal = document.querySelector(".contact_container");
  const submit = document.querySelector("input[type=submit]");
  
  // enlève le formulaire de la modale
  debugger
  function hideForm() {
    const form = document.querySelector("form");
    form.style.display = "none";
  }
  
  // affiche le message de validation dans la modale
  function displayValidation() {
    const validation = document.querySelector(".validation");
    validation.style.display = "flex";
  }
  
  // check si l'input prénom est valide et renvoi si message erreur ou non
  function isFirstnameValid() {
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
  function isLastnameValid() {
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
  function isEmailValid() {
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
  function isMessageValid() {
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
  
  // donne accès au bouton si les inputs sont valides
  function disabledSubmit() {
    const btn = document.querySelector(".contact_button");
    checkInputs ? btn.removeAttribute("disabled") : btn.setAttribute("disabled", true)
  }
  
  // soumet le formulaire si les inputs sont valides
  function validateForm(elt) {
    const form = document.querySelector("form");
    elt.preventDefault();
    if (checkInputs()) {
      hideForm();
      displayValidation();
      form.reset();
    }
  }
  
  function getLightboxCardDOM() { 
    const slideContent = document.createElement( 'div' );
    slideContent.classList.add("slide");
    
    if (image !== undefined && image !== null) {
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      img.classList.add("slideImg");
      img.setAttribute("alt", "");
      img.setAttribute("title", title);
      slideContent.appendChild(img);
    } else if (video !== undefined && video !== null) {
      const mp4 = document.createElement( 'video' );
      mp4.setAttribute("title", title);
      mp4.setAttribute("controls", "true");
      mp4.classList.add("slideVideo");
      const src = document.createElement( 'source' );
      src.setAttribute("src", movie);
      src.setAttribute("type", "video/mp4");
      mp4.appendChild(src);
      slideContent.appendChild(mp4);
    }
    
    const titleImg = document.createElement( 'p' );
    titleImg.textContent = title;
    slideContent.appendChild(titleImg);
    
    return (slideContent)
  }
  
  return { getFormCardDOM, getLightboxCardDOM }
}

