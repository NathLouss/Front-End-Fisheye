async function getPhotographers() {
    const photographersData = "../../data/photographers.json";

    const response = await fetch(photographersData);
    const data = await response.json();
    // await fetch(photographersData)
    //     .then(response => await response.json())
    //     .then((data) => {
            const photographers = data;
            console.log(photographers);
        // }); 
                
    return photographers
}


async function displayData(photographers) {
    // pick up photographer html section
    const photographersSection = document.querySelector(".photographer_section");
    
    // for each photographer we store in a variable the result of the factory function to which photographer is passed as an argument.
    // we apply the getUserCardDOM method to it and store the result in a variable. 
    // inserting the photographer card in the html photographer section
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
