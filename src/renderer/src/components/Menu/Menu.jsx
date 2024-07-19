import React, { useState } from 'react'
import './Menu.css'
import allariaicon from '../../assets/allaria.png'
import alfaIcon from '../../assets/ALFA.png'
import arpyIcon from '../../assets/ARPY.png'
import alfyIcon from '../../assets/ALFY.png'

const Menu = ({data}) => {

  const [pc, setPc] = useState(false);
  window.electron.ipcRenderer.removeAllListeners('forti-no');
  window.electron.ipcRenderer.on('forti-no', (event, message) => {
      setPc(true);
  });
  window.electron.ipcRenderer.removeAllListeners('forti-si');
  window.electron.ipcRenderer.on('forti-si', (event, message) => {
      setPc(false);
  });

  const handleOpenApp = () => {
    window.electron.ipcRenderer.send("cerrar-forti");
    data.cerrar();
  }

  return (
    <div className='divMenu'>
      <h1 className='h1Menu'>Seleccione Empresa</h1>
      <div className='divLogos'>
        <img className='imgLogo' onClick={()=>data.elegir("allaria")} src={allariaicon} alt="" />
        <img className='imgLogo' onClick={()=>data.elegir("alfa")} src={alfaIcon} alt="" />
        <img className='imgLogo' onClick={()=>data.elegir("arpy")} src={arpyIcon} alt="" />
        <img className='imgLogo' onClick={()=>data.elegir("alfy")} src={alfyIcon} alt="" />
      </div>
      {pc ? null:<button className='desconectarVpn' onClick={handleOpenApp}>Desconectar VPN</button>}
    </div>
  )
}

export default Menu