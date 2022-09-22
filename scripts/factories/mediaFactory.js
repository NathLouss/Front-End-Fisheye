export function mediaFactory(dataMedias) {
  const { photographerName, currentPosition, title, image, video, likes, date } = dataMedias;
  const picture = `assets/photographers/${photographerName}/${image}`;
  
  function getMediaCardDOM() {
    const articlePortfolio = document.createElement( 'article' );
    
    if (image !== undefined && image !== null) {
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      img.addEventListener("click", () => {
        // openLightboxModal(currentPosition)
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".lightbox").style.display = "block";
        document.querySelector(".contact_container").style.display = "none";
        currentSlide(currentPosition);
      })
      img.setAttribute("aria-label", `${title}, closeup view`);
      img.setAttribute("title", title);
      articlePortfolio.appendChild(img);
    } else if (video !== undefined && video !== null) {
      const capture = `assets/photographers/${photographerName}/${video.replace('mp4','png')}`;
      const mp4 = document.createElement( 'video' );
      mp4.classList.add("video_poster");
      mp4.setAttribute("poster", capture);
      mp4.setAttribute("title", title);
      mp4.setAttribute("aria-label", `${title}, closeup view`);
      mp4.addEventListener("click", () => {
        openLightboxModal(currentPosition)
      })
      const src = document.createElement( 'source' );
      src.setAttribute("src", `assets/photographers/${photographerName}/${video}`);
      src.setAttribute("type", "video/mp4");
      mp4.appendChild(src);
      articlePortfolio.appendChild(mp4);
    }

    const divPortfolioText = document.createElement( 'div' );    
    divPortfolioText.classList.add("article_text");
    articlePortfolio.appendChild(divPortfolioText);

    const titleImg = document.createElement( 'p' );    
    titleImg.textContent = title;
    divPortfolioText.appendChild(titleImg);

    const divLike = document.createElement( 'div' );    
    divLike.classList.add("article_like");
    divPortfolioText.appendChild(divLike);

    const likeNumber = document.createElement( 'p' );    
    likeNumber.classList.add("likes");
    likeNumber.textContent = likes;
    divLike.appendChild(likeNumber);
    const icon = document.createElement( 'i' );
    icon.setAttribute("class", "fas fa-heart");
    icon.setAttribute("aria-label", "likes");
    icon.addEventListener("click", (e) => {
      e.target.parentNode.firstChild.textContent++;
      document.querySelector(".totalLikes").textContent++;
    })
    divLike.appendChild(icon);

    return (articlePortfolio)
  }

  return { title, image, video, likes, date, getMediaCardDOM }
}

