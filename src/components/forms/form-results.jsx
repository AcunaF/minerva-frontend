import React, { useState, useEffect } from 'react';
import DetallesComponent from '../details/DetallesComponent';

const apiUrl = 'http://localhost:1521/api/';

const FormResults = ({ results, show, formData, searchType, onReset, onSearch  }) => {
    const columnasAMostrar = [
        'INSTITUCION',
        'AREA_1',
        'SUBAREA_1',
        'GESTION',
        'MODALIDAD',
        'ESPACIO_FORMATIVO',
    ];

    const [detallesData, setDetallesData] = useState(null);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const resetDetalles = () => {
        setDetallesData(null);
        setMostrarDetalles(false);
    };

    const fetchDetails = async (result) => {
        try {
            const { nombre, espacioFormativo, nivel, institucion, domicilio, area } = result;

            const queryParams = new URLSearchParams({
                nombre: nombre || '',
                espacioFormativo: espacioFormativo || '',
                nivel: nivel || '',
                institucion: institucion || '',
                domicilio: domicilio || '',
                area: area || '',
            }).toString();

            const response = await fetch(`${apiUrl}details?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }

            const data = await response.json();
            setDetallesData(data);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    const handleDetallesClick = (result) => {
        // Si ya se está mostrando el detalle, cierra los detalles
        if (detallesData) {
            setDetallesData(null);
            setMostrarDetalles(false);
        } else {
            // Si no se está mostrando el detalle, abre los detalles
            const criteria = {
                nombre: result.nombre || '',
                espacioFormativo: result.espacioFormativo || '',
                nivel: result.nivel || '',
                institucion: result.institucion || '',
                domicilio: result.domicilio || '',
                area: result.area || '',
            };
            fetchDetails(criteria);
            setMostrarDetalles(true);
        }
    };

    const handleCloseDetalles = () => {
        setDetallesData(null);
        setMostrarDetalles(false);
        resetDetalles();
    };

    return (
        <div>
            {show &&
                results.map(({ type, data }, index) => (
                    <div key={type}>
                        {data ? (
                            <table className="table">
                                <tbody>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((result, resultIndex) => (
                                        <tr key={`${type}-${resultIndex}`}>
                                            {columnasAMostrar.map((columna) => (
                                                <td key={`${type}-${resultIndex}-${columna}`}>
                                                    {columna === 'SUBAREA' && result.SUBAREA}
                                                    {columna === 'AREA' && result.AREA}
                                                    {columna !== 'SUBAREA' && columna !== 'AREA' && result[columna]}
                                                </td>
                                            ))}
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => handleDetallesClick(result)}
                                                >
                                                    Mas
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

            {/* Mostrar DetallesComponent si hay detallesData */}
            {detallesData && (
                <DetallesComponent detallesData={detallesData} onClose={handleCloseDetalles} />
            )}
        </div>
    );
};

export default FormResults;
