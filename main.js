const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    icon: 'img/appLogo.ico',
    title: 'Ewelink Desktop App',
    width: 300,
    height: 400,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false, 
    }
  })
  win.removeMenu();
  win.resizable = false;
  win.loadFile('index.html');
  win.webContents.openDevTools();
}
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})