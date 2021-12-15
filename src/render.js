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


//SEARCH YOTUBE VIDEO FUNCTIONALITY
let searchButton = document.getElementById('search-button');

searchButton.onclick = () => {
    const query = document.getElementById('text-area').value;
    window.api.search(query).then(result => {

        console.log(result);

        result.forEach(element => {
            let searchResultDiv = document.createElement('div');
            searchResultDiv.id = 'search-item';
            document.getElementById('search-result-container').appendChild(searchResultDiv);
            searchResultDiv.innerHTML = `
                <img src=${element.metadata.thumbnails[0].url} alt="video-thumb">
                <div id="video-info">
                    <h4>${element.title}</h4>
                    <p>${element.metadata.view_count}</p>
                    <p>From: ${element.author}</p>
                </div>
            `;
        });
    });
};
