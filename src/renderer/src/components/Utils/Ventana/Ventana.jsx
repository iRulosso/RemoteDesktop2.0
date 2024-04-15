import React from 'react'
import './Ventana.css'
import errorIcon from '../../../assets/error.png'

const Ventana = ({ data }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <div style={{display:"flex"}}>
                        {data.tipo ? (<img className='errorVentanaIcon' src={errorIcon} />) : null}
                        <p className='pVentana'>{data.texto}</p>
                    </div>
                    <button className='btnVentana' onClick={data.cerrar}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Ventana