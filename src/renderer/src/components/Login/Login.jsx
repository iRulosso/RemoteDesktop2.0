/* eslint-disable prettier/prettier */
import './Login.css';

const Login = () => {
    return (
        <div className='divLoginParent'>
            <h1>Remote Desktop 2.0</h1>
            <div className='divLogin'>
                <label htmlFor="">User:</label>
                <input type="text" />
                <label htmlFor="">Pass:</label>
                <input type="password" />
            </div>
            <button>Login</button>
        </div>
    )
}

export default Login