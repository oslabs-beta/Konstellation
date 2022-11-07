const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
// const { electron } = require("process");
const url = require("url");
// This makes the CLI commands asynchronous
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { config } = require("dotenv");
const k8s = require('@kubernetes/client-node');
const fs = require('fs');

let win;


/**
 * 
 * @remarks
 * This method executes a aws CLI command to retrieve the specified field
 * @param field The field to retrieve
 * @returns a string
 */
 async function setAWSField(field, value) {
  try {
    const { stdout, stderr } = await exec(`aws configure set ${field} ${value}`);
    console.log('exec:', stdout);
    // Strip '\n' from the end of the response string
    return stdout.slice(0, stdout.length - 1);
  } catch (e) {
    console.log('err:', e);
  }
}

/**
 * 
 * @remarks
 * This method executes a aws CLI command to retrieve the specified field
 * @param field The field to retrieve
 * @returns a string
 */
async function getAWSField(field) {
  try {
    const { stdout, stderr } = await exec(`aws configure get ${field}`);
    console.log('exec:', stdout);
    // Strip '\n' from the end of the response string
    return stdout.slice(0, stdout.length - 1);
  } catch (e) {
    console.log('err:', e);
  }
  // Returns an empty string if nothing is found or an error
  return '';
}

function createWindow() {
  // Create the browser window
  // Sets the dimensions and contextBridge between main and renderer processes
  win = new BrowserWindow({
    width: 1400, height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  console.log('NODE_ENV:', process.env.NODE_ENV);
  const appURL = (process.env.NODE_ENV === "production")
    ? url.format({
      pathname: path.join(__dirname, "../dist/index.html"),
      protocol: "file:",
      slashes: true,
    })
    : "http://localhost:8080";
  console.log('appURL:', appURL);
  win.loadURL(appURL);


  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  /**
     * @remarks
     * Invoked by Login.tsx when the Login button is pressed
     * Configures the client's auth using CLI commands 
     * @param event - event that triggered the 
     * @param arg - how to configure the client's local files
     * @returns True if success, otherwise False
     */
  ipcMain.on('on-config', (event, arg) => {
    console.log('arg', arg);
    setAWSField('aws_access_key_id', arg[0])
    setAWSField('aws_secret_access_key', arg[1])
    setAWSField('region', arg[3])

    // event.reply('config-aws-result', configAWS());
    // Trigger another IPC event back to the render process
    event.sender.send('onConfigResp', 'my goodness watson!');
  });

  /**
   * @remarks
   * Invoked by Login.tsx when the Login button is pressed
   * Configures the client's auth using CLI commands 
   * @param event - event that triggered the 
   * @returns True if success, otherwise False
   */
  ipcMain.on('get-config', async (event) => {
    console.log("hi?");
    // Retrieve the user's Access Key, Secret Key, and Region from their local files
    const data = [await getAWSField('aws_access_key_id'), await getAWSField('aws_secret_access_key'), await getAWSField('region')];
    console.log('sending config:', data);

    // Send the information to Login.tsx
    event.sender.send('onSendConfig', data);
  });

  createWindow();
});