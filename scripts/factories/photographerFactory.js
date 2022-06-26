//fonction usine
function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/IDPhotos/${portrait}`;
    const place = `${city}, ${country}`;
    const sentence = `${tagline}`;
    const cost = `${price}€/jour`;

    // création des éléments HTML de la carte(article) photographe
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("aria-label", `Portrait de ${name} - Page de ces réalisations`);
        article.appendChild(link);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        link.appendChild(img);

        const h2 = document.createElement( 'h2' );    
        h2.textContent = name;
        link.appendChild(h2);

        const position = document.createElement( 'p' );
        position.textContent = place;
        position.classList.add("position");
        article.appendChild(position);
        
        const description = document.createElement( 'p' );
        description.classList.add("description");
        description.textContent = sentence;
        article.appendChild(description);
        
        const rate = document.createElement( 'p' );
        rate.classList.add("rate");
        rate.textContent = cost;
        article.appendChild(rate);

        return (article);
    }

    // création des éléments HTML du profile(header) photographe
    function getUserProfileDOM() {

        // const article = document.createElement( 'article' );

        // const h2 = document.createElement( 'h2' );    
        // h2.textContent = name;
        // link.appendChild(h2);

        // const position = document.createElement( 'p' );
        // position.textContent = place;
        // position.classList.add("position");
        // article.appendChild(position);
        
        // const description = document.createElement( 'p' );
        // description.classList.add("description");
        // description.textContent = sentence;
        // article.appendChild(description);

        // return (article);
    }

    return { name, id, picture, place, sentence, cost, getUserCardDOM, getUserProfileDOM }
}
