// import electron instance
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const url = require('url');

console.log('global env:');
console.log(process.env.NODE_ENV);

let win = null;
let addWin = null;
// listen
app.on('ready', () => {
    //create window
    win = new BrowserWindow({
        height: 600,
        width: 600,
        webPreferences: { nodeIntegration: true }
    });

    // win.loadURL('https://www.baidu.com');
    win.loadURL(url.format({
        pathname: path.resolve(__dirname, './html/main.html'),
        proctocal: 'file',
        slashes: true
    }));

    //Define nav bar
    checkEnv();
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    // click main win close button, sub-win should also be closed.
    win.on('closed', () => {
        app.quit();
    });
});

// Top menu template
const menuTemplate = [{
    // File menu items
    label: 'File',
    submenu: [
        {
            label: 'Insert Info',
            click: () => {
                createAddWindow();
            }
        },
        { label: 'Delete Info' },
        {
            label: 'Quit',
            accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click: () => {
                // quit window
                app.quit();
            }
        }
    ]
}];
//create a new window
const createAddWindow = () => {
    addWin = new BrowserWindow({
        height: 300,
        width: 600,
        webPreferences: { nodeIntegration: true }
    });

    // win.loadURL('https://www.baidu.com');
    addWin.loadURL(url.format({
        pathname: path.resolve(__dirname, './html/add.html'),
        proctocal: 'file',
        slashes: true
    }));
}



// check current env
const checkEnv = () => {
    let env = process.env.NODE_ENV;
    let devConfig = {
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Open/Close',
                accelerator: process.platform === 'darwin' ? '' : 'F12',
                click: (item, focusedWindow) => {
                    // current focused window, toggle devtools
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label: 'Refresh',
                role: 'reload',
                accelerator: process.platform === 'darwin' ? 'Command+F5' : 'Ctrl+F5'
            }
        ]

    };
    if (env !== 'production') {
        menuTemplate.push(devConfig);
    }
}

// event lsiten
const eventListen = ()=>{
    // listen new insert window send info 
    ipcMain.on('info:add',(event, val)=>{
        win.webContents.send('info:add', val);
        console.log(val);
    })
}

eventListen();