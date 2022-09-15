import { getPhotographers } from "../database/services.js"
import { photographerFactory } from "../factories/photographerFactory.js"

// affichage des datas des hotographes
// via la photographerFactory
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};
// itération sur chaque photographe
// pour récupérer les datas avec fonction photographerFactory et les formater
// pour les passer en arguments à la méthode getUserCardDOM
// pour les afficher dans la section html photographe

async function init() {
    const {photographers} = await getPhotographers();
    displayData(photographers);
};
// Attend résolution de la promesse/fonction getPhotographers, 
// pour récupérer les datas Photographers et les passer en argument de la fonction displayData

init();
