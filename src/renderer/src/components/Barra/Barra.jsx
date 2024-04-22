import React, { useState } from 'react'
import anyIcon from '../../assets/any.png'
import googleIcon from '../../assets/google.png'
import settingIcon from '../../assets/setting.png'
import salirIcon from '../../assets/salir.png'
import './Barra.css'

const Barra = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenApp = (command) => {
    window.electron.ipcRenderer.send("abrir-app", command);
  }

  return (
    <div className='barra'>
      <div className='divBarraIconos'>
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("gnome-control-center")} src={settingIcon} alt="" />
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("anydesk")} src={anyIcon} alt="" />
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("google-chrome")} src={googleIcon} alt="" />
      </div>
      <div className='panelDerechoBarra'>
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("gnome-control-center")} src={salirIcon} alt="" />
      </div>
    </div>
  )
}

export default Barra