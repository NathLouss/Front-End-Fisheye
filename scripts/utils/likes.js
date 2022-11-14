// récupération des éléments DOM
const totalLikes = document.querySelector(".totalLikes");

export function incrementLikes(e, media) {
  e.currentTarget.previousSibling.firstChild.textContent++;
  totalLikes.textContent++;
  media["likes"]++;
  console.log(e.currentTarget.previousSibling.firstChild.textContent);
}
