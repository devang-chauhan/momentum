
const bodyEl = document.body;
const authorEl = document.getElementById("author");
const defaultBackground = './images/gradient.jpg';

function updateBackground(url) {
    bodyEl.style = `
        width: 100vw;
        height: 100vh;
        background: url(${url});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    `;
}

function updateAuthor(name) {
    authorEl.textContent = `By ${name}`;
}


function fetchBackground(data) {
    const url = data.urls.regular;
    const name = data.user.name;
    updateBackground(url);
    updateAuthor(name); 
}

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => fetchBackground(data))
    .catch(err => {
        console.error(`Background image could not be fetched with that search query`);
        updateBackground(defaultBackground);
    });

fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
    .then(res => res.json())
    .then(data => {
        console.log(data.bitcoin.usd);
    });