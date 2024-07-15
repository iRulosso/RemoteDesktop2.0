import { app, shell, BrowserWindow, ipcMain, autoUpdater } from 'electron'
import { join } from 'path'
import { exec } from 'child_process';
import { WebSocket } from 'ws';
import { spawn } from 'child_process';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// Just place this code at the entry point of your application:
import updater from 'electron-simple-updater';
updater.init('https://raw.githubusercontent.com/iRulosso/RemoteDesktop2.0/main/updates.json');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    fullscreen: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ///////////////////////////test forti
  /*
    const checkProcess =()=> {
      exec('pgrep openfortivpn', (error, stdout, stderr) => {
        if (stdout) {
        } else {
          mainWindow.webContents.send('forti-off', 'El proceso openfortivpn no está en ejecución.');
        }
      });
    }
  
    setInterval(checkProcess, 20000);
  */
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', (event) => { console.log('pong'); event.reply('ping-r'); })

  ///Abrir app
  ipcMain.on('abrir-app', (event, command) => {
    console.log("Abriendo app..");
    // Ejecutar el comando
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al intentar abrir Chrome: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error en la salida estándar: ${stderr}`);
        return;
      }
      console.log(`Chrome abierto correctamente.`);
    });
  });
  ipcMain.on('cerrar-forti', (event, command) => {
    // Ejecutar el comando
    exec("sudo pkill openfortivpn", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al intentar abrir Chrome: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error en la salida estándar: ${stderr}`);
        return;
      }
      console.log(`Chrome abierto correctamente.`);
    });
  });


  //Login remoto
  ipcMain.handle('login-remoto', async (event, argumentos) => {

    let comando = '';
    if (argumentos.equipo.includes(".")) {
      comando = `xfreerdp /multimon /v:${argumentos.equipo} /u:${argumentos.user} /p:${argumentos.pass} /sound /mic /cert-ignore`;
    } else {
      switch (argumentos.empresa) {
        case "allaria":
          comando = `xfreerdp /multimon /v:${argumentos.equipo}.allaria.local /u:${argumentos.user} /p:${argumentos.pass} /sound /mic /cert-ignore`;
          break;
        case "alfa":
          comando = `xfreerdp /multimon /v:${argumentos.equipo}.alfa.local /u:${argumentos.user} /p:${argumentos.pass} /sound /mic /cert-ignore`;
          break;
        case "alfy":
          comando = `xfreerdp /multimon /v:${argumentos.equipo}.smvsa.local /u:${argumentos.user} /p:${argumentos.pass} /sound /mic /cert-ignore`;
          break;
        case "arpy":
          comando = `xfreerdp /multimon /v:${argumentos.equipo}.allaria.local /u:${argumentos.user} /p:${argumentos.pass} /sound /mic /cert-ignore`;
          break;
      }
    }

    console.log("Logueando....");
    try {
      const resultado = await ejecutarComandoAsync(comando);
      // Aquí puedes continuar con el resultado obtenido
      console.log("Operación completada:", resultado);
      return true;
    } catch (error) {
      console.error("Error en el proceso de login:", error);
      return error;
    }
  });

  const ejecutarComandoAsync = async (comando) => {
    return new Promise((resolve, reject) => {
      exec(comando, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar el comando: ${error}`);
          reject(error.message);
          return;
        }
        console.log(`Resultado del comando: ${stdout}`);
        resolve(stdout);
      });
    });
  }


  /////////////////teset remoto

  ipcMain.on('remoto-login2', (event, argumentos) => {
    const freerdp = spawn('sudo', ['openfortivpn', '359.allaria.online', `--username=${argumentos.user}`, `--password=${argumentos.pass}`, `--otp=${argumentos.otp}`], {
      tdio: ['ignore', 'pipe', 'pipe'] // Redirige stdout y stderr para capturarlos
    });
    let outputData = ''; // Almacena la salida capturada

    // Captura y procesa la salida de stdout
    freerdp.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    // Captura y procesa la salida de stderr
    freerdp.stderr.on('data', (data) => {
      outputData += data.toString();
      if (outputData.includes("Authenticated.")) {
        event.returnValue = true;
        console.log("Logueado con exito!!");
      }
    });

    // Maneja el cierre del proceso
    freerdp.on('close', (code) => {
      // Analiza la salida capturada para buscar mensajes relevantes
      if (outputData.includes('ERROR:')) {
        event.returnValue = false;
        console.error('Error al conddddectar:', outputData);
      } else {
        console.log('Conexión establecida correctamente.');
      }
    });

    // Manejar errores
    freerdp.on('error', (error) => {
      console.error('Error al ejecutar openfortivpn:', error);
    });
  });

  //Login forti//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ipcMain.on('forti-login', (event, argumentos) => {
    const openfortivpnProcess = spawn('sudo', ['openfortivpn', '359.allaria.online', `--username=${argumentos.user}`, `--password=${argumentos.pass}`, `--otp=${argumentos.otp}`], {
      tdio: ['ignore', 'pipe', 'pipe'] // Redirige stdout y stderr para capturarlos
    });
    let outputData = ''; // Almacena la salida capturada

    // Captura y procesa la salida de stdout
    openfortivpnProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    // Captura y procesa la salida de stderr
    openfortivpnProcess.stderr.on('data', (data) => {
      outputData += data.toString();
      if (outputData.includes("Authenticated.")) {
        event.returnValue = true;
        console.log("Logueado con exito!!");
      }
    });

    // Maneja el cierre del proceso
    openfortivpnProcess.on('close', (code) => {
      // Analiza la salida capturada para buscar mensajes relevantes
      if (outputData.includes('ERROR:')) {
        event.returnValue = outputData;
        console.error('Error al conddddectar:', outputData);
      } else {
        console.log('Conexión establecida correctamente.');
      }
    });

    // Manejar errores
    openfortivpnProcess.on('error', (error) => {
      console.error('Error al ejecutar openfortivpn:', error);
    });
  });



  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//ws



// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
