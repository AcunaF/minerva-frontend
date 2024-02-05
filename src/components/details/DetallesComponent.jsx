import React, { useState, useEffect } from 'react';

const DetallesComponent = ({ onClose, detallesData, onDetallesClick }) => {
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [botonTexto, setBotonTexto] = useState('Detalles');

    useEffect(() => {
        console.log('DetallesComponent - detallesData:', detallesData);
    }, [detallesData]);

    const handleDetallesClick = () => {
        if (detallesData) {
            setMostrarConfirmacion((prev) => !prev);
            setBotonTexto((prev) => (prev === 'Detalles' ? 'Cerrar Detalles' : 'Detalles'));
            // Llamar a la función proporcionada desde props
            if (typeof onDetallesClick === 'function') {
                onDetallesClick();
            }
        }
    };

    return (
        <div className="detalles-container">
            <button
                type="button"
                className={`btn ${mostrarConfirmacion ? 'btn-danger' : 'btn-primary'}`}
                onClick={handleDetallesClick}
            >
                {botonTexto}
            </button>
            {mostrarConfirmacion && detallesData && Object.keys(detallesData).length > 0 && (
                <div className="detalles-alert alert" role="alert">
                    <h4 className="alert-heading">Detalles de la búsqueda</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Espacio Formativo</th>
                            <th>Área</th>
                            <th>Institución</th>
                            <th>Gestión</th>
                            <th>Modalidad</th>
                            <th>Duración</th>
                            <th>Franja Horaria</th>
                            <th>Nivel</th>
                            <th>Contacto</th>
                            <th>Mail</th>
                            <th>Web</th>
                            <th>Redes</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{detallesData.INSTITUCION || ' '}</td>
                            <td>{detallesData.NOMBRE || ' '}</td>
                            <td>{detallesData.ESPACIO_FORMATIVO || ' '}</td>
                            <td>{detallesData.AREA || ' '}</td>
                            <td>{detallesData.NIVEL || ' '}</td>
                            <td>{detallesData.GESTION || ' '}</td>
                            <td>{detallesData.MODALIDAD || ' '}</td>
                            <td>{detallesData.DURACION || ' '}</td>
                            <td>{detallesData.FRANJA_HORARIA || ' '}</td>
                            <td>{detallesData.CONTACTO || ' '}</td>
                            <td>{detallesData.MAIL || ' '}</td>
                            <td>{detallesData.WEB || ' '}</td>
                            <td>{detallesData.REDES || ' '}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DetallesComponent;
