import React, { useState } from 'react'
import './LoginRemoto.css'
import userIcon from '../../assets/user.png';
import passIcon from '../../assets/pass.png';

const LoginRemoto = ({data}) => {

    const [user, setUser] = useState("user");
    const [pass, setPass] = useState("pass");
    const [equipo, setEquipo] = useState("equipo");

    const handleUser = (e) => setUser(e.target.value);
    const handlePass = (e) => setPass(e.target.value);
    const handleEquipo = (e) => setEquipo(e.target.value);

    let userObj =
    {
        user,
        pass,
        equipo
    }

    const handleLoginRemoto = () => window.electron.ipcRenderer.send("login-remoto", userObj);

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
                <p className='pLoginRemoto'>¿Olvidaste la contraseña?</p>
            </div>
            <div className='divBotonesLoginRemoto'>
                <button className='btnLoginRemoto' onClick={handleLoginRemoto}>Login</button>
                <button className='btnLoginRemoto' onClick={data.volver}>Volver</button>
            </div>
        </div>
    )
}

export default LoginRemoto