import React from 'react';
import imagen from '../../asset/wallpaper-2.jpeg';
import './banner.css';

function Banner() {
    return (
        <div className="emcabezado">
            <div className="emcabezado-oscuro" style={{backgroundImage: `url(${imagen})`}}></div>
            <h2><b>Minerva :</b> Guía de Cursos y Carreras</h2>
            <h4>Te acercamos una herramienta de acceso ordenado a información sobre talleres, cursos y
                carreras,</h4>
            <hr></hr>
        </div>
    );
}

export default Banner;