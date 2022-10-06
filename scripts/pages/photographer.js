import { getPhotographers, getMedias } from "../database/services.js"
import { photographerFactory } from "../factories/photographerFactory.js"
import { mediaFactory } from "../factories/mediaFactory.js"
import { launchContactModal } from "../utils/modal.js"

// déclaration des variables
let photographer;
let photographerName;
let selectedMedias = [];
let currentPosition = 0;
let likesArray = [];

// récupération de l'id du photographe
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotographer = urlParams.get('id');

// insertion des informations du photographe sélectionné via la photographerFactory
async function displayDataInHeader(photographers) {
    const headerSection = document.querySelector('.profile');

    photographer = photographers.find(p => p.id == idPhotographer);
    const photographerModel = photographerFactory(photographer);
    photographerName = photographerModel.getSelectedPhotographerName();

    photographerModel.insertDataInHeader();
    const imgDOM = photographerModel.insertPhotoInHeader();
    headerSection.appendChild(imgDOM);
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
  displayDataInHeader(photographers);
  displayDataMedias(medias);
  displayLikesCounter();
};

init();

// lancement de la modale
const contactBtn = document.querySelector('.contact_button');
contactBtn.addEventListener('click', () => launchContactModal(photographer));
