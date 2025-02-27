/* eslint-disable prettier/prettier */
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import { useEffect, useState } from "react";
import Ventana from "./components/Utils/Ventana/Ventana";
import LoginRemoto from "./components/LoginRemoto/LoginRemoto";
import Barra from "./components/Barra/Barra";
import Loading from "./components/Loading/Loading";
import './App.css'
import SubBarra from "./components/SubBarra/SubBarra";

function App() {

  const [logged, setLogged] = useState(false);
  const [formRemoto, setFormRemoto] = useState(false);
  const [empresa, setEmpresa] = useState('allaria');
  const [updating, setUpdating] = useState(false);

  const handleDev = () => setLogged(!logged);
  const handleSalirForti = () => setLogged(false);

  useEffect(() => {

    handleCheckTeamViewer();

    // Llama a miFuncion cada segundo usando setInterval
    const intervalId = setInterval(handleCheckLan, 3000);

    // Limpia el intervalo al desmontar el componente para evitar memory leaks
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleCheckLan = () => {
    window.electron.ipcRenderer.send("check-lan", "checkeando lan");
    console.log("Checkeando lan");
  }

  const handleCheckTeamViewer = () => {
    window.electron.ipcRenderer.send("check-team", "checkeando que este instalado el teamviewer");
    console.log("Checkeando team");
  }

  window.electron.ipcRenderer.removeAllListeners('check-lan-si');
  window.electron.ipcRenderer.on('check-lan-si', (event, message) => {
    setLogged(true);
  });

  window.electron.ipcRenderer.removeAllListeners('forti-off');
  window.electron.ipcRenderer.on('forti-off', (event, message) => {
    setLogged(false);
  });

  window.electron.ipcRenderer.removeAllListeners('update-downloading');
  window.electron.ipcRenderer.on('update-downloading', (event, message) => {
    console.log("ACTUALIZANDOOOO");
    setUpdating(true);
  });

  const handleFormRemoto = (e) => {
    setEmpresa(e)
    setFormRemoto(!formRemoto);
  }

  return (
    <div>
      <div className="app">
        {
          updating ? (
            <div>
              <h1>ACTUALIZANDO</h1>
              <p>Actualizando aplicacion, aguarde unos segundos.</p>
              <p>Se reiniciara automaticamente al terminar. Tiempo estimado 20 segundos.</p>
            </div>
          ) : (
            <div>
              <Barra />
              <div className="contenidoDiv">
                {logged ? (
                  formRemoto ? <LoginRemoto data={{ volver: handleFormRemoto, empresa }} /> : <Menu data={{ elegir: handleFormRemoto, cerrar: handleSalirForti }} />)
                  : <Login setLogged={setLogged} />}
                <button style={{ width: 1, height: 1 }} onClick={handleDev}></button>
              </div>
              <SubBarra />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App;