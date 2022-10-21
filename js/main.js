
const bodyEl = document.body;
const coinContainerEl = document.getElementById("coin-container");
const coinInfoEl = document.getElementById("coin-info");
const timeEl = document.getElementById("time");
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
        <div>
            <img src=${data.image.thumb} id="coin-thumb">
            <p id="coin-name">Bitcoin</p>
        </div>
        <div id="coin-info">
            <div>
                <p>Current price</p>
                <p>24-hour high price </p>
                <p>24-hour low price </p>
            </div>
            <div>
                <p>USD $${data.market_data.current_price.usd}</p>
                <p>USD $${data.market_data.high_24h.usd}</p>
                <p>USD $${data.market_data.low_24h.usd}</p>
            </div>
        </div>
        
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


function updateTime() {
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const meridiem = hour < 12 ? "AM" : "PM";
    timeEl.innerHTML = `
        <h1>${hour}:${minute} ${meridiem}</h1>
    `;
}

updateTime();

