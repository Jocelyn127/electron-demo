// import electron instance
const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');
const url=require('url');

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
}) 