import React, { useState } from 'react';

const DetallesComponent = ({ onClose, detallesData }) => {
    const [formDataDetail, setFormDataDetail] = useState({
        "id": detallesData.id,
        "nombre": detallesData.nombre,
        "espacioFormativo": detallesData.espacioFormativo,
        "nivel": detallesData.nivel,
        "institucion": detallesData.institucion,
        "gestion": detallesData.gestion,
        "modalidad": detallesData.modalidad,
        "duracion": detallesData.duracion,
        "franjaHoraria": detallesData.franjaHoraria,
        "domicilio": detallesData.domicilio,
        "contacto": detallesData.contacto,
        "mail": detallesData.mail,
        "web": detallesData.web,
        "redes": detallesData.redes,
        "titulo": detallesData.titulo,
        "area": detallesData.area
    });

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [botonTexto, setBotonTexto] = useState('Detalles');

    const handleDetallesClick = () => {
        // Muestra el mensaje de confirmación y actualiza el texto del botón
        setMostrarConfirmacion(true);
        setBotonTexto('Cerrar Detalles');
    };

    return (
        <div>
            {/* Botón para cerrar detalles o mostrar el mensaje de confirmación */}
            <button
                type="button"
                className="btn btn-primary"
                onClick={mostrarConfirmacion ? onClose : handleDetallesClick}
            >
                {botonTexto}
            </button>

            {/* Muestra el mensaje de confirmación si está activo */}
            {mostrarConfirmacion && (
                <div className="alert alert-success" role="alert">
                    ¡Anda pero no! Mensaje de confirmación.

                </div>
            )}
        </div>
    );
};

export default DetallesComponent;
