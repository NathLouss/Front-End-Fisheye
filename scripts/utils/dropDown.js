// récupération des éléments DOM
const filterBtn = document.querySelector("#filter");
const filterList = document.querySelector("#filter_list");
const filterListOption = document.querySelectorAll(".list_option");
const popularity = document.getElementById("popularity");
const date = document.getElementById("date");
const title = document.getElementById("title");
const portfolio = document.querySelector(".photographer_portfolio");

// récupération des datas medias
async function getMedias() {
    const mediasData = "../../data/photographers.json";
    const response = await fetch(mediasData);
    const dataMedias = await response.json();
    const medias = dataMedias;
  
    return medias
}


async function selectMedias(medias) {
    const selectedMedias = medias.filter(media => media.photographerId == `${idPhotographer}`);
    console.log(selectedMedias);
    return selectedMedias;
};

async function init() {
    const {medias} = await getMedias();
    selectMedias(medias);
};

init();

const sortBy = property => {
    selectedMedias.sort((a,b) => (a[property] < b[property]) ? -1 : ((b[property] > a[property]) ? 1 : 0));
    return selectedMedias;
}

function displayMediasSorted(selectedMedias) {
    portfolio.innerHTML = "";
    
    selectedMedias.forEach((media) => {
        currentPosition += 1;
        media.currentPosition = currentPosition;
        media.photographerName = photographerName;
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });
};

title.addEventListener("click", e => {
    const property = e.target.dataset.property;
    sortBy(property);
    displayMediasSorted(selectedMedias);
})

date.addEventListener("click", e => {
    const property = e.target.dataset.property;
    sortBy(property);
    displayMediasSorted(selectedMedias);
})

popularity.addEventListener("click", e => {
    const property = e.target.dataset.property;
    sortBy(property);
    displayMediasSorted(selectedMedias);
})



//**Eventlisteners**

//ouverture dropdown
filterBtn.addEventListener("click", () => {
    filterBtn.style.display = "none";
    filterList.style.display = "block";
    filterListOption.forEach((option) => { option.style.display = "block" });
});

//fermeture dropdown
filterList.addEventListener("click", () => {
    filterBtn.style.display = "block";
    filterList.style.display = "none";
    filterListOption.forEach((option) => { option.style.display = "none" });
});

// function toggleDropDown() {
//     if (filterBtn.state) {
//     filterBtn.state = true
//     filterBtn.style.display = "none";
//     filterList.style.display = "block";
//     filterListOption.forEach((option) => { option.style.display = "block";
//     } else {
//     filterBtn.style.display = "block";
//     filterList.style.display = "none";
//     filterListOption.forEach((option) => { option.style.display = "none";
//     })}
// };