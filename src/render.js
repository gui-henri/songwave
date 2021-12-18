//INITIALIZE AND UPDATE PLAYLIST
function updatePlaylist() {
    window.api.getMusics().then(musicList => {

        console.log(musicList);

        //grab the container
        let playlistContainer = document.getElementById('playlist-container');

        //selects all that have '#music-in-playlist' as id
        let musicInPlaylist = playlistContainer.querySelectorAll('#music-in-playlist');

        //then removes it
        musicInPlaylist.forEach(music => {
            music.remove();
        });

        //for each music in the playlist
        musicList.forEach(music => {

            //will be created a div called 'music-in-playlist'
            let musicInPlaylistDiv = document.createElement('div');
            musicInPlaylistDiv.id = 'music-in-playlist';

            //then it will be added to the DOM
            playlistContainer.appendChild(musicInPlaylistDiv);

            //then it will be populated with the following html:
            musicInPlaylistDiv.innerHTML = `
                <h4>${music}</h4>
                <img src="assets/play.svg" alt="play music">
            `;
        })
    });
}

updatePlaylist();
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
            searchResultDiv.addEventListener('click', () => {
                download(element.id, element.title)
            })
            container.appendChild(searchResultDiv);
            searchResultDiv.innerHTML = `
                <img src="${element.metadata.thumbnails[0].url}" alt="video-thumb">
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

    const treatedTitle = videoTitle.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    console.log(treatedTitle);

    const downloadArgs = {
        videoId,
        treatedTitle
    }
    window.api.download(downloadArgs).then(response => updatePlaylist());
}
