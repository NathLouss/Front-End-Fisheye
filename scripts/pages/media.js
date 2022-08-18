// récupération des datas medias
async function getMedias() {
  const mediasData = "../../data/photographers.json";
  const response = await fetch(mediasData);
  const dataMedias = await response.json();
  const medias = dataMedias;

  return medias
}

let currentPosition = 0;

async function displayDataMedias(medias) {
  const mediasSection = document.querySelector(".photographer_portfolio");
  const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);
  
  selectedMedias.forEach((media) => {
    currentPosition += 1;
    media.currentPosition = currentPosition;
    media.photographerName = photographerName;
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediasSection.appendChild(mediaCardDOM);
  });
};

let likesArray = [];

async function displayLikesCounter(medias) {
  const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);
  
  selectedMedias.forEach((media) => {
    likesArray.push(media.likes);
  });

  const sumLikes = (previousValue, currentValue) => previousValue + currentValue;
  let totalLikes = likesArray.reduce(sumLikes);
  const counter = document.querySelector(".likes");
  counter.insertAdjacentHTML("afterbegin", totalLikes);
};

async function init() {
  const {medias} = await getMedias();
  displayDataMedias(medias);
  displayLikesCounter(medias);
};

init();


