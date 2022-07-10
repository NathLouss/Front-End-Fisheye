// récupération des datas medias
async function getMedias() {
  const mediasData = "../../data/photographers.json";
  const response = await fetch(mediasData);
  const dataMedias = await response.json();
  const medias = dataMedias;

  return medias
}

async function displayDataMedias(medias) {
  const mediasSection = document.querySelector(".photographer_portfolio");
  const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);

  selectedMedias.forEach((media) => {
      media.photographerName = photographerName;
      const mediaModel = mediaFactory(media);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      mediasSection.appendChild(mediaCardDOM);
  });
};

async function init() {
  const {medias} = await getMedias();
  displayDataMedias(medias);
};

init();