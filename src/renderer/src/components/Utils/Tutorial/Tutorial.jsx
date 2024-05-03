import React from 'react'
import './Tutorial.css'
import foto1 from '../../../assets/tuto1.png'
import foto2 from '../../../assets/tuto2.png'
import foto3 from '../../../assets/tuto3.png'
import foto4 from '../../../assets/tuto4.png'
import foto5 from '../../../assets/tuto5.png'
import foto6 from '../../../assets/tuto6.png'

const Tutorial = ({ tutorial, cerrar }) => {
    return (
        <div onClick={cerrar} className="modal-overlayTuto">
            <div className="modalTuto">
                <div className="modal-contentTuto">
                    {tutorial === 1?
                        (
                            <div>
                                <h1 className='tituloTutorial'>¡Ayuda!</h1>
                                <p className='pTutorial'>
                                    Instrucciones para entrar a la vpn <br />
                                    <b>1.</b> Primero debera elegir la vpn, 359 o HC <br /> segun te corresponda. <br />
                                    <img src={foto1} alt="" /><br />
                                    <b>2.</b>  Debera utilizar usuario y contraseña de <br />forti (misma que la del remoto)<br />
                                    <img src={foto2} alt="" /><br />
                                    <b>3.</b>  Si su cuenta posee token, debera ingresar <br />
                                    a la aplicacion "forti token" e ingresarlo en el<br />
                                    campo "Token".<br />
                                    <img src={foto3} alt="" /><br />
                                    <img src={foto4} alt="" /><br />
                                    <b>4.</b>  Darle a "Login", en caso de error lo podra ver.
                                </p>
                            </div>
                        ):
                        (
                            <div>
                                <h1 className='tituloTutorial'>¡Ayuda!</h1>
                                <p className='pTutorial'>
                                    Instrucciones para entrar al remoto <br />
                                    <b>1.</b> Primero debera colocar su nombre de remoto <br />por ejemplo "hw-sistemas-3" o IP "172.2x.x.x". <br />
                                    <img src={foto5} alt="" /><br />
                                    <b>2.</b>  Debera utilizar usuario y contraseña de <br />remoto (misma que la del forti)<br />
                                    <br />
                                    <b>3.</b>  Darle a "Login". Iniciara el intento de conexion
                                    <br /> al remoto, espere pacientemente, en caso de
                                    <br />   error lo vera detallado. <br />
                                    <img className='fotoTuto' src={foto6} alt="" />
                                </p>
                            </div>
                        )
                    }
                    <button className='cerrarBtnTuto'>Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default Tutorial