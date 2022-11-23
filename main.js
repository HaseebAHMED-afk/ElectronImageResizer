const {app , BrowserWindow , Menu , ipcMain} = require('electron')
const path = require('path')
require('dotenv').config()

const isMac = process.platform == 'darwin' ? true : false
const isDev = process.env.NODE_ENV == 'development'


function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title:'Image Resize',
        width: isDev ? 1000 : 500,
        height:600,
        webPreferences:{
            contextIsolation:true,
            nodeIntegration:true,
            preload:path.join(__dirname,'preload.js')
        }
    })

    if(isDev){
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname , './renderer/index.html'))
}


function createAboutWindow(){
    const mainWindow = new BrowserWindow({
        title:'Image Resize',
        width: isDev ? 1000 : 500,
        height:600,
    })

    mainWindow.loadFile(path.join(__dirname , './renderer/about.html'))
}


app.whenReady().then(()=>{
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})


const menu = [
    {
        label:'File',
        submenu:[
            {
            label:'Quit',
            click:()=> app.quit(),
            accelerator:'CmdOrCtrl+W'
            },
    ]
    },
    {
        label:'About',
        submenu:[
            {
            label:'About',
            click:createAboutWindow
            },
    ]
    }
]


ipcMain.on('image:resize' , (e,options)=>{
    console.log(options);

    // image resize, save to folder using fs and open folder using shell ,
    // send response to script using mainWindow.devTools.send

    
})


app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })