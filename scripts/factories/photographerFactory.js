export function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/IDPhotos/${portrait}`;
    const place = `${city}, ${country}`;
    const sentence = `${tagline}`;
    const cost = `${price}€ / jour`;

    // création des éléments HTML de la carte(article) photographe
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("aria-label", `${name}`);
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
        const articleHeader = document.createElement( 'article' );
        articleHeader.classList.add("profile");

        const divHeader = document.createElement( 'div' );    
        divHeader.classList.add("header_text");
        articleHeader.appendChild(divHeader);

        const h2 = document.createElement( 'h2' );    
        h2.textContent = name;
        divHeader.appendChild(h2);

        const position = document.createElement( 'p' );
        position.textContent = place;
        position.classList.add("position");
        divHeader.appendChild(position);
        
        const description = document.createElement( 'p' );
        description.classList.add("description");
        description.textContent = sentence;
        divHeader.appendChild(description);

        const button = document.createElement( 'button' );
        button.classList.add("contact_button");
        button.setAttribute("aria-label", "Contactez-moi");
        button.addEventListener("click", () => {
          displayContactModal()
        })
        button.textContent = "Contactez-moi";
        articleHeader.appendChild(button);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${name}`);
        articleHeader.appendChild(img);

        const thumbnail = document.querySelector(".photographer_thumbnail");
        const thumbnailRate = document.createElement( 'p' );
        thumbnailRate.classList.add("thumbnail_rate");
        thumbnailRate.textContent = cost;
        thumbnail.appendChild(thumbnailRate);
        
        return (articleHeader);
    }
    
    return { name, id, picture, place, sentence, cost, getUserCardDOM, getUserProfileDOM }
}
