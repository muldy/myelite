const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
const url = require('url')

var fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768
  })

  // and load the index.html of the app.
  //win.loadURL('http://localhost:3000')

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the
    // time
    // when you should delete the corresponding element.
    win = null
  })
  //websockets client
  const socketClient = require('./api/client_socket');
  socketClient.startServer(win,mainDb);

  /* LOG READER */
  const lreader = require('./api/log_reader')
  if (process.argv.includes("--demo")) {
    // Open the DevTools.
    win.webContents.openDevTools()
    console.log("Running demo!")
    try {
      fs.unlinkSync("db/comgoals");
      fs.unlinkSync("db/events");
      fs.unlinkSync("db/missions");
      //fs.unlinkSync("db/ranks");
      //fs.unlinkSync("db/loads");
      //fs.unlinkSync("db/progress");
    } catch (error) {
      //they may not exist
      console.log(error)
    }

    var reader = lreader.readLog(win, mainDb ,process.argv[process.argv.indexOf("--demo")+1]);
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var Datastore = require('nedb')
var mainDb = {
  dbEvents: new Datastore({
    filename: 'db/events',
    autoload: true
  }),

  dbMissions: new Datastore({
    filename: 'db/missions',
    autoload: true
  }),

  dbCommunityGoal: new Datastore({
    filename: 'db/comgoals',
    autoload: true
  }),
  dbRanks: new Datastore({
    filename: 'db/ranks',
    autoload: true
  }),
  dbLoads: new Datastore({
    filename: 'db/loads',
    autoload: true
  }),
  dbProgress: new Datastore({
    filename: 'db/Progress',
    autoload: true
  })
}


var back = require('./api/backend')
back.bindBackend(mainDb)