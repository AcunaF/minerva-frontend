import React, { useState } from 'react';
import DetallesComponent from '../details/DetallesComponent';
import Modal from "../modal/modal";

const apiUrl = 'http://localhost:1521/api';

const FormResults = ({ results, show, handleDetallesClick }) => {
    const columnasAMostrar = [
        'INSTITUCION',
        'AREA_1',
        'SUBAREA_1',
        'GESTION',
        'MODALIDAD',
        'ESPACIO_FORMATIVO',
        'DURACION',
        'FRANJA_HORARIA',

    ];

    const [detallesData, setDetallesData] = useState(null);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [resultIndex, setResultIndex] = useState(null);  // Nuevo estado para almacenar resultIndex

    const resetDetalles = () => {
        setDetallesData(null);
        setMostrarDetalles(false);
        setResultIndex(null);  // Restablecer resultIndex al cerrar los detalles
    };

    const fetchDetails = async (formDataDetail, index) => {
        try {
            const detailsUrl = `/details?institucion=${encodeURIComponent(formDataDetail.INSTITUCION)}&area=${encodeURIComponent(formDataDetail.AREA_1)}&subarea=${encodeURIComponent(formDataDetail.SUBAREA_1)}&espacioFormativo=${encodeURIComponent(formDataDetail.ESPACIO_FORMATIVO)}&modalidad=${encodeURIComponent(formDataDetail.MODALIDAD)}&franjaHoraria=${encodeURIComponent(formDataDetail.FRANJA_HORARIA)}&gestion=${encodeURIComponent(formDataDetail.GESTION)}&nombre=${encodeURIComponent(formDataDetail.NOMBRE || '')}`;
       //   const filterParams = `institucion=${formData.Institution}&area=${formData.Area}&subArea=${formData.subArea}&modalidad=${formData.modalidad}&espacioFormativo=${formData.espacioFormativo}&franjaHoraria=${formData.franjaHoraria}&gestion=${formData.gestion}&duracion=${formData.duracion}`;
            const response = await fetch(`${apiUrl}/${detailsUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error al obtener detalles: ${response.status}`);
            }

            const data = await response.json();
            setDetallesData(data);
            setResultIndex(index);
            handleDetallesClick(data);
            console.log('Detalles:', data);
            setResultIndex(index);  // Almacenar resultIndex cuando se abren los detalles
            console.log('resultIndex:', index);
        } catch (error) {
            console.error('Error fetching details:', error.message);

        }
    };

    const handleCloseDetalles = () => {

        resetDetalles();
    };

    return (

        <div>
            {show && results.map(({type, data}, index) => (
                <div key={type}>
                    {data ? (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                {columnasAMostrar.map((columna) => (
                                    <th key={columna}>{columna}</th>
                                ))}
                                <th>Mas Inf.</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((formDataDetail, resultIndex) => (
                                    <tr key={`${type}-${resultIndex}`}>
                                        {columnasAMostrar.map((columna) => (
                                            <td key={columna}>
                                                {columna === 'SUBAREA_1' ? formDataDetail.SUBAREA_1 : columna === 'AREA_1' ? formDataDetail.AREA_1 : formDataDetail[columna]}
                                            </td>
                                        ))}
                                        <td>
                                            <button
                                                type="button"
                                                className={`btn btn-primary btn-sm ${mostrarDetalles && resultIndex === index ? 'active' : ''}`}
                                                onClick={() => {
                                                    if (mostrarDetalles && resultIndex === index) {
                                                        resetDetalles();
                                                    } else {
                                                        fetchDetails(formDataDetail, index);
                                                        setMostrarDetalles(true);
                                                    }
                                                }}>
                                                {mostrarDetalles && resultIndex === index ? "Menos" : "Más"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columnasAMostrar.length + 1}>
                                        No hay resultados para mostrar.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            No se pudo obtener la información de los resultados.
                        </div>
                    )}
                </div>
            ))}
            <Modal
                detallesData={detallesData}
                onClose={handleCloseDetalles}
                mostrarDetalles={mostrarDetalles}
            />
        </div>
    );
};

export default FormResults;

