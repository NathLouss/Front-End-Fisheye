export function mediaFactory(data) {
  const { photographerName, title, image, video, likes } = data;
  const picture = `assets/photographers/${photographerName}/${image}`;
  const movie = `assets/photographers/${photographerName}/${video}`;

  // renvoi l'élément HTML d'un media pour le portfolio
  function getMediaCardDOM() {
    const articlePortfolio = document.createElement("article");

    const anchor = document.createElement("a");
    anchor.setAttribute("href", "#");
    anchor.setAttribute("role", "button");
    anchor.classList.add("lightbox_link");
    articlePortfolio.appendChild(anchor);

    if (image !== undefined && image !== null) {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `${title}, vue rapprochée`);
      anchor.appendChild(img);
    } else if (video !== undefined && video !== null) {
      const capture = `assets/photographers/${photographerName}/${video.replace(
        "mp4",
        "png"
      )}`;
      const mp4 = document.createElement("video");
      mp4.classList.add("video_poster");
      mp4.setAttribute("poster", capture);
      mp4.setAttribute("aria-label", `${title}, vue rapprochée`);
      const src = document.createElement("source");
      src.setAttribute(
        "src",
        `assets/photographers/${photographerName}/${video}`
      );
      src.setAttribute("type", "video/mp4");
      mp4.appendChild(src);
      anchor.appendChild(mp4);
    }

    const divPortfolioText = document.createElement("div");
    divPortfolioText.classList.add("article_text");
    articlePortfolio.appendChild(divPortfolioText);

    const titleImg = document.createElement("p");
    titleImg.textContent = title;
    titleImg.setAttribute("aria-hidden", "true");
    divPortfolioText.appendChild(titleImg);

    const divLike = document.createElement("div");
    divLike.setAttribute("aria-label", "likes");
    divLike.classList.add("article_like");
    divPortfolioText.appendChild(divLike);

    const likeNumber = document.createElement("span");
    likeNumber.classList.add("likes");
    likeNumber.textContent = likes;
    divLike.appendChild(likeNumber);

    const icon = document.createElement("i");
    icon.classList.add("likes-icon", "fas", "fa-heart");
    icon.setAttribute("role", "button");
    icon.setAttribute("tabindex", "0");
    divLike.appendChild(icon);

    return { articlePortfolio, anchor, icon };
  }

  // renvoi l'élément HTML d'un media pour la lightbox
  function getLightboxCardDOM() {
    const slideContent = document.createElement("li");
    slideContent.classList.add("slide");
    slideContent.setAttribute("tabindex", "0");
    if (image !== undefined && image !== null) {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.classList.add("slideImg");
      img.setAttribute("alt", title);
      slideContent.appendChild(img);
    } else if (video !== undefined && video !== null) {
      const mp4 = document.createElement("video");
      mp4.setAttribute("title", title);
      mp4.setAttribute("controls", "true");
      mp4.classList.add("slideVideo");
      const src = document.createElement("source");
      src.setAttribute("src", movie);
      src.setAttribute("type", "video/mp4");
      mp4.appendChild(src);
      slideContent.appendChild(mp4);
    }
    const titleImg = document.createElement("p");
    titleImg.textContent = title;
    slideContent.appendChild(titleImg);

    return slideContent;
  }

  return { getMediaCardDOM, getLightboxCardDOM };
}
