// fonction async avec expression await interrompt execution fonction, attend résolution promesse
// méthode fetch pour parser la réponse en tant que JSON et les stocker dans un variable  
async function getPhotographers() {
    const photographersData = "../../data/photographers.json";

    // fetch(photographersData)
    //     .then(response => response.json())
    //     .then((data) => {
        //     const photographers = data;
        // }); 

    const response = await fetch(photographersData);
    const data = await response.json();
    const photographers = data;
    
    return photographers                
}


async function displayData(photographers) {
    // récupération de la section html photographe 
    const photographersSection = document.querySelector(".photographer_section");
    
    // itération sur chaque photographe
    // pour récupérer les datas avec fonction photographerFactory et les formater
    // pour les passer en arguments à la méthode getUserCardDOM
    // pour les afficher dans la section html photographe
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Attend résolution de la promesse/fonction getPhotographers, pour récupérer les datas Photographers et les passer en argument de la fonction displayData
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
