import React, { useState,useEffect } from 'react';
import DetallesComponent from '../details/DetallesComponent';
import Modal from "../modal/modal";

const apiUrl = 'http://localhost:1521/api/';

const FormResults = ({ results, show,handleDetallesClick }) => {

    const [detallesData, setDetallesData] = useState(null);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [resultIndex, setResultIndex] = useState(null);

    const columnasAMostrar = [
        'NOMBRE',
        'INSTITUCION',
        'AREA_1',
        'ESPACIO_FORMATIVO',
        'NIVEL',
        'CALLE',
    ];

    const openDetalles   = () => {
        if (detallesData !== null) {
            setMostrarDetalles(true);
        }
    };
    const resetDetalles = () => {
        setDetallesData(null);
        setMostrarDetalles(false);
        setResultIndex(null);
    };

    const fetchDetails = async (formDataDetail, index) => {
        try {
            const detailsUrl = `details?institucion=${encodeURIComponent(formDataDetail.INSTITUCION)}&area=${encodeURIComponent(formDataDetail.AREA_1)}&subarea=${encodeURIComponent(formDataDetail.SUBAREA_1)}&espacioFormativo=${encodeURIComponent(formDataDetail.ESPACIO_FORMATIVO)}&modalidad=${encodeURIComponent(formDataDetail.MODALIDAD)}&franjaHoraria=${encodeURIComponent(formDataDetail.FRANJA_HORARIA)}&gestion=${encodeURIComponent(formDataDetail.GESTION)}&nombre=${encodeURIComponent(formDataDetail.NOMBRE || '')}`;
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
            console.log('fetchDetail (Data) desde form-result:', data);

            setResultIndex(index);
            setMostrarDetalles(true);
        } catch (error) {
            console.error('Error fetching details:', error.message);
        }
    };

    useEffect(() => {
        console.log('mostrarDetalles updated en :', mostrarDetalles,'detalles',detallesData);
    }, [mostrarDetalles]);

    return (
        <div className = "table-responsive" >
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
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    fetchDetails(formDataDetail, index);
                                                    openDetalles();
                                                }}>
                                                Más
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <p></p>
                            )}
                            </tbody>
                        </table>
                    ) : (
                        <p></p>
                    )}
                </div>
            ))}
            {mostrarDetalles && <Modal detallesData={detallesData} mostrarDetalles={mostrarDetalles} setMostrarDetalles={setMostrarDetalles} />}       </div>
    );
};

export default FormResults;