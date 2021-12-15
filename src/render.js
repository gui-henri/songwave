// MAIN WINDOW BUTTONS
// Minimize
let minimizeButton = document.getElementById('minimize');

minimizeButton.onclick = () => {
    window.api.minimize();
}

// Close

let closeButton = document.getElementById('close');

closeButton.onclick = () => {
    window.api.close();
}

let searchButton = document.getElementById('search-button');

searchButton.onclick = () => {
    const query = document.getElementById('text-area').value;
    console.log(query);
};
