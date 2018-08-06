const { app, BrowserWindow, globalShortcut } = require('electron')

require('electron-reload')(__dirname)

let inputEL;
app.on('ready', function() {
  const box = new BrowserWindow({
    width: 1366,
    height: 768,
    frame: false,
    transparent: true,
    title: 'Hello'
  });
  box.loadURL(`file://${__dirname}/public/index.html`)
  box.once('ready-to-show', () => {
    box.show()
    window.onload = function() {
      inputEL = document.querySelector('.target');
    }
  })
  globalShortcut.register('Control+Shift+L', () => {
    box.hide()
  })
  globalShortcut.register('Control+l', () => {
    box.show()
    inputEL.focus()
  });
})
