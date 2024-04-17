import React from 'react'
import anyIcon from '../../assets/any.png'
import googleIcon from '../../assets/google.png'
import settingIcon from '../../assets/setting.png'
import './Barra.css'

const Barra = () => {
  return (
    <div className='divBarraIconos'>
                <img className="botonAccion" src={settingIcon} alt="" />
        <img className="botonAccion" src={anyIcon} alt="" />
        <img className="botonAccion" src={googleIcon} alt="" />
    </div>
  )
}

export default Barra