import React, { useState } from 'react';

const DetallesComponent = ({ onClose, detallesData }) => {
    const [formDataDetail, setFormDataDetail] = useState({
        "nombre": detallesData.nombre || '',
        "espacioFormativo": detallesData.espacioFormativo || '',
        "area": detallesData.area || '',
        "nivel": detallesData.nivel || '',
        "institucion": detallesData.institucion || '',
        "gestion": detallesData.gestion || '',
        "modalidad": detallesData.modalidad || '',
        "duracion": detallesData.duracion || '',
        "franjaHoraria": detallesData.franjaHoraria || '',
        "contacto": detallesData.contacto || '',
        "mail": detallesData.mail || '',
        "web": detallesData.web || '',
        "redes": detallesData.redes || '',
        "titulo": detallesData.titulo || '',
    });

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [botonTexto, setBotonTexto] = useState('Detalles');

    const handleDetallesClick = () => {
        setMostrarConfirmacion(!mostrarConfirmacion);
        setBotonTexto(mostrarConfirmacion ? 'Detalles' : 'Cerrar Detalles');
    };

    return (
        <div className="detalles-container">
            <button
                type="button"
                className={`btn ${mostrarConfirmacion ? 'btn-primary' : 'btn-primary'}`}
                onClick={handleDetallesClick}
            >
                {botonTexto}
            </button>

            {/* Muestra el mensaje de confirmación si está activo */}
            {mostrarConfirmacion && (
                <div className="detalles-alert alert " role="alert">
                    <h4 className="alert-heading">Detalles de la búsqueda</h4>
                    {/* Renderiza los detalles en una tabla */}
                    <table className="table table-striped">
                        <tbody>
                        {Object.entries(formDataDetail).map(([key, value]) => (
                            <tr key={key}>
                                <td className="detalles-key"><strong>{key}:</strong></td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DetallesComponent;
