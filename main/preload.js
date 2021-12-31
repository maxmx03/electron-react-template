const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  greeting: 'Electron powered with React',
  themeMode: () => ipcRenderer.invoke('dark-mode:toggle'),
});
