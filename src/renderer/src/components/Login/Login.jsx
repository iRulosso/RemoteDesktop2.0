/* eslint-disable prettier/prettier */
import './Login.css';
import { useState } from 'react';
import userIcon from '../../assets/user.png';
import passIcon from '../../assets/pass.png';

const Login = ({ login }) => {

    const [user, setUser] = useState("null");
    const [pass, setPass] = useState("null");
    const [otp, setOtp] = useState("0");

    const argumentos =
    {
        user,
        pass,
        otp
    }

    const handleUser = (e) => setUser(e.target.value);
    const handlePass = (e) => setPass(e.target.value);
    const handleOtp = (e) => setOtp(e.target.value);

    return (
        <div className='divLoginVpn'>
        <h1 className='h1LoginVpn'>VPN Login</h1>
        <div className='formLoginVpn'>
            <div className='divCampoLoginVpn'>
                <img src={userIcon} className='imgLoginVpn' />
                <input  placeholder={"Usuario"} onChange={handleUser} className='inputLoginVpn' type="text" />
            </div>
            <div className='divCampoLoginVpn'>
                <img src={userIcon} className='imgLoginVpn' />
                <input  placeholder={"Contraseña"} onChange={handlePass} className='inputLoginVpn' type="password" />
            </div>
            <div className='divCampoLoginVpn'>
                <img src={passIcon} className='imgLoginVpn' />
                <input  placeholder={"Token (si tiene)"} onChange={handleOtp} className='inputLoginVpn' type="text" />
            </div>
            <button className='btnLoginVpn' onClick={() => login(argumentos)} >Login</button>
            <p className='pLoginVpn'>¿Olvidaste la contraseña?</p>
        </div>
    </div>
    )
}

export default Login