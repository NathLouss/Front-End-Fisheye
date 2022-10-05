// créer et gère la modale
// ouverture fermeture
// parametre (élément form ou slider)
// contenu qui va la remplir objet html
// getelementByid(form)
// modal.appendchild(form)
// ------ ça c'est bien si dans html

// paramètre endroit ou elle doit se trouver
// methode build
// fabrique contour de la modale 
// bouton fermeture
// titre et va positionner
// un divId.content = ""
// return medthode build pour etre appelé
// build return l'element html de la modal que la factory vient de créer
// avec le bouton et son listener, le content et son id

// function modalFactory(data) {
//     const { photographerName } = data;

// const contactBtn = document.querySelector('.contact_button');
// contactBtn.addEventListener('click', () => launchContactModal(photographer));

const modal = document.querySelector('.contact_modal');
const contactSection = document.querySelector('.contact_container');
const contactHeader = document.querySelector('.contact_header');
let btnClose;

function createBtnClose () {
    btnClose = document.createElement('img');
    btnClose.setAttribute('src', `assets/icons/close.svg`);
    btnClose.classList.add('contact_close');
    btnClose.addEventListener('click', event => {
        closeContactModal(event)
    });
    contactHeader.appendChild(btnClose);
}

function insertFirstnameInForm (photographer) {
    const name = document.querySelector('#name');
    name.innerHTML = photographer['name'].split(' ')[0];
}

function launchContactModal(photographer) {
    modal.style.display = 'block';
    contactSection.style.display = 'block';
    insertFirstnameInForm (photographer);
    createBtnClose ();
}

function closeContactModal() {
    modal.style.display = 'none';
    contactSection.style.display = 'none';
}

    

//     return { launchContactModal, closeContactModal }
// }    

export { launchContactModal, closeContactModal }