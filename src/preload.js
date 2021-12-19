const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        minimize: () => {
            ipcRenderer.send('minimize');
        },
        close: () => {
            ipcRenderer.send('close');
        },
        search: (query) => ipcRenderer.invoke('search', query),
        download: (downloadArgs) => ipcRenderer.invoke('download', downloadArgs),
        getMusics: (args) => ipcRenderer.invoke('getMusics', args),
        getMusicsPath: (args) => ipcRenderer.invoke('getCachePath', args)
    }
);
