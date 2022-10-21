// récupération éléments du DOM
const main = document.getElementById('main');
const body = document.querySelector('body');
const modalBg = document.querySelector('.contact_background');
const contactSection = document.querySelector('.contact_container');
const contactHeader = document.querySelector('.contact_header');
let btnClose;
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const message = document.getElementById('message');
const form = document.querySelector('form');

// lancement de la modale
export function launchContactModal(photographer) {
    modalBg.style.display = 'flex';
    insertFirstnameInForm(photographer);
    createBtnClose();
    modalAccessibility();
}

// insertion prénom du photographe dans le header modale
function insertFirstnameInForm(photographer) {
    const name = document.querySelector('#name');
    name.innerHTML = photographer['name'].split(' ')[0];
}

// création du bouton de fermeture de la modale
function createBtnClose() {
    btnClose = document.createElement('img');
    btnClose.setAttribute('src', 'assets/icons/close.svg');
    btnClose.setAttribute('aria-label', 'Fermer le formulaire');
    btnClose.setAttribute('alt', 'Croix pour fermer le formulaire');
    btnClose.classList.add('contact_close');
    btnClose.addEventListener('click', event => {
        closeContactModal(event)
    });
    contactHeader.appendChild(btnClose);
}

// affichage et accessibilité de la modale
function modalAccessibility() {
    if (main.ariaHidden == 'false') {
        main.removeAttribute('aria-hidden');
        main.setAttribute('aria-hidden', 'true');
        contactSection.removeAttribute('aria-hidden');
        contactSection.setAttribute('aria-hidden', 'false');
        body.classList.add('no-scroll');
        firstname.focus();
    } else {
        main.removeAttribute('aria-hidden');
        main.setAttribute('aria-hidden', 'false');
        contactSection.removeAttribute('aria-hidden');
        contactSection.setAttribute('aria-hidden', 'true');
        body.classList.remove('no-scroll');
        firstname.blur();
    }
}

// Close modal when escape key is pressed
function onKey(e) {
    let keynum = e.key
    if (keynum == 'Escape') {
        closeContactModal()
    }
}

// fermeture de la modale
function closeContactModal() {
    modalBg.style.display = 'none';
    contactHeader.removeChild(btnClose);
    modalAccessibility();
}

// validation input prénom
function isFirstnameValid() {
    let firstnameValue = firstname.value.trim();
    if (firstnameValue != '') {
        const regex = /[A-Za-z0-9]{2,}/;
        if (regex.test(firstnameValue)) {
        return hideError(firstname.parentNode);
        } 
        
        return showError(firstname.parentNode)
    }
    
    return showError(firstname.parentNode)
}

// validation input nom
function isLastnameValid() {
    let lastnameValue = lastname.value.trim();
    if (lastnameValue != '') {
        const regex = /[A-Za-z0-9]{2,}/;
        if (regex.test(lastnameValue)) {
        return hideError(lastname.parentNode);
        } 
        
        return showError(lastname.parentNode)
    }
    
    return showError(lastname.parentNode)
}

// validation input email
function isEmailValid() {
    let emailValue = email.value.trim();
    if (emailValue != '') {
        const regex = /[A-Za-z0-9]{1,}@[A-Za-z0-9]{2,}.[A-Za-z0-9]{2,}/;
        if (regex.test(emailValue)) {
        return hideError(email.parentNode);
        } 
        
        return showError(email.parentNode)
    }
    
    return showError(email.parentNode)
}

// validation input message
function isMessageValid() {
    let messageValue = message.value.trim();
    if (messageValue != '') {
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
    elt.setAttribute('data-error-visible', true);
    
    return false
}

// enlève le message d'erreur
function hideError(elt) {
    elt.removeAttribute('data-error-visible');
    
    return true
}

// check si tous les inputs sont valides
function checkInputs() {
    let isInputsValid = isFirstnameValid() && isLastnameValid() && isEmailValid() && isMessageValid();
    if (isInputsValid) {
        return true
    }
    
    return false
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

// enlève le formulaire de la modale
function hideForm() {
    const form = document.querySelector('form');
    form.style.display = 'none';
}

// affiche le message de validation dans la modale
function displayValidation() {
    const validation = document.querySelector('.contact_validation');
    validation.style.display = 'flex';
}

//eventlisteners
contactSection.addEventListener('keydown', (e) => onKey(e));
firstname.addEventListener('blur', isFirstnameValid);
lastname.addEventListener('blur', isLastnameValid);
email.addEventListener('blur', isEmailValid);
message.addEventListener('blur', isMessageValid);
form.addEventListener('submit', validateForm);