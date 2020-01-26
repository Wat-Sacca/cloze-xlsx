const { app, BrowserWindow } = require('electron')
//const { dialog } = require('electron')
//const { ipcMain } = require('electron')

const xlsx = require("node-xlsx");


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
  //win.webContents.openDevTools()
  //console.log('xlsx', xlsx)

}

app.on('ready', createWindow)



