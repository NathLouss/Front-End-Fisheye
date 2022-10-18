// récupération des éléments DOM
const totalLikes = document.querySelector('.totalLikes');

export function incrementLikes(e, media) {
  e.target.parentNode.firstChild.textContent++;
  totalLikes.textContent++; 
  debugger
  media['likes']++
}