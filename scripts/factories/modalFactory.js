function modalFactory(dataMedias) {
  const { photographerName, title, image, video } = dataMedias;
  const picture = `assets/photographers/${photographerName}/${image}`;

  function getFormCardDOM() { 
    const contactContainer = document.createElement( 'div' );
    contactContainer.classList.add("contact_container");

    getHeaderFormCardDOM();

    const form = document.createElement( 'form' );
    contactContainer.appendChild(form);

    getFirstnameDivCardDOM();
    getLastnameDivCardDOM();
    getEmailDivCardDOM();
    getMessageDivCardDOM();
    getValidationDivCardDOM();
 
    return (contactContainer)
  }

  function getHeaderFormCardDOM() {
    const header = document.createElement( 'header' );
    header.classList.add("header");
    contactContainer.appendChild(header);

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
      closeContactModal()
    })
    header.appendChild(icon);

    return (header)
  }

  function getFirstnameDivCardDOM() { 
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
    firstnameDiv.appendChild(firstnameInput);

    return (firstnameDiv)
  }

  function getLastnameDivCardDOM() { 
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
    lastnameDiv.appendChild(lastnameInput);

    return (lastnameDiv)
  }

  function getEmailDivCardDOM() { 
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
    emailDiv.appendChild(emailInput);

    return (emailDiv)
  }
  
  function getMessageDivCardDOM() { 
    const messageDiv = document.createElement( 'div' );
    messageDiv.classList.add("formData");
    messageDiv.setAttribute("data-error", "Veuillez saisir votre message.");
    form.appendChild(messageDiv);
    
    const emailLabel = document.createElement( 'label' );
    emailLabel.setAttribute("for", "message");
    emailLabel.textContent = "Email";
    messageDiv.appendChild(emailLabel);
    
    const emailInput = document.createElement( 'input' );
    emailInput.classList.add("text-control");
    emailInput.setAttribute("type", "text");
    emailInput.setAttribute("id", "message");
    emailInput.setAttribute("name", "message");
    messageDiv.appendChild(emailInput);
    
    return (messageDiv)
  }

  function getValidationDivCardDOM() {
    const validationDiv = document.createElement( 'div' );
    validationDiv.classList.add("validation");
    contactContainer.appendChild(validationDiv);

    const validationText = document.createElement( 'p' );
    validationText.textContent = "Votre message a bien été envoyé !";
    validationDiv.appendChild(validationText);

    return (validationDiv)
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
      mp4.classList.add("slideVideo");
      const src = document.createElement( 'source' );
      src.setAttribute("src", `assets/photographers/${photographerName}/${video}`);
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