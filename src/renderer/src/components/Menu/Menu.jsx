import React from 'react'
import './Menu.css'
import allariaicon from '../../assets/logo.png'

const Menu = () => {
  return (
    <div>
      <h1>Elegir empresa</h1>
      <div className='divLogos'>
        <img className='imgLogo' src={allariaicon} alt="" />
        <img className='imgLogo' src={allariaicon} alt="" />
        <img className='imgLogo' src={allariaicon} alt="" />
        <img className='imgLogo' src={allariaicon} alt="" />
      </div>
    </div>
  )
}

export default Menu