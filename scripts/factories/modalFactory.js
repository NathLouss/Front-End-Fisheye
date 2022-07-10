function modalFactory(dataMedias) {
  const { photographerName, title, image, video, likes } = dataMedias;
  const picture = `assets/photographers/${photographerName}/${image}`;

  function getFormCardDOM() {

  }

  function getSlideshowCardDOM() {
    const slideshowContainer = document.createElement( 'div' );
    slideshowContainer.classList.add('slideshow_container');

    const previousArrow = document.createElement('a');
    previousArrow.classList.add("prev");
    previousArrow.setAttribute("onclick", "EplusSlides(-1)");
    previousArrow.innerHTML = "<";
    slideshowContainer.appendChild(previousArrow);
    
    const slideContent = document.createElement( 'div' );
    slideContent.classList.add("slide");
    slideshowContainer.appendChild(slideContent);
    
    if (image !== undefined && image !== null) {
      const img = document.createElement( 'img' );
      img.setAttribute("src", picture);
      img.classList.add("slideImg");
      img.setAttribute("alt", "");
      img.setAttribute("title", title);
      slideContent.appendChild(img);
    } else if (video !== undefined && video !== null) {
      const mp4 = document.createElement( 'video' );
      mp4.setAttribute("title", title);
      mp4.classList.add("slideVideo");
      const src = document.createElement( 'source' );
      src.setAttribute("src", `assets/photographers/${photographerName}/${video}`);
      src.setAttribute("type", "video/mp4");
      mp4.appendChild(src);
      slideContent.appendChild(mp4);
    }
    
    const titleImg = document.createElement( 'p' );    
    titleImg.textContent = title;
    slideContent.appendChild(titleImg);

    const nextArrow = document.createElement('a');
    nextArrow.classList.add("next");
    nextArrow.setAttribute("onclick", "EplusSlides(1)");
    nextArrow.innerHTML = ">";
    slideshowContainer.appendChild(nextArrow);
    
    return (slideshowContainer)
  }

  return { getFormCardDOM, getSlideshowCardDOM }
}