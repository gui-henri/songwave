const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        minimize: () => {
            ipcRenderer.send('minimize');
        },
        close: () => {
            ipcRenderer.send('close');
        },
        search: (query) => ipcRenderer.invoke('search', query)
    }
);
