function mediaFactory(dataMedias) {
  const { photographerName, title, image, video, likes } = dataMedias;
  const picture = `assets/photographers/${photographerName}/${image}`;
  
  function getMediaCardDOM() {
    const articlePortfolio = document.createElement( 'article' );

    if (image !== undefined && image !== null) {
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      img.setAttribute("alt", "");
      articlePortfolio.appendChild(img);
    } else if (video !== undefined && video !== null) {
      const capture = `assets/photographers/${photographerName}/${video.replace('mp4','png')}`;
      const mp4 = document.createElement( 'video' );
      mp4.setAttribute("poster", capture);
      mp4.setAttribute("width", "100%");
      mp4.setAttribute("height", "300px");
      const src = document.createElement( 'source' );
      src.setAttribute("src", video);
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
    divLike.appendChild(icon);

    return (articlePortfolio)
  }

  return { title, image, video, likes, getMediaCardDOM }
}

// photographerId, date, price