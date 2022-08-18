// récupération des datas medias
async function getMedias() {
  const mediasData = "../../data/photographers.json";
  const response = await fetch(mediasData);
  const dataMedias = await response.json();
  const medias = dataMedias;

  return medias
}

async function displayMediasInLightbox(medias) {
  const mediasSection = document.querySelector(".lightbox_container");
  const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);

  selectedMedias.forEach((media) => {
    media.photographerName = photographerName;
    media.currentPosition = currentPosition;
    const mediaModel = modalFactory(media);
    const mediaCardDOM = mediaModel.getLightboxCardDOM();
    mediasSection.appendChild(mediaCardDOM);
  });
};

async function init() {
  const {medias} = await getMedias();
  displayMediasInLightbox(medias);
};

init();

// récupération des éléments html
const lightboxModal = document.querySelector(".lightbox");

function openLightboxModal(currentPosition) {
  modal.style.display = "block";
  lightboxModal.style.display = "block";
  contactModal.style.display = "none";
  currentSlide(currentPosition);
}

function closeLightboxModal() {
  modal.style.display = "none";
}

// Lightbox
// if (lightboxModal.style.display == "block") {
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
  function currentSlide(n) {
    // console.log("currentposition ds currentslide", n);
    // showSlides(n);
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
// }


// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }
  
//   function showSlides(n) {
//     var i;
//     var slides = document.getElementsByClassName("slide");
//     console.log("tableau", slides);
//     console.log("currentposition ds show", n);
//     // slides[n-1].style.display = "flex";
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slides[n-1].style.display = "flex";
// }