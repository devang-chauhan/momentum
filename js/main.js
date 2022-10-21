
const bodyEl = document.body;
const coinContainerEl = document.getElementById("coin-container");
const coinInfoEl = document.getElementById("coin-info");
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


function addCrypto(data) {
    coinContainerEl.innerHTML += `
        <img src=${data.image.thumb} id="coin-thumb">
        <p>USD $${data.market_data.current_price.usd}</p>
    `;
}

function handleCryptoError() {
    coinContainerEl.innerHTML = `
        <p>Could not fetch data</p>
    `;    
}


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => fetchBackground(data))
    .catch(err => {
        console.error(`Background image could not be fetched with that search query`);
        updateBackground(defaultBackground);
    });

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            handleCryptoError();
        }
        return res.json();
        
    })
    .then(data => addCrypto(data))
    .catch(err => console.error(err));