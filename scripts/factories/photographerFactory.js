//pattern factory
function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/IDPhotos/${portrait}`;
    const place = `${city}, ${country}`;
    const sentence = `${tagline}`;
    const cost = `${price}€/jour`;

    // creation of html elements of the photographer card
    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );     
        h2.textContent = name;

        const position = document.createElement( 'p' );
        position.textContent = place;
        position.classList.add("position");
        
        const description = document.createElement( 'p' );
        description.classList.add("description");
        description.textContent = sentence;
        
        const rate = document.createElement( 'p' );
        rate.classList.add("rate");
        rate.textContent = cost;


        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(position);
        article.appendChild(description);
        article.appendChild(rate);

        return (article);
    }
    return { name, picture, place, sentence, cost, getUserCardDOM }
}
