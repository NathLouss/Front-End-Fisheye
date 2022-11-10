// récupération des éléments DOM
const totalLikes = document.querySelector(".totalLikes");

export function incrementLikes(e, media) {
  e.target.previousSibling.firstChild.textContent++;
  totalLikes.textContent++;
  media["likes"]++;
}
