import React from 'react';
import imagen from '../../asset/wallpaper-2.jpeg';
import './banner.css';

function Banner() {
    return (
        <div className="encabezado">
            <div className="encabezado-oscuro" style={{backgroundImage: `url(${imagen})`}}>
                <div className="capa-oscura"></div>
                <h2>Guía de Cursos y Carreras</h2>
                <h4>Te acercamos una herramienta de acceso ordenado a información sobre talleres, cursos y carreras,</h4>
            </div>
        </div>
    );
}

export default Banner;
