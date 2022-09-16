// fonction async avec expression await interrompt execution fonction, attend résolution promesse
// méthode fetch pour parser la réponse en tant que JSON et les stocker dans un variable  
export async function getPhotographers() {
    const photographersData = "../../data/photographers.json";
    const response = await fetch(photographersData);
    const data = await response.json();
    const photographers = data;

    return photographers["photographers"]
}

// récupération des datas medias
export async function getMedias() {
    const mediasData = "../../data/photographers.json";
    const response = await fetch(mediasData);
    const dataMedias = await response.json();
    const medias = dataMedias;

    return medias["medias"]
  }

//   async function init() {
//     // Attend résolution de la promesse/fonction getPhotographers, 
//     // pour récupérer les datas Photographers et les passer en argument de la fonction displayData
//     const {photographers} = await getPhotographers();
//     const {medias} = await getMedias();
// };

// init();
