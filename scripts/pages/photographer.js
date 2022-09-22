import { getPhotographers, getMedias } from "../database/services.js"
import { photographerFactory } from "../factories/photographerFactory.js"
import { mediaFactory } from "../factories/mediaFactory.js"

// déclaration des variables
let photographerName;
let photographerRate;
let selectedMedias = [];
let currentPosition = 0;
let likesArray = [];

// Récupération de l'id du photographe
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotographer = urlParams.get('id');

// affichage des datas du photographe sélectionné dans le header
// via la photographerFactory
async function displayData(photographers) {
  const photographerSection = document.querySelector(".photographer_header");
  const photographer = photographers.filter(p => p.id == idPhotographer)[0];
console.log("photographer", photographer);
  photographerName = photographer.name.split(' ')[0];
  photographerRate = photographer.price;

  const photographer = photographers.filter(photographer => photographer.id == idPhotographer);
  photographerName = photographer[0].name.split(' ')[0];
  photographerRate = photographer[0].price;
  
  const photographerModel = photographerFactory(photographer[0]);
  const userProfileDOM = photographerModel.getUserProfileDOM();
  photographerSection.appendChild(userProfileDOM);
};  

// affichage des médias dans le portfolio du photographe
// via la mediaFactory
async function displayDataMedias(medias) {
  const mediasSection = document.querySelector(".photographer_portfolio");
  selectedMedias = medias.filter(media => media.photographerId == idPhotographer);
  
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
  displayData(photographers);
  displayDataMedias(medias);
  displayLikesCounter(medias);
};

init();
