// import electron instance
const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const path = require('path');
const url = require('url');

console.log('global env:');
console.log(process.env.NODE_ENV);

let win = null;
// listen
app.on('ready', () => {
    //create window
    win = new BrowserWindow({
        height: 600,
        width: 600
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
});

// Top menu template
const menuTemplate = [{
    // File menu items
    label: 'File',
    submenu: [
        { label: 'Insert Info' },
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

const checkEnv=()=>{
    let env= process.env.NODE_ENV;
    let devConfig={
        label: 'Dev Tools',
        submenu: [
            {
                label: 'Open/Close',
                accelerator: process.platform==='darwin'?'':'F12',
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
    if(env!=='production'){
        menuTemplate.push(devConfig);
    }
}