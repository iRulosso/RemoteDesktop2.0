import React from 'react'
import './Menu.css'
import allariaicon from '../../assets/allaria.png'
import alfaIcon from '../../assets/ALFA.png'
import arpyIcon from '../../assets/ARPY.png'
import alfyIcon from '../../assets/ALFY.png'

const Menu = ({data}) => {

  return (
    <div className='divMenu'>
      <h1 className='h1Menu'>Seleccione Empresa</h1>
      <div className='divLogos'>
        <img className='imgLogo' onClick={()=>data.elegir("allaria")} src={allariaicon} alt="" />
        <img className='imgLogo' onClick={()=>data.elegir("alfa")} src={alfaIcon} alt="" />
        <img className='imgLogo' onClick={()=>data.elegir("arpy")} src={arpyIcon} alt="" />
        <img className='imgLogo' onClick={()=>data.elegir("alfy")} src={alfyIcon} alt="" />
      </div>
    </div>
  )
}

export default Menu