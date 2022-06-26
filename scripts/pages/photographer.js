// Récupération de l'id du photographe
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotographer = urlParams.get('id');

async function getPhotographers() {
  const photographersData = "../../data/photographers.json";
  const response = await fetch(photographersData);
  const data = await response.json();
  const photographers = data;

  return photographers
}

// Récupération des datas d'un photographe via son Id
async function getPhotographerById() {
  const {photographers} = await getPhotographers();
  const photographer = photographers.filter(e => e.id == `${idPhotographer}`);

  return photographer
}

async function displayData(photographer) {
  debugger
  const photographerSection = document.querySelector(".photograph_header");
  const photographerProfile = photographerFactory(photographer);
  const userProfileDOM = photographerProfile.getUserProfileDOM();
  photographerSection.appendChild(userProfileDOM);
};

async function init() {
  const {photographer} = await getPhotographerById();
  displayData(photographer);
};

init();
