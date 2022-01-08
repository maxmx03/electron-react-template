require('dotenv').config();
const path = require('path');
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');

try {
  require('electron-reloader')(module);
} catch (_) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'production') {
    win.loadFile(path.resolve('dist', 'index.html'));
  } else {
    const port = process.env.PORT ?? '8080';

    win.loadURL('http://localhost:' + port);
  }

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
  });
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
