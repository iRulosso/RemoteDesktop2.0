import { app, shell, BrowserWindow, ipcMain, autoUpdater } from 'electron'
import { join } from 'path'
import { exec } from 'child_process';
import { WebSocket } from 'ws';
import path from 'path';
import fs from 'fs';
import { https } from 'follow-redirects';
import { spawn } from 'child_process';
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// Just place this code at the entry point of your application:
import updater from 'electron-simple-updater';

let checkForti = false;

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
    updater.init('https://raw.githubusercontent.com/iRulosso/RemoteDesktop2.0/main/updates.json');
    updater
      .on('update-downloading', () => mainWindow.webContents.send('update-downloading'))
      .on('update-downloaded', () => updater.quitAndInstall());
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
  const checkProcess = () => {
    exec('pgrep openfortivpn', (error, stdout, stderr) => {
      if (stdout) {
        mainWindow.webContents.send('forti-si', 'El proceso openfortivpn está en ejecución.');
      } else {
        mainWindow.webContents.send('forti-no', 'El proceso openfortivpn no está en ejecución.');
      }
    });
  }

  setInterval(checkProcess, 2000);


  ////////////////COMPROBACION DE WIFI

  function realizarPing() {
    exec('ping -c 1 -W 1 8.8.8.8', (error, stdout, stderr) => {
      if (stdout.includes('1 received')) {
        mainWindow.webContents.send('ping-si', 'Hay ping al 8.8.8.8');
      } else {
        mainWindow.webContents.send('ping-no', 'no hay ping al 8.8.8.8');
      }
      if (error !== null) {
        console.error(`Error al intentar hacer ping: ${error}`);
      }
    });
  }

  // Llamar a la función inicialmente y luego cada 5 segundos
  setInterval(realizarPing, 5000);

  ////////////////////////////////////
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

  // check lan red
  ipcMain.on('check-lan', (event) => {
    exec('ping -c 1 -W 1 172.20.6.15', (error, stdout, stderr) => {
      if (stdout.includes('1 received')) {
        event.sender.send('check-lan-si', 'estamos en red');
        checkForti = true;
      } else {
        checkForti = false;
        event.sender.send('forti-off', 'El proceso openfortivpn no está en ejecución.');
      }
    });
  })


  // check team viewer
  ipcMain.on('check-team', (event) => {
    console.log("Chequeando que este instalado pipi pu.")

    exec('which teamviewer', (err, stdout, stderr) => {
      if (err || stderr) {
        console.log("No esta instalado");
        IniciarPRocesoTeam();

      } else {
        console.log("Esta instalado, prosiga maestro.");
      }
    });
  })

  const IniciarPRocesoTeam = async () => {
    try {
      const filePath = await DescargarTeam(); // Espera la ruta del archivo
      console.log("Archivo descargado en:", filePath);

      // Llamar a la función de instalación
      InstallTeam(filePath);
    } catch (error) {
      console.error("Error al descargar TeamViewer:", error);
    }
  }

  const DescargarTeam = () => {
    console.log("Verificando archivo...");

    const fileUrl = 'https://download.teamviewer.com/download/linux/teamviewer_amd64.deb';
    const fileName = 'teamviewer_amd64.deb';

    // Guardar en escritorio
    const downloadDir = app.getPath('desktop'); // O 'userData' si prefieres
    const filePath = path.join(downloadDir, fileName);
    console.log(`Ruta destino: ${filePath}`);

    // Verificar si el archivo ya existe
    if (fs.existsSync(filePath)) {
      console.log("El archivo ya existe. No se descargará nuevamente.");
      return Promise.resolve(filePath); // Devuelve la ruta sin descargar
    }

    console.log("Descargando archivo...");

    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(filePath);

      https.get(fileUrl, (response) => {
        if (response.statusCode !== 200) {
          console.log(`Error: Código de estado ${response.statusCode}`);
          fs.unlink(filePath, () => { }); // Elimina archivo vacío si falla
          return reject(new Error(`Falló la descarga, código de estado: ${response.statusCode}`));
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close(() => {
            console.log("Archivo descargado correctamente.");
            resolve(filePath);
          });
        });

      }).on('error', (err) => {
        fs.unlink(filePath, () => { });
        console.log("Error de descarga:", err);
        reject(err);
      });

      file.on('error', (err) => {
        fs.unlink(filePath, () => { });
        console.log("Error al escribir el archivo:", err);
        reject(err);
      });
    });
  };

  const InstallTeam = (filePath) => {
    console.log("Instalando");
    exec(`pkexec dpkg -i ${filePath}`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error("Error al instalar TeamViewer:", stderr);
      } else {
        console.log("TeamViewer instalado correctamente");
        //AssignTeamViewer();
      }
    });
  }

  const AssignTeamViewer = (token = "25869860-BkKcfk3X8WQjJxPf1hM4", alias = "NuevaNote") => {
    console.log("Asignando equipo a la cuenta de TeamViewer...");

    // Comando para asignar el equipo a la cuenta asociada al token
    const command = `sudo teamviewer assign --api-token ${token} --grant-easy-access --alias "${alias}"`;

    exec(command, (err, stdout, stderr) => {
        if (err || stderr) {
            console.error("Error al asignar la cuenta de TeamViewer:", stderr);
        } else {
            console.log("Equipo asignado correctamente a la cuenta de TeamViewer:", stdout);
        }
    });
};

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      comando = `xfreerdp /multimon /v:${argumentos.equipo} /u:${argumentos.user} /p:${argumentos.pass} /sound /mic /floatbar /scale:100 +auto-reconnect /auto-reconnect-max-retries:5 /cert-ignore`;
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


  /////////////////Iniciar Forti

  ipcMain.on('remoto-login2', (event, argumentos) => {
    const freerdp = spawn('sudo', ['openfortivpn', `${argumentos.vpn}`, `--trusted-cert c41c6f92a13640c3c41fbfce177d65cf94df76991a13d04dcbebbb4a1d493cc0`, `--username=${argumentos.user}`, `--password=${argumentos.pass}`, `--otp=${argumentos.otp}`], {
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
    const openfortivpnProcess = spawn('sudo', ['openfortivpn', `${argumentos.vpn}`, `--username=${argumentos.user}`, `--password=${argumentos.pass}`, `--otp=${argumentos.otp}`, `--trusted-cert`, `c41c6f92a13640c3c41fbfce177d65cf94df76991a13d04dcbebbb4a1d493cc0`], {
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
