const { app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
// const { electron } = require("process");
const url = require("url");
const { exec } = require("child_process");
const { config } = require("dotenv");

let win;
exec("kubectl get nodes", (error, stdout, stderr) => {
//exec("ls -la", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}, ${__dirname}`);
});

/**
   * Returns the average of two numbers.
   *
   * @remarks
   * This method configures the client's local AWS credentials and config files.
   *
   * @param accessKey - the AWS access key
   * @param secretKey - the AWS secret key
   * @param region - the region the EKS cluster is located
   * @returns The arithmetic mean of `x` and `y`
   *
   * @beta
   */
function configAWS() {

  console.log('configAWS!');
}

function createWindow () {
  // Create the browser window
  // Sets the dimensions and contextBridge between main and renderer processes
  win = new BrowserWindow({width: 1400, height: 900, 
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
//app.on('ready', createWindow);

ipcMain.on('button-example', (arg) => {
  console.log(arg);
  configAWS();
});

app.whenReady().then(() => {
  // Attach listener in the main process with the given ID
// Listen event through runCommand channel
// And return the result to Renderer.

  createWindow();
});

//module.exports = { configAWS }