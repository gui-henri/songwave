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


//SEARCH ON YOTUBE VIDEO FUNCTIONALITY
let searchButton = document.getElementById('search-button');

searchButton.onclick = () => {

    //gets the text from input
    const query = document.getElementById('text-area').value;

    //make's api call to search on youtube 
    window.api.search(query).then(result => {

        //cleaning up existing search-items
        let container = document.getElementById('search-result-container');
        let containerChilds = container.querySelectorAll('#search-item');

        containerChilds.forEach(element => {
            element.remove();
        });

        // populates the DOM with the new data and save the video id
        result.forEach(element => {
            let searchResultDiv = document.createElement('div');
            searchResultDiv.id = 'search-item';
            container.appendChild(searchResultDiv);
            searchResultDiv.innerHTML = `
                <img src="${element.metadata.thumbnails[0].url}" alt="video-thumb" onclick="download('${element.id}', '${element.title}')">
                <div id="video-info">
                    <h4>${element.title}</h4>
                    <p>${element.metadata.view_count}</p>
                    <p>From: ${element.author}</p>
                </div>
            `;
        });
    });
};

//DOWNLOAD FROM YOUTUBE FUNCTIONALITY

function download(videoId, videoTitle) {
    const downloadArgs = {
        videoId,
        videoTitle
    }
    window.api.download(downloadArgs).then(response => updatePlaylist());
}

function updatePlaylist() {
    
}