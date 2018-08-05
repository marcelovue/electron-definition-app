'use strict';

require('babel-core/register');
require("babel-polyfill");

const { app, BrowserWindow } = require('electron')

require('electron-reload')(__dirname)

app.on('ready', function() {
  const box = new BrowserWindow({
    width: 1366,
    height: 768,
    frame: false
  });
  box.loadURL(`file://${__dirname}/public/index.html`)
  box.once('ready-to-show', () => {
    box.show()
  })
})
