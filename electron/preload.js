const { contextBridge, ipcRenderer } = require('electron');

/**
 * This file bridges the main process, electron.js, with the render process, Login.tsx,
 * by exposing specific API using contextBridge.
 */

const exposedAPI = {
  /**
   * @remarks
   * Invoked by Login button to configure the user's local files
   *
   * @param channel - listener in electron will receive this message if listening to this channel
   * @param func - Callback from login containing the event and response data
   */
  onConfig: (func) => ipcRenderer.send('on-config', func),

  /**
   * @remarks
   * Invoked by electron to send response to Login's button press
   *
   * @param channel - listeners will receive this message if listening to this channel
   * @param func - Callback from electron containing the event and response data
   */
  onConfigResp: (channel, func) => {
    ipcRenderer.on(channel, func);
  },

  /**
   * @remarks
   * Invoked by Login to retrieve any locally-stored configurations/credentials
   * located in the user's aws and kubeconfig files.
   * @param channel - listener in electron will receive this message if listening to this channel
   */
  getConfig: () => ipcRenderer.send('get-config'),

  /**
   * @remarks
   * Invoked by electron to give Login any found user credentials/configurations
   *
   * @param channel - listeners will receive this message if listening to this channel
   * @param func - Callback from electron containing the event and response data
   */
  onSendConfig: (channel, func) => {
    ipcRenderer.on(channel, func);
  },

  /**
   * @remarks
   * Invoked by Login on unMount to avoid the accumulation of multiple listeners
   */
  unMount: () => ipcRenderer.removeAllListeners(),
};

// Exposes API key:value functions to the renderer process
contextBridge.exposeInMainWorld('electronAPI', exposedAPI);
