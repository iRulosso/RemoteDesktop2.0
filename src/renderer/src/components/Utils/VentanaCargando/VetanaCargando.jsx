import React from 'react'
import './VentanaCargando.css'
import { BoxesLoader } from "react-awesome-loaders"

const VetanaCargando = () => {
    return (
        <div className="modal-overlay-cargando">
            <div className="modal-cargando">
                <div className="modal-content-cargando">
                    <h1>Conexion remota...</h1>
                    <BoxesLoader
                        boxColor={"#6366F1"}
                        style={{ marginBottom: "20px" }}
                        desktopSize={"128px"}
                        mobileSize={"80px"}
                    />
                    <button>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default VetanaCargando