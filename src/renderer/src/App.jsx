/* eslint-disable prettier/prettier */
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import ElectronLogo from './assets/logo.png'
import { useState } from "react";
import Ventana from "./components/Utils/Ventana/Ventana";

function App() {

  const [logged, setLogged] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsj, setErrorMsj] = useState("error");
  const [errorTipo, setErrorTipo] = useState(false); //0 = OK, 1 == error

  const handleError = () => setError(false);

  let aux = false;

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
      setErrorMsj("Error al conectar a la VPN.");
    }
  }


  return (
    <>
      {logged ? <Menu /> : <Login login={HandleLogin} />}
      {error ? <Ventana data={objError} /> : null}
    </>
  )
}

export default App;