const { contextBridge, ipcRenderer } = require('electron');
const yt = require('./lib/youtube');

contextBridge.exposeInMainWorld(
    "api", {
        minimize: () => {
            ipcRenderer.send('minimize');
        },
        close: () => {
            ipcRenderer.send('close');
        },
        search: (query) => yt.search(query)
    }
);
