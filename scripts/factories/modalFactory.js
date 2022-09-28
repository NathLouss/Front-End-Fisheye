export function modalFactory(data) {
    const { photographerName, title, image, video } = data;
    const picture = `assets/photographers/${photographerName}/${image}`;
    const movie = `assets/photographers/${photographerName}/${video}`;
  
    {/* function getFormCardDOM() { 
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
      modal.style.display = "none";
      // closeContactModal()
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

  return (contactContent) */
  }

    function getFormCardDOM() { 
        const formCard = 
            `<div class="contact_content">
                <header class="header">
                    <div class="header_text">
                        <h2>Contactez-moi</h2>
                        <p>${photographerName}</p>
                        <img src="assets/icons/close.svg" onclick="closeContactModal()"/>
                        <form class="formContact" submit="!!!!!!!">
                            <div class="formData" data-error="Veuillez saisir votre prénom.">
                                <label for="firstname">Prénom</label>
                                <input id="firstname" class="text-control" type="text" name="firstname" blur="!!!!!!!"></input>
                            </div>
                            <div class="formData" data-error="Veuillez saisir votre nom.">
                                <label for="lastname">Nom</label>
                                <input id="lastname" class="text-control" type="text" name="lastname" blur="!!!!!!!"></input>
                            </div>
                            <div class="formData" data-error="Veuillez saisir un email valide.">
                                <label for="email">Email</label>
                                <input id="email" class="text-control" type="email" name="email" blur="!!!!!!!"></input>
                            </div>
                            <div class="formData" data-error="Veuillez saisir votre message.">
                                <label for="message">Message</label>
                                <input id="message" class="text-control" type="text" name="message" blur="!!!!!!!"></input>
                            </div>
                            <btn class="contact_button" type="submit">Envoyer</btn>
                        </form>
                    </div>
                </header>
                <div class="validation">Votre message a bien été envoyé !</div>
            </div>`
        ;

        return formCard;
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

    // affichage de la modale soit avec le formulaire de contact soit la lightbox
    // async function displayModal(elt) {
    //   // ouvre le formulaire de contact
    //   if (elt.target == contactBtn) {
    //     console.log("ok");
    //   }
    //   // // ouvre la lightbox
    //   // if (elt.target == ) {}
    // };

    return { getFormCardDOM, getLightboxCardDOM }
}
