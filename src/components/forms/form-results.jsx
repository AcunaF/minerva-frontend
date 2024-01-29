import React, { useState } from 'react';
import DetallesComponent from '../details/DetallesComponent';  // Ajusta la ruta según tu estructura de carpetas

const FormResults = ({ results, show }) => {
    const columnasAMostrar = [
        'NOMBRE',
        'ESPACIO_FORMATIVO',
        'NIVEL',
        'INSTITUCION',
        'DATOS',
        'DOMICILIO',
        'AREA_1',
    ];

    const [selectedDetails, setSelectedDetails] = useState(null);

    const handleDetallesClick = (result) => {
        setSelectedDetails(result);
    };

    return (
        <div>
            <h2>Resultados de la búsqueda</h2>
            {show && results.map(({ type, data }, index) => (
                <div key={type}>
                    <h3>{`Resultados de ${type}`}</h3>
                    {data ? (
                        <table className="table">
                            <thead>
                            <tr>
                                {columnasAMostrar.map((columna) => (
                                    <th key={columna}>{columna}</th>
                                ))}
                                <th>DETALLES</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((result, resultIndex) => (
                                    <tr key={`${type}-${resultIndex}`}>
                                        {columnasAMostrar.map((columna) => (
                                            <td key={`${type}-${resultIndex}-${columna}`}>
                                                {result[columna]}
                                            </td>
                                        ))}
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => handleDetallesClick(result)}
                                            >
                                                Detalles
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
                        <p>{`No hay resultados de ${type} para mostrar.`}</p>
                    )}
                </div>
            ))}

            {/* Mostrar DetallesComponent si se ha seleccionado un detalle */}
            {selectedDetails && (
                <DetallesComponent detallesData={selectedDetails} onClose={() => setSelectedDetails(null)} />
            )}
        </div>
    );
};

export default FormResults;
