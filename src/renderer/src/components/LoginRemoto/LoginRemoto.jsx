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

const LoginRemoto = ({ data }) => {

    const [user, setUser] = useState("user");
    const [pass, setPass] = useState("pass");
    const [equipo, setEquipo] = useState("equipo");

    const [carga, setCarga] = useState(false);

    const [loading, setLoading] = useState(false);
    const handleLoading = () => setLoading();

    const [error, setError] = useState(false);
    const [errorMsj, setErrorMsj] = useState("Error al iniciar el escritorio remoto.");
    const [errorTipo, setErrorTipo] = useState(true); //0 = OK, 1 == error

    const handleUser = (e) => setUser(e.target.value);
    const handlePass = (e) => setPass(e.target.value);
    const handleEquipo = (e) => setEquipo(e.target.value);

    const handleError = () => setError(!error);
    const handleCarga = () => setCarga(false);

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
        try {
            //setCarga(true);
            setLoading(true);
            const result = await window.electron.ipcRenderer.invoke('login-remoto', userObj);
            //setCarga(false);
            setLoading(false);
            setError(true);
            console.log(result)
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
                    <input onChange={handleEquipo} placeholder={"EQUIPO"} className='inputLoginRemoto' type="text" />
                </div>
                <div className='divCampoLoginRemoto'>
                    <img src={userIcon} className={'imgLoginRemoto' + data.empresa} />
                    <input onChange={handleUser} placeholder={"USUARIO"} className='inputLoginRemoto' type="text" />
                </div>
                <div className='divCampoLoginRemoto'>
                    <img src={passIcon} className={'imgLoginRemoto' + data.empresa} />
                    <input onChange={handlePass} placeholder={"CONTRASEÑA"} className='inputLoginRemoto' type="password" />
                </div>
            </div>
            <button className={'btnLoginRemoto' + data.empresa} onClick={HandleLogin}>Login</button>
            <button className={'btnLoginRemoto' + data.empresa} onClick={data.volver}>Volver</button>
            <p className='pLoginRemoto'>¿Olvidaste la contraseña?</p>

            {carga ? <VetanaCargando data={{ cerrar: handleCarga }} /> : null}
            {error ? <Ventana data={objError} /> : null}
            {loading ? <Loading data={{ cerrar: handleLoading }} /> : null}
        </div>
    )
}

export default LoginRemoto