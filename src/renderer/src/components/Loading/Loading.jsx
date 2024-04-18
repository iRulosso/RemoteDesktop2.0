import React, { useEffect } from 'react';
import naveIcon from '../../assets/rocket.png';
import './Loading.css';

const Loading = ({ data }) => {

    useEffect(() => {
        const estrellas = () => {
            const count = 50;
            const scene = document.querySelector(".divLoading");
            let i = 0;
            while (i < count) {
                const star = document.createElement('i');
                const x = Math.floor(Math.random() * window.innerWidth);

                const duration = Math.random() * 1;
                const h = Math.random() * 100;

                star.style.left = x + 'px';
                star.style.width = 2 + 'px';
                star.style.height = h + 'px';
                star.style.animationDuration = duration + 's';

                scene.appendChild(star);
                i++
            }
        };
        estrellas();
    }, []);

    return (
        <div className='modalLoading'>
            <div className='divLoading'>
                <div className='rocket'>
                    <img src={naveIcon} alt="" />
                </div>
                <h1 className='h1Cargando'>Conectando...</h1>
                <button className='loadingButton' onClick={data.cerrar}>Cancelar</button>
            </div>
        </div>
    )
}

export default Loading;
