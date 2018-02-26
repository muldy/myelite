const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
const url = require('url')

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

  // Open the DevTools.
  win.webContents.openDevTools()

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
  socketClient.startServer(win, dbEvents, dbMissions, dbCommunityGoal);

  /* LOG READER */
  const lreader = require('./api/log_reader')
  var reader = lreader.readLog(win, dbEvents, dbMissions, dbCommunityGoal);
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

var Datastore = require('nedb'),
  dbEvents = new Datastore({
    filename: 'db/events',
    autoload: true
  });

dbMissions = new Datastore({
  filename: 'db/missions',
  autoload: true
});

dbCommunityGoal = new Datastore({
  filename: 'db/comgoals',
  autoload: true
});


//load handlebars partials

var hbs = require('hbs');
var fs = require('fs');

var partialsDir = __dirname + '/views/partials';

var filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

var exphbs = require('express-handlebars');

var hbs = exphbs.create({
  defaultLayout: 'main'
});


const {
  ipcMain
} = require('electron')
ipcMain.on('get_data', (event, arg) => {
  console.log(arg) // prints "ping"
  dbMissions.find({}).sort({
    DestinationSystem: 1,
    DestinationStation: 1
  }).exec(function (err, docs) {
    event.sender.send('data', {
      type: "active_missions",
      missions: docs
    })
  })
})