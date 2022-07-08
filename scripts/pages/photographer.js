// Récupération de l'id du photographe
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idPhotographer = urlParams.get('id');
  let photographerName;

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
  const photographerSection = document.querySelector(".photographer_header");
  const photographer = photographers.filter(photographer => photographer.id == `${idPhotographer}`)[0];
  photographerName = photographer.name.split(' ')[0];

  const photographerModel = photographerFactory(photographer);
  const userProfileDOM = photographerModel.getUserProfileDOM();
  photographerSection.appendChild(userProfileDOM);
};

async function init() {
  const {photographers} = await getPhotographers();
  displayData(photographers);
};

init();
