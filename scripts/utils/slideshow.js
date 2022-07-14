// récupération des datas medias
async function getMedias() {
  const mediasData = "../../data/photographers.json";
  const response = await fetch(mediasData);
  const dataMedias = await response.json();
  const medias = dataMedias;

  return medias
}

async function displayMediasInSlideshow(medias) {
  const mediasSection = document.querySelector(".slideshow_container");
  const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);

  selectedMedias.forEach((media) => {
    media.photographerName = photographerName;
    media.currentPosition = currentPosition;
    const mediaModel = modalFactory(media);
    const mediaCardDOM = mediaModel.getSlideshowCardDOM();
    mediasSection.insertAdjacentElement('afterbegin', mediaCardDOM);
  });
};

async function init() {
  const {medias} = await getMedias();
  displayMediasInSlideshow(medias);
};

init();

// récupération des éléments html
const slideshowModal = document.querySelector(".slideshow_container");

function openSlideshowModal() {
  modal.style.display = "block";
  contactModal.style.display = "none";
  slideshowModal.style.display = "block";
}

function closeSlideshowModal() {
  modal.style.display = "none";
}

// slideshow 
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "flex";
}
