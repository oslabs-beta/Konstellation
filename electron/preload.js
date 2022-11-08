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
  onConfig: (arg) => ipcRenderer.send('on-config', arg),
  /**
   * @remarks
   * Invoked by electron to send response to Login's button press
   *
   * @param x - The first input number
   * @param y - The second input number
   */
  onConfigResp: (event, func) => {
    ipcRenderer.on(event, func);
  },
  /**
  * @remarks
  * Invoked by Login to retrieve any locally-stored configurations/credentials
  * located in the user's aws and kubeconfig files.
  */
  getConfig: () => ipcRenderer.send('get-config'),
  /**
   * @remarks
   * Invoked by electron to give Login any found user credentials/configurations
   *
   * @param x - The first input number
   */
  onSendConfig: (event, func) => {
    ipcRenderer.on(event, func);
  },

  unMount: () => ipcRenderer.removeAllListeners()

};

// Exposes API key:value functions to the renderer process
contextBridge.exposeInMainWorld("electronAPI", exposedAPI);