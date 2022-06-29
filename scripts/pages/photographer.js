// Récupération de l'id du photographe
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPhotographer = urlParams.get('id');

//Récupération des datas
async function getPhotographers() {
  const photographersData = "../../data/photographers.json";
  const response = await fetch(photographersData);
  const data = await response.json();
  const photographers = data;

  return photographers
}

// Affichage des datas du photographe sélectionné
async function displayData(photographers) {
  const photographerSection = document.querySelector(".photograph-header");

  const photographer = photographers.filter(photographer => photographer.id == `${idPhotographer}`)[0];
  const photographerModel = photographerFactory(photographer);
  const userProfileDOM = photographerModel.getUserProfileDOM();
  photographerSection.appendChild(userProfileDOM);
};

async function init() {
  const {photographers} = await getPhotographers();
  displayData(photographers);
};

init();



// async function getPhotographers() {
//   const photographersData = "../../data/photographers.json";
//   const response = await fetch(photographersData);
//   const data = await response.json();
//   const photographers = data;

//   return photographers
// }

// // Récupération des datas d'un photographe via son Id
// async function getPhotographerById() {
//   const {photographers} = await getPhotographers();
//   const photographer = photographers.filter(e => e.id == `${idPhotographer}`);
// console.log(photographer);
//   return photographer
// }

// async function displayProfile(photographer) {
//   const photographerSection = document.querySelector(".photograph_header");
//   console.log(photographerSection);
//   const photographerProfile = photographerFactory(photographer);
//   const userProfileDOM = photographerProfile.getUserProfileDOM();
//   photographerSection.appendChild(userProfileDOM);
// };

// async function init() {
//   const {photographer} = await getPhotographerById();
//   displayProfile(photographer);
// };

// init();
