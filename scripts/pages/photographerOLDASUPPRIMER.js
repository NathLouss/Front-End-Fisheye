import { getPhotographers, getMedias } from "../database/services.js"
import { photographerFactory } from "../factories/photographerFactory.js"
import { mediaFactory } from "../factories/mediaFactory.js"
import { modalFactory } from "../factories/modalFactory.js"
// import { validateForm } from "../utils/contactFormB.js"

// déclaration des variables
let photographer;
let photographerName;
let selectedMedias = [];
let currentPosition = 0;
let likesArray = [];
// let contactBtn;
// let closeForm;

// récupération de l'id du photographe
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotographer = urlParams.get('id');

// affichage du header avec les datas du photographe sélectionné via la photographerFactory
async function displayHeader(photographers) {
    const photographerSection = document.querySelector(".photographer_header");
    photographer = photographers.find(p => p.id == idPhotographer);

    const photographerModel = photographerFactory(photographer);
    const userProfileDOM = photographerModel.getUserProfileDOM();
    photographerName = photographerModel.getSelectedPhotographerName();
    photographerSection.appendChild(userProfileDOM[0]);
    contactBtn = userProfileDOM[1];
};  

// affichage des médias dans le portfolio du photographe via la mediaFactory
async function displayDataMedias(medias) {
    const mediasSection = document.querySelector(".photographer_portfolio");
    selectedMedias = medias.filter(m => m.photographerId == idPhotographer);
    
    selectedMedias.forEach((media) => {
        currentPosition += 1;
        media.currentPosition = currentPosition;
        media.photographerName = photographerName;
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });
};

// affichage des likes photo dans le compteur
async function displayLikesCounter() {
    selectedMedias.forEach((media) => {
        likesArray.push(media.likes);
    });
    
    const sumLikes = (previousValue, currentValue) => previousValue + currentValue;
    let totalLikes = likesArray.reduce(sumLikes);
    const counter = document.querySelector(".totalLikes");
    counter.insertAdjacentHTML("afterbegin", totalLikes);
};

// initialisation des fonctions asynchrones
async function init() {
  const photographers = await getPhotographers();
  const medias = await getMedias();
  displayHeader(photographers);
  displayDataMedias(medias);
  displayLikesCounter();
};

init();


// const contactBtn = document.querySelector('.contact_button');
// contactBtn.addEventListener('click', () => launchModal())


// window.addEventListener('DOMContentLoaded', () => {
//     debugger
//     const contactBtn = document.querySelector(".contact_button");
//     contactBtn.addEventListener("click", () => {
//         displayContactModal()
//     });
// })

// const modal = document.querySelector(".modal");
// const contactSection = document.querySelector(".contact_container");

// affichage de la modal via appel de la modalFactory et doit injecter le formulaire
// function launchContactModal() {
//     //   ligthbox.style.display = "none";

//     photographer.photographerName = photographerName;
//     const formModel = modalFactory(photographer);
//     const formCardDOM = formModel.getFormCardDOM();
//     contactSection.appendChild(formCardDOM[0]);
//     // closeForm = formCardDOM[1];
// };

// function closeContactModal(e) {
//     // closeForm = document.querySelector(".contact_close");
//     modal.style.display = "none";
//     contactSection.style.display = "none";
// };


// récupère form avec un queryselector
// appelle la fonction de contactform.js
// init form(form) ou validateform(form)
// const form = document.querySelector(".form_contact");
// validateForm(form);
// initForm(form);

// function displayContactModal() {
//     modal.style.display = "block";
//     contactSection.style.display = "block";
//     // photographer.photographerName = photographerName;
//     const formModel = modalFactory(photographer);
//     const formCardDOM = formModel.getFormCardDOM();
//     contactSection.appendChild(formCardDOM[0]);
// }

// // création des éléments HTML du profile(header) photographe
// function getUserProfileDOMold() {
//     const articleHeader = document.createElement( 'article' );
//     articleHeader.classList.add("profile");

//     const divHeader = document.createElement( 'div' );    
//     divHeader.classList.add("header_text");
//     articleHeader.appendChild(divHeader);

//     const h2 = document.createElement( 'h2' );    
//     h2.textContent = name;
//     divHeader.appendChild(h2);

//     const position = document.createElement( 'p' );
//     position.textContent = place;
//     position.classList.add("position");
//     divHeader.appendChild(position);

//     const description = document.createElement( 'p' );
//     description.classList.add("description");
//     description.textContent = sentence;
//     divHeader.appendChild(description);

//     const contactBtn = document.createElement( 'button' );
//     contactBtn.classList.add("contact_button");
//     contactBtn.setAttribute("aria-label", "Contactez-moi");
//     contactBtn.textContent = "Contactez-moi";
//     contactBtn.addEventListener("click", () => {
//         displayContactModal()
//         // modal.style.display = "block";
//         // contactSection.style.display = "block";
//     })
//     articleHeader.appendChild(contactBtn);

//     const img = document.createElement( 'img' );
//     img.setAttribute("src", picture);
//     img.setAttribute("alt", `${name}`);
//     articleHeader.appendChild(img);

//     const thumbnail = document.querySelector(".photographer_thumbnail");
//     const thumbnailRate = document.createElement( 'p' );
//     thumbnailRate.classList.add("thumbnail_rate");
//     thumbnailRate.textContent = cost;
//     thumbnail.appendChild(thumbnailRate);

//     return [articleHeader]
// }