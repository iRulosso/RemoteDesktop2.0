import React, { useState } from 'react'
import './LoginRemoto.css'
import userIcon from '../../assets/user.png';
import passIcon from '../../assets/pass.png';
import equipoIcon from '../../assets/equipo.png';
import VetanaCargando from '../Utils/VentanaCargando/VetanaCargando';
import Ventana from '../Utils/Ventana/Ventana';
import allariaicon from '../../assets/allariaTitulo.png'
import alfaIcon from '../../assets/alfaTitulo.png'
import arpyIcon from '../../assets/arpyTitulo.png'
import alfyIcon from '../../assets/alfyTitulo.png'
import Loading from '../Loading/Loading';
import Tutorial from '../Utils/Tutorial/Tutorial';

const LoginRemoto = ({ data }) => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [equipo, setEquipo] = useState("");

    const [camposVacios, setCamposVacios] = useState(false);

    const [carga, setCarga] = useState(false);

    const [loading, setLoading] = useState(false);
    const handleLoading = () => setLoading();

    const [error, setError] = useState(false);
    const [errorMsj, setErrorMsj] = useState("Error al iniciar el escritorio remoto.");
    const [errorTipo, setErrorTipo] = useState(true); //0 = OK, 1 == error

    const handleUser = (e) => {setUser(e.target.value);setCamposVacios(false);}
    const handlePass = (e) => {setPass(e.target.value);setCamposVacios(false);}
    const handleEquipo = (e) => {setEquipo(e.target.value);setCamposVacios(false);}

    const handleError = () => setError(!error);
    const handleCarga = () => setCarga(false);

    const [tutorial, setTutorial] = useState(false);
    const handleTutorial = () => setTutorial(!tutorial);

    let userObj =
    {
        user,
        pass,
        equipo,
        empresa: data.empresa
    }
    let objError =
    {
        tipo: errorTipo,
        texto: errorMsj,
        cerrar: handleError
    }

    const HandleLogin = async () => {

        setCamposVacios(false);

        if (user === "" || pass === "" || equipo === "") {
            setCamposVacios(true);
            return
        }

        try {
            //setCarga(true);
            setLoading(true);
            const result = await window.electron.ipcRenderer.invoke('login-remoto', userObj);
            //setCarga(false);
            setErrorMsj("Ha ocurrido un error inesperado.");
            try {
                if (result.includes("DNS_NAME_NOT_FOUND") || result.includes("ERRCONNECT_CONNECT_TRANSPORT_FAILED")) {
                    if (equipo.includes("."))
                        setErrorMsj("No se encontro el equipo, esta mal escrito o se encuentra apagado.");
                    else
                        setErrorMsj("No se encontro el equipo, esta mal escrito o se encuentra apagado. Pruebe con IP");

                } else if (result.includes("ERRCONNECT_LOGON_FAILURE")) {
                    setErrorMsj("No se pudo iniciar sesion en el remoto, compruebe usuario y/o contraseña.");
                } else if (result.includes("ERRINFO_LOGOFF_BY_USER") || result.includes("ERRINFO_RPC_INITIATED_DISCONNECT_BY_USER")) {
                    setLoading(false);
                    data.volver();
                }

                setLoading(false);
                setError(true);
            } catch (error) {
                setLoading(false);
                data.volver();
            }
            console.log(result);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    }


    return (
        <div className='divLoginRemoto'>
            <h1 className='h1LoginRemoto'>Escritorio Remoto</h1>
            {data.empresa === "allaria" ? <img className='imgTitulo' src={allariaicon} alt="" /> : null}
            {data.empresa === "alfa" ? <img className='imgTitulo' src={alfaIcon} alt="" /> : null}
            {data.empresa === "arpy" ? <img className='imgTitulo' src={arpyIcon} alt="" /> : null}
            {data.empresa === "alfy" ? <img className='imgTitulo' src={alfyIcon} alt="" /> : null}
            <div className='formLoginRemoto'>
                <div className='divCampoLoginRemoto'>
                    <img src={equipoIcon} className={'imgLoginRemoto' + data.empresa} />
                    <input onChange={handleEquipo} placeholder={"EQUIPO"} className={camposVacios ? 'inputLoginRemotoError' : "inputLoginRemoto"} type="text" />
                </div>
                <div className='divCampoLoginRemoto'>
                    <img src={userIcon} className={'imgLoginRemoto' + data.empresa} />
                    <input onChange={handleUser} placeholder={"USUARIO"} className={camposVacios ? 'inputLoginRemotoError' : "inputLoginRemoto"} type="text" />
                </div>
                <div className='divCampoLoginRemoto'>
                    <img src={passIcon} className={'imgLoginRemoto' + data.empresa} />
                    <input onChange={handlePass} placeholder={"CONTRASEÑA"} className={camposVacios ? 'inputLoginRemotoError' : "inputLoginRemoto"} type="password" />
                </div>
            </div>
            {camposVacios ? <p className='pCamposError'>¡Debe completar todos los campos!</p> : null}
            <button className={'btnLoginRemoto' + data.empresa} onClick={HandleLogin}>Login</button>
            <button className={'btnLoginRemoto' + data.empresa} onClick={data.volver}>Volver</button>
            <p className='pLoginVpn' onClick={handleTutorial}>¿No sabes conectearte? Haz click aqui</p>
            <p className='pLoginRemoto'>¿Olvidaste la contraseña?</p>

            {carga ? <VetanaCargando data={{ cerrar: handleCarga }} /> : null}
            {error ? <Ventana data={objError} /> : null}
            {loading ? <Loading data={{ cerrar: handleLoading }} /> : null}
            {tutorial ? <Tutorial tutorial={2} cerrar={handleTutorial}/>:null}
        </div>
    )
}

export default LoginRemoto