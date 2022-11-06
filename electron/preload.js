const { contextBridge, ipcRenderer } = require('electron')

/**
   * This file bridges the main process, electron.js, with the render process, Login.tsx,
   * by exposing specific API using contextBridge.
   */
console.log('context bridge RULES!');

contextBridge.exposeInMainWorld('electronAPI', {
    ipcRenderer: {
        onButtonClick() {
          ipcRenderer.send('button-example', 'Button Clicked');
        },
      },
});
