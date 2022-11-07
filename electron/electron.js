const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
// const { electron } = require("process");
const url = require("url");
const { exec } = require("child_process");
const { config } = require("dotenv");

let win;

/**
 * Need to set individual AWS creds one by one, additionally
 * want to avoid violating the DRY principle
 */

function setAWSCred(field, value, field2, value2, field3, value3) {
  exec(`aws configure set ${field} ${value} set ${field2} ${value2} set ${field3} ${value3} set output json`, (error, stdout, stderr) => {
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
}

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
function configAWS(accessKey, secretKey, region) {

  setAWSCred('aws_access_key_id', accessKey, 'aws_secret_access_key', secretKey, 'region', region,);
  // setAWSCred('aws_secret_access_key', secretKey);
  // setAWSCred('region', region);
  // setAWSCred('output', 'json');

  // exec("aws configure", (error, stdout, stderr) => {
  //   //exec("ls -la", (error, stdout, stderr) => {
  //     if (error) {
  //         console.log(`error: ${error.message}`);
  //         return;
  //     }
  //     if (stderr) {
  //         console.log(`stderr: ${stderr}`);
  //         return;
  //     }
  //     console.log(`stdout: ${stdout}, ${__dirname}`);
  //   });

  return 'configAWS!';
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
//app.on('ready', createWindow);


app.whenReady().then(() => {
  /**
     * @remarks
     * Invoked by Login.tsx when the Login button is pressed
     * Configures the client's auth using CLI commands 
     * @param event - event that triggered the 
     * @param arg - how to configure the client's local files
     * @returns True if success, otherwise False
     */
  ipcMain.on('onLoginClick', (event, arg) => {
    console.log('arg', arg);
    //console.log(configAWS('AKIAYJBPIFYYMUCCI4AS', 'vrivjMHgOJfWUkf+/x0GqMuBzTnDicoiZJZsKDWA', 'us-west-2'));
    // event.reply('config-aws-result', configAWS());
    // Trigger another IPC event back to the render process
    event.sender.send('onConfigResp', 'my goodness watson!');
  });

  createWindow();
});

//module.exports = { configAWS }