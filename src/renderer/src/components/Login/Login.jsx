/* eslint-disable prettier/prettier */
import './Login.css';
import { useState } from 'react';
import userIcon from '../../assets/user.png';
import passIcon from '../../assets/pass.png';
import tokenIcon from '../../assets/token.png';
import vpnIcon from '../../assets/vpn.png';

const Login = ({ login }) => {

    const [user, setUser] = useState("null");
    const [pass, setPass] = useState("null");
    const [otp, setOtp] = useState("0");
    const [vpn, setVpn] = useState('359');

    const argumentos =
    {
        user,
        pass,
        otp
    }
    const handleSelectChange = (event) => setSelectedValue(event.target.value);
    const handleUser = (e) => setUser(e.target.value);
    const handlePass = (e) => setPass(e.target.value);
    const handleOtp = (e) => setOtp(e.target.value);

    return (
        <div className='divLoginVpn'>
            <h1 className='h1LoginVpn'>VPN Login</h1>
            <div className='formLoginVpn'>
                <div className='divCampoLoginVpn'>
                    <img src={vpnIcon} className='imgSelectVpn' />
                    <select className='selectLogin' name="select" onChange={handleSelectChange}>
                        <option value="359" selected>Allaria 359</option>
                        <option value="277">Allaria 277</option>
                        <option value="hc">Allaria HC</option>
                    </select>
                </div>
                <div className='divCampoLoginVpn'>
                    <img src={userIcon} className='imgLoginVpn' />
                    <input placeholder={"Usuario"} onChange={handleUser} className='inputLoginVpn' type="text" />
                </div>
                <div className='divCampoLoginVpn'>
                    <img src={passIcon} className='imgLoginVpn' />
                    <input placeholder={"Contraseña"} onChange={handlePass} className='inputLoginVpn' type="password" />
                </div>
                <div className='divCampoLoginVpn'>
                    <img src={tokenIcon} className='imgLoginVpn' />
                    <input placeholder={"Forti Token (Si requiere)"} onChange={handleOtp} className='inputLoginVpn' type="text" />
                </div>
                <button className='btnLoginVpn' onClick={() => login(argumentos)} >Login</button>
                <p className='pLoginVpn'>¿Olvidaste la contraseña?</p>
            </div>
        </div>
    )
}

export default Login