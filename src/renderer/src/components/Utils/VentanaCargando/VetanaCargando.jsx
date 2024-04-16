import React from 'react'
import './VentanaCargando.css'
import { Blocks } from 'react-loader-spinner'

const VetanaCargando = ({data}) => {
    return (
        <div className="modal-overlay-cargando">
            <div className="modal-cargando">
                <h1 className='h1Cargando'>Escritorio Remoto</h1>
                <div className="modal-content-cargando">
                    <Blocks
                        height="120"
                        width="120"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />
                    <button className='btnCargando' onClick={data.cerrar}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default VetanaCargando