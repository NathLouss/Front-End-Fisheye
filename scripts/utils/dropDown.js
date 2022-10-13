// // récupération des éléments DOM
// const filterBtn = document.querySelector("#filter");
// const filterList = document.querySelector("#filter_list");
// const filterListOption = document.querySelectorAll(".list_option");
// const popularity = document.getElementById("popularity");
// const date = document.getElementById("date");
// const title = document.getElementById("title");
// const portfolio = document.querySelector(".photographer_portfolio");

// //déclarations variables
// // let medias = [];
// // let selectedMedias = [];
// let sortedMedias = [];

// // récupération des datas medias
// async function getMedias() {
//     const mediasData = "../../data/photographers.json";
//     const response = await fetch(mediasData);
//     const dataMedias = await response.json();
//     medias = dataMedias;
  
//     return medias
// };

// // sélection des médias du photographe
// async function selectMedias(medias) {
//     selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);

//     return selectedMedias
// };

// // initialisation des fonctions asynchrones
// async function init() {
//     const {medias} = await getMedias();
//     selectMedias(medias);
// };

// init();

// // tri des médias selon la propriété sélectionnée
// function sortBy(property) {
//     sortedMedias = selectedMedias.sort((a,b) => (a[property] < b[property]) ? -1 : ((b[property] > a[property]) ? 1 : 0));

//     return sortedMedias
// };

// // ouverture/fermeture dropdown
// function toggleDropDown() {
//     if (filterBtn.style.display == "block") {
//     filterBtn.style.display = "none";
//     filterList.style.display = "block";
//     filterListOption.forEach((option) => { 
//         option.style.display = "block"
//     });
//     } else {
//     filterBtn.style.display = "block";
//     filterList.style.display = "none";
//     filterListOption.forEach((option) => { 
//         option.style.display = "none"
//     });
//     }
// };

// // affichage de la propriété selectionnée dans le bouton de tri
// function displaySelected(choice) {
//     filterBtn.innerHTML = "";
//     filterBtn.innerHTML = choice;
// }

// // affichage des médias triés
// function displayMediasSorted(sortedMedias) {
//     const mediasSection = document.querySelector(".photographer_portfolio");
//     portfolio.innerHTML = "";
    
//     sortedMedias.forEach((media) => {
//         currentPosition += 1;
//         media.currentPosition = currentPosition;
//         media.photographerName = photographerName;
//         const mediaModel = mediaFactory(media);
//         const mediaCardDOM = mediaModel.getMediaCardDOM();
//         mediasSection.appendChild(mediaCardDOM);
//     });
// };

// // callback eventlistner de la dropdown
// function sortOnClick(e) {
//     const property = e.target.dataset.property;
//     const choice = e.currentTarget.innerText;
//     sortBy(property);
//     displaySelected(choice);
//     displayMediasSorted(sortedMedias);
// }

// // Eventlisteners
// title.addEventListener("click", e => {
//     sortOnClick(e);
// })

// date.addEventListener("click", e => {
//     sortOnClick(e);
// })

// popularity.addEventListener("click", e => {
//     sortOnClick(e);
// })

// filterBtn.addEventListener("click", () => {
//     toggleDropDown();
// });

// filterList.addEventListener("click", () => {
//     toggleDropDown();
// });
