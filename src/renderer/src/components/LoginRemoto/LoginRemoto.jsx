import React, { useState } from 'react'
import './LoginRemoto.css'
import userIcon from '../../assets/user.png';
import passIcon from '../../assets/pass.png';
import VetanaCargando from '../Utils/VentanaCargando/VetanaCargando';

const LoginRemoto = ({ data }) => {

    const [user, setUser] = useState("user");
    const [pass, setPass] = useState("pass");
    const [equipo, setEquipo] = useState("equipo");

    const [carga, setCarga] = useState(true);

    const handleUser = (e) => setUser(e.target.value);
    const handlePass = (e) => setPass(e.target.value);
    const handleEquipo = (e) => setEquipo(e.target.value);

    let userObj =
    {
        user,
        pass,
        equipo
    }

    const HandleLogin = async () => {
        try {
            setCarga(true);
            const result = await window.electron.ipcRenderer.invoke('login-remoto', userObj);
            setCarga(false);
            console.log(result)
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    }


    return (
        <div className='divLoginRemoto'>
            <h1 className='h1LoginRemoto'>Escritorio Remoto</h1>
            <div className='formLoginRemoto'>
                <div className='divCampoLoginRemoto'>
                    <img src={userIcon} className='imgLoginRemoto' />
                    <input onChange={handleEquipo} placeholder={"EQUIPO"} className='inputLoginRemoto' type="text" />
                </div>
                <div className='divCampoLoginRemoto'>
                    <img src={userIcon} className='imgLoginRemoto' />
                    <input onChange={handleUser} placeholder={"USUARIO"} className='inputLoginRemoto' type="text" />
                </div>
                <div className='divCampoLoginRemoto'>
                    <img src={passIcon} className='imgLoginRemoto' />
                    <input onChange={handlePass} placeholder={"CONTRASEÑA"} className='inputLoginRemoto' type="password" />
                </div>
            </div>
            <button className='btnLoginRemoto' onClick={HandleLogin}>Login</button>
            <button className='btnLoginRemoto' onClick={data.volver}>Volver</button>
            <p className='pLoginRemoto'>¿Olvidaste la contraseña?</p>

            {carga ? <VetanaCargando/>:null}
        </div>
    )
}

export default LoginRemoto