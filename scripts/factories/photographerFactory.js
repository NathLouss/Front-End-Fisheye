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
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );        
        const position = document.createElement( 'p' );
        const description = document.createElement( 'p' );
        const rate = document.createElement( 'p' );

        h2.textContent = name;
        position.textContent = place;
        description.textContent = sentence;
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
