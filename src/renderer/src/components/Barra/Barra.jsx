import React, { useState } from 'react'
import anyIcon from '../../assets/any.png'
import googleIcon from '../../assets/google.png'
import settingIcon from '../../assets/setting.png'
import salirIcon from '../../assets/salir.png'
import wifiIcon from '../../assets/wifi.png'
import './Barra.css'

const Barra = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [wifi, setWifi] = useState(false);

  const handleOpenApp = (command) => {
    window.electron.ipcRenderer.send("abrir-app", command);
  }
  window.electron.ipcRenderer.removeAllListeners('ping-si');
  window.electron.ipcRenderer.removeAllListeners('ping-no');
  window.electron.ipcRenderer.on('ping-si', (event, message) => {
    setWifi(true);
    console.log("hay ping");
  });
  window.electron.ipcRenderer.on('ping-no', (event, message) => {
    setWifi(false);console.log("no hay ping");
  });

  return (
    <div className='barra'>
      <div className='divBarraIconos'>
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("gnome-control-center")} src={settingIcon} alt="" />
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("anydesk")} src={anyIcon} alt="" />
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("google-chrome")} src={googleIcon} alt="" />
        <div style={{display:"flex",alignItems:"center"}}>
          <img className="botonAccion" src={wifiIcon}/>
          <p style={wifi?{fontSize:24,fontWeight:"bold",color:"green"}:{fontSize:24,fontWeight:"bold",color:"red"}}>{wifi?"CONECTADO":"SIN INTERNET"}</p>
        </div>
      </div>
      <div className='panelDerechoBarra'>
        <img className="botonAccion" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => handleOpenApp("shutdown -h 0")} src={salirIcon} alt="" />
      </div>
    </div>
  )
}

export default Barra