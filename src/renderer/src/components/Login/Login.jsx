/* eslint-disable prettier/prettier */
import './Login.css';
import { useState } from 'react';

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
        <div className='divLoginParent'>
            <h1>Remote Desktop 2.0</h1>
            <div className='divLogin'>
                <div style={{ display: "flex" }}>
                    <label htmlFor="">User:</label>
                    <input style={{marginLeft:10}} onChange={handleUser} type="text" />
                </div>
                <div style={{ display: "flex" }}>
                    <label htmlFor="">Pass:</label>
                    <input style={{marginLeft:11}}  onChange={handlePass} type="password" />
                </div>
                <div style={{ display: "flex" }}>
                    <label htmlFor="">Token:</label>
                    <input onChange={handleOtp} type="number" />
                </div>
            </div>
            <button onClick={() => login(argumentos)} >Login</button>
        </div >
    )
}

export default Login