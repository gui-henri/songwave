const fs = require('fs');
const path = require('path');
const InnerTube = require('youtubei.js')

const SEARCH_SIZE = 4;

async function search(query) {
    const youtube = await new InnerTube();

        const search = await youtube.search(query);
    
        const videos = search.videos;
    
        videos.length = SEARCH_SIZE;
        return videos;
}

module.exports = {
    search: async (query) =>  {
        const youtube = await new InnerTube();

        const search = await youtube.search(query);
    
        const videos = search.videos;
    
        videos.length = SEARCH_SIZE;
    
        return videos;
    },
    
    download: async (videoId, videoTitle) => {
        const youtube = await new InnerTube();

        const stream = youtube.download(videoId, {
            type: 'audio'
        });

        //treating the file path
        videoFileName = './' + videoTitle + '.mp4';
        videoPath = path.join('.cache', videoFileName);

        //verifying if the file exists
        if (!fs.existsSync(videoPath)) {
            //creating the file
            stream.pipe(fs.createWriteStream(videoPath));

            //log system
            stream.on('start', () => {
                console.info('[DOWNLOADER]', 'Starting download now!');
            });
            
            stream.on('info', (info) => {
                console.info('[DOWNLOADER]', `Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);
            });
            
            stream.on('end', () => {
                console.info('[DOWNLOADER]', 'Done!');
            });
            
            stream.on('error', (err) => console.error('[ERROR]', err));
        }
    }
}

// search('the hardest part');