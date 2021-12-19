const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const yt = require('./lib/youtube');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false,
    maximizable: false,
    resizable: false
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

function initialize() {
  const mainDir = path.join('.cache');
  if (!fs.existsSync(mainDir)) {
    fs.mkdir(mainDir, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  initialize();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('minimize', () => {
    mainWindow.minimize();
});

ipcMain.on('close', () => {
  app.quit();
});

ipcMain.handle('search', async (event, query) => {
  const searchResult = await yt.search(query);
  return searchResult;
});

ipcMain.handle('download', async (event, downloadArgs) => {
  await yt.download(downloadArgs.videoId, downloadArgs.treatedTitle)
});

ipcMain.handle('getMusics', (event, args) => {
  const musicList = fs.readdirSync('./.cache/');
  return musicList;
});

ipcMain.handle('getMusicsPath', (event, args) => {
  return path.join(__dirname, '.cache')
})
