import { mediaFactory } from '../factories/mediaFactory.js'
import { openLightboxModal } from './lightbox.js';
import { incrementLikes } from '../utils/likes.js';

// récupération des éléments DOM
const filterBtn = document.querySelector('#filter');
const filterList = document.querySelector('#filter_list');
const filterListOption = document.querySelectorAll('.list_option');
const portfolio = document.querySelector('.photographer_portfolio');
let sortedMedias = [];
let currentPosition = 0;

// ouverture/fermeture de la dropdown de tri
export function toggleDropDown() {
    if (filterBtn.style.display == 'block') {
        filterBtn.style.display = 'none';
        filterList.style.display = 'block';
        filterListOption.forEach((option) => { 
            option.style.display = 'block'
        });
    } else {
        filterBtn.style.display = 'block';
        filterList.style.display = 'none';
        filterListOption.forEach((option) => { 
            option.style.display = 'none'
        });
    }
}

// lancement du tri des médias
export function sortOnClick(e, selectedMedias) {
    const property = e.target.dataset.property;
    const choice = e.currentTarget.innerText;
    sortBy(property, selectedMedias);
    displaySelected(choice);
    displayMediasSorted(sortedMedias);
}

// tri des médias selon la propriété sélectionnée
function sortBy(property, selectedMedias) {
    sortedMedias = selectedMedias.sort((a,b) => (a[property] < b[property]) ? -1 : ((b[property] > a[property]) ? 1 : 0));

    return sortedMedias
}

// affichage de la propriété selectionnée dans le bouton de tri
function displaySelected(choice) {
    filterBtn.innerHTML = '';
    filterBtn.innerHTML = choice;
}

// affichage des médias triés et passage en argument pour l'affichage dans la lightbox
function displayMediasSorted(sortedMedias) {
    const mediasSection = document.querySelector('.photographer_portfolio');
    portfolio.innerHTML = '';
    
    sortedMedias.forEach((media) => {
        currentPosition += 1;
        media.currentPosition = currentPosition;
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
		mediasSection.appendChild(mediaCardDOM['articlePortfolio']);
        mediaCardDOM['anchor'].addEventListener('click', () => openLightboxModal(media.currentPosition, sortedMedias));
        mediaCardDOM['icon'].addEventListener('click', (e) => incrementLikes(e, media));
    });
}
