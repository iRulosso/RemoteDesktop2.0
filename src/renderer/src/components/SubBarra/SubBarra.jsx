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
        <div>
            <div className='contenedorSubBarra'>
                <div>
                    <p className='version'>RemoteDesktop2_alpha-0.5.3 ©ramiroschulmeister.com</p>
                </div>
                <div className='derechaBarra'>
                    {/*<div className='wspDiv'>
                        {//<img className="imgSoporte" src={soporteIcon} alt="" />
                        }
                        <img onClick={handleWsp} className='imgWsp' src={wspIcon} alt="" />
                    </div>*/}
                </div>
            </div>
            {
                wsp ?
                    (
                        <div className='Chatwsp'>
                            <div className='divWspChat'>
                                <h1 className='h1Wsp'>Soporte</h1>
                                <div className='divChat'>
                                    <div className='chat'>
                                        {msj.map((text, index) => (
                                            <p className='pChat' key={index}>{text}</p>
                                        ))}
                                    </div>
                                    <div className='escribirMsj'>
                                        <input onChange={handleNuevoMsj} className='inptWsp' type="text" />
                                        <button onClick={handleMsj} className='btnWsp'>Enviar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
            }
        </div>
    )
}

export default SubBarra