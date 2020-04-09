const electron = require('electron');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'pig game',
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile('index.html');
    mainWindow.on('close', () => {
        app.quit();
    });
});


ipcMain.on('data-inc', (event, args) => {
    console.log(args);
}); 