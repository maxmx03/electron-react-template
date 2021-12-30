require('dotenv').config();
const { app, BrowserWindow } = require('electron');

try {
  require('electron-reloader')(module);
} catch (_) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const port = process.env.PORT ?? '8080';
  const host = procenss.env.HOST ?? 'http://localhost:';

  win.loadURL(host + port);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
