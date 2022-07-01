function mediaFactory(dataMedias) {
  const { photographerName, title, image, likes } = dataMedias;
  const picture = `assets/photographers/${photographerName}/${image}`;

  function getMediaCardDOM() {
    const articlePortfolio = document.createElement( 'article' );

    // if (image !== "undefined" && image !== null) {
      articlePortfolio.classList.add("image");

      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      img.setAttribute("alt", "");
      articlePortfolio.appendChild(img);

      const divPortfolioText = document.createElement( 'div' );    
      divPortfolioText.classList.add("article_text");
      articlePortfolio.appendChild(divPortfolioText);

      const title = document.createElement( 'p' );    
      title.textContent = title;
      divPortfolioText.appendChild(title);

      const divLike = document.createElement( 'div' );    
      divLike.classList.add("article_like");
      divPortfolioText.appendChild(divLike);

      const likeNumber = document.createElement( 'p' );    
      likeNumber.textContent = likes;
      divLike.appendChild(likeNumber);

      // const likeHeart = document.createElement( 'i' );  
      // likeHeart.classList.add("fas fa-heart");  
      // divLike.appendChild(likeHeart);

      return (articlePortfolio)

    // } else {
    //   articlePortfolio.classList.add("video");
    // }

  }

  return { title, image, likes, getMediaCardDOM }
}

// photographerId, title, image, vidéo, likes, date, price