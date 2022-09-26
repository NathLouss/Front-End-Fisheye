import { getPhotographers, getMedias } from "../database/services.js"
import { photographerFactory } from "../factories/photographerFactory.js"
import { mediaFactory } from "../factories/mediaFactory.js"

// déclaration des variables
let photographerName;
let photographer;
let photographerRate;
let selectedMedias = [];
let currentPosition = 0;
let likesArray = [];

// Récupération de l'id du photographe
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotographer = urlParams.get('id');

// affichage du header avec les datas du photographe sélectionné
// via la photographerFactory
async function displayHeader(photographers) {
  const photographerSection = document.querySelector(".photographer_header");
  
  // photographerRate = photographer.price;
  // photographer.photographerName = photographerName;
  
  const photographerModel = photographerFactory(photographers);
  const userProfileDOM = photographerModel.getUserProfileDOM();
  const selectedP = photographerModel.getSelectedPhotographerData();
  console.log(selectedP);
  photographerSection.appendChild(userProfileDOM);
};  

// Récupération des médias du photographer sélectionné
async function getSelectedPhotographerMedias(medias) {
  selectedMedias = medias.filter(m => m.photographerId == idPhotographer);
  
  return selectedMedias
}

// affichage des médias dans le portfolio du photographe
// via la mediaFactory
async function displayDataMedias(selectedMedias) {
  const mediasSection = document.querySelector(".photographer_portfolio");
  
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
  displayHeader(photographers);
  // getSelectedPhotographerData(photographers);
  // getSelectedPhotographerName(photographer);
  
  const medias = await getMedias();
  getSelectedPhotographerMedias(medias)
  displayDataMedias(selectedMedias);
  displayLikesCounter();
};

init();

// Récupération de l'objet photographer
// async function getSelectedPhotographerData(photographers) {
//   photographer = photographers.filter(p => p.id == idPhotographer)[0];

//   return photographer
// }

// Récupération du nom du photographer
// async function getSelectedPhotographerName(photographer) {
//   photographerName = photographer.name.split(' ')[0];
  
//   return photographerName
// }