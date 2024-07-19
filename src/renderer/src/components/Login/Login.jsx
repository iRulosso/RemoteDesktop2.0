/* eslint-disable prettier/prettier */
import './Login.css';
import { useState } from 'react';
import userIcon from '../../assets/user.png';
import passIcon from '../../assets/pass.png';
import tokenIcon from '../../assets/token.png';
import vpnIcon from '../../assets/vpn.png';
import Ventana from '../Utils/Ventana/Ventana';
import Tutorial from '../Utils/Tutorial/Tutorial';

const Login = ({setLogged}) => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [otp, setOtp] = useState("0");
    const [vpn, setVpn] = useState('359');

    const [tutorial, setTutorial] = useState(false);
    const handleTutorial = () => setTutorial(!tutorial);

    const [camposVacios, setCamposVacios] = useState(false);

    const argumentos =
    {
        user,
        pass,
        otp,
        vpn
    }

    const handleVpn = (event) => setVpn(event.target.value);
    const handleUser = (e) => {setUser(e.target.value);setCamposVacios(false);}
    const handlePass = (e) => {setPass(e.target.value);setCamposVacios(false);}
    const handleOtp = (e) => setOtp(e.target.value);
    
    const [error, setError] = useState(false);
    const [errorMsj, setErrorMsj] = useState("error");
    const [errorTipo, setErrorTipo] = useState(false); //0 = OK, 1 == error

    const handleError = () => setError(false);
    let objError =
    {
        tipo: errorTipo,
        texto: errorMsj,
        cerrar: handleError
    }

    const HandleLogin = (argumentos) => {

        setCamposVacios(false);

        if (user === "" || pass === "") {
            setCamposVacios(true);
            return
        }

        const respuesta = window.electron.ipcRenderer.sendSync("forti-login", argumentos)
        console.log(respuesta);
        if (respuesta === true) setLogged(true);
        else {
            setError(true);
            setErrorTipo(true);
            setErrorMsj("Error al conectar la VPN.");
        }
    }

    const handleOlvidePass = () => {
        window.electron.ipcRenderer.send("abrir-app", "google-chrome unlock.allaria.com.ar");
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          HandleLogin(argumentos);
        }
      };

    return (
        <div className='divLoginVpn'>
            <h1 className='h1LoginVpn'>Forti VPN</h1>
            <div className='formLoginVpn'>
                <div className='divCampoLoginVpn'>
                    <img src={vpnIcon} className='imgSelectVpn' />
                    <select className='selectLogin' name="select" onChange={handleVpn}>
                        <option value="359" selected>Allaria 359</option>
                        <option value="277">Allaria 277</option>
                        <option value="hc">Allaria HC</option>
                    </select>
                </div>
                <div className='divCampoLoginVpn'>
                    <img src={userIcon} className='imgLoginVpn' />
                    <input onKeyDown={handleKeyPress} placeholder={"Usuario"} onChange={handleUser} className={camposVacios ? 'inputLoginVpnError' : 'inputLoginVpn'} type="text" />
                </div>
                <div className='divCampoLoginVpn'>
                    <img src={passIcon} className='imgLoginVpn' />
                    <input onKeyDown={handleKeyPress} placeholder={"Contraseña"} onChange={handlePass} className={camposVacios ? 'inputLoginVpnError' : 'inputLoginVpn'} type="password" />
                </div>
                <div className='divCampoLoginVpn'>
                    <img src={tokenIcon} className='imgLoginVpn' />
                    <input onKeyDown={handleKeyPress} placeholder={"Forti Token (Si requiere)"} onChange={handleOtp} className='inputLoginVpn' type="text" />
                </div>
                {camposVacios ? <p className='pCamposError'>¡Debe completar todos los campos!</p> : null}
                <button className='btnLoginVpn' onClick={() => HandleLogin(argumentos)} >Login</button>
                <p className='pLoginVpn' onClick={handleTutorial}>¿No sabes conectearte? Haz click aqui</p>
                <p className='pLoginVpn' onClick={handleOlvidePass}>¿Olvidaste la contraseña?</p>
            </div>
            {error ? <Ventana data={objError} /> : null}
            {tutorial ? <Tutorial tutorial={1} cerrar={handleTutorial}/>:null}
        </div>
    )
}

export default Login