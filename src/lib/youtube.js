const fs = require('fs');
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

        stream.pipe(fs.createWriteStream(`./${videoTitle}.mp4`));

        stream.on('start', () => {
            console.info('[DOWNLOADER]', 'Starting download now!');
        });
        
        stream.on('info', (info) => {
        // { video_details: {..}, selected_format: {..}, formats: {..} }
            console.info('[DOWNLOADER]', `Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);
        });
        
        stream.on('progress', (info) => {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`[DOWNLOADER] Downloaded ${info.percentage}% (${info.downloaded_size}MB) of ${info.size}MB`);
        });
        
        stream.on('end', () => {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            console.info('[DOWNLOADER]', 'Done!');
        });
        
        stream.on('error', (err) => console.error('[ERROR]', err));
    }
}

// search('the hardest part');