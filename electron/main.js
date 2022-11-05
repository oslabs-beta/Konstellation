const { app, BrowserWindow } = require("electron");
const path = require("path");
// const { electron } = require("process");
const url = require("url");

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1400, height: 900});
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
app.on('ready', createWindow);

//app.whenReady().then(createWindow);