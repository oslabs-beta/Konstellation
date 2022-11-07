const { contextBridge, ipcRenderer } = require('electron')

/**
   * This file bridges the main process, electron.js, with the render process, Login.tsx,
   * by exposing specific API using contextBridge.
   */
console.log('context bridge RULES!');

const exposedAPI = {
  /**
   * @remarks
   * Invoked by Login button to configure the user's local files
   *
   * @param x - The first input number
   * @param y - The second input number
   */
  onLoginClick: (arg) => ipcRenderer.send('onLoginClick', 'Button Clicked'),
    /**
   * @remarks
   * Invoked by Login button to configure the user's local files
   *
   * @param x - The first input number
   * @param y - The second input number
   */
  onConfigResp: (event, func) => {
    ipcRenderer.on(event, func);
  }
};

// Exposes API key:value functions to the renderer process
contextBridge.exposeInMainWorld("electronAPI", exposedAPI);