import React, { useState } from 'react'
import './SubBarra.css'
import wspIcon from '../../assets/wsp.png'
import soporteIcon from '../../assets/globo.png'

const SubBarra = () => {

    const [wsp, setWsp] = useState(false);

    const [nuevoMsj, setNuevoMsj] = useState("");
    const [msj, setMsj] = useState([<strong>Soporte:</strong>, "¡Hola! ¿Como podemos ayudarte hoy?"]);

    const handleWsp = () => setWsp(!wsp);
    const handleNuevoMsj = (e) => setNuevoMsj(e.target.value);

    const handleMsj = () => {
        let aux = msj;
        aux.push(<strong>Tú:</strong>, nuevoMsj)
        setMsj(aux);
        console.log(msj);
        setNuevoMsj("");

    }

    return (
        <div className='contenedorSubBarra'>
                <p className='version'>RemoteDesktop2-1.2.0 ©ramiroschulmeister.com</p>
            </div>
    )
}

export default SubBarra