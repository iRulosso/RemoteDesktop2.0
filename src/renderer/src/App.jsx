/* eslint-disable prettier/prettier */
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import { useState } from "react";
import Ventana from "./components/Utils/Ventana/Ventana";
import LoginRemoto from "./components/LoginRemoto/LoginRemoto";
import Barra from "./components/Barra/Barra";
import Loading from "./components/Loading/Loading";
import './App.css'

function App() {

  const [logged, setLogged] = useState(false);
  const [formRemoto, setFormRemoto] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsj, setErrorMsj] = useState("error");
  const [errorTipo, setErrorTipo] = useState(false); //0 = OK, 1 == error
  const [empresa, setEmpresa] = useState('allaria');

  const handleError = () => setError(false);
  const handleDev = () => setLogged(!logged);

  let objError =
  {
    tipo: errorTipo,
    texto: errorMsj,
    cerrar: handleError
  }

  const HandleLogin = (argumentos) => {
    const respuesta = window.electron.ipcRenderer.sendSync("forti-login", argumentos)
    console.log(respuesta);
    if (respuesta === true) setLogged(true);
    else {
      setError(true);
      setErrorTipo(true);
      setErrorMsj("Error al conectar la VPN.");
    }
  }

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
            formRemoto ? <LoginRemoto data={{ volver: handleFormRemoto, empresa}} /> : <Menu data={{ elegir: handleFormRemoto }} />)
            : <Login login={HandleLogin} />}
          {error ? <Ventana data={objError} /> : null}
          <button style={{ width: 1, height: 1 }} onClick={handleDev}></button>
        </div>
      </div>
    </div>
  )
}

export default App;