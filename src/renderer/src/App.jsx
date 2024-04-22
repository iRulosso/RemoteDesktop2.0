/* eslint-disable prettier/prettier */
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import { useState } from "react";
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

  const handleDev = () => setLogged(!logged);
  const handleSalirForti = () => setLogged(false);

  window.electron.ipcRenderer.on('forti-off', (event, message) => {
    setLogged(false);
});

  const handleFormRemoto = (e) => {
    setEmpresa(e)
    setFormRemoto(!formRemoto);
  }

  return (
    <div>
      <div className="app">
        <Barra />
        <div className="contenidoDiv">
          {logged ? (
            formRemoto ? <LoginRemoto data={{ volver: handleFormRemoto, empresa}} /> : <Menu data={{ elegir: handleFormRemoto, cerrar:  handleSalirForti}} />)
            : <Login setLogged={setLogged} />}
          <button style={{ width: 1, height: 1 }} onClick={handleDev}></button>
        </div>
        <SubBarra/>
      </div>
    </div>
  )
}

export default App;