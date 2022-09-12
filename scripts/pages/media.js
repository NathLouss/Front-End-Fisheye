// déclarartion des variables
let medias = [];
let selectedMedias = [];
let currentPosition = 0;
let likesArray = [];

// récupération des datas medias
async function getMedias() {
  const mediasData = "../../data/photographers.json";
  const response = await fetch(mediasData);
  const dataMedias = await response.json();
  medias = dataMedias;

  return medias
}

// affichage des médias
async function displayDataMedias(medias) {
  const mediasSection = document.querySelector(".photographer_portfolio");
  selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);
  
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
  const {medias} = await getMedias();
  displayDataMedias(medias);
  displayLikesCounter(medias);
};

init();
