import React from 'react';

const ResultadosBusqueda = ({ results, selectedInstitution }) => {
    const columnasAMostrar = [
        'NOMBRE',
        'ESPACIO_FORMATIVO',
        'INSTITUCION',
        'GESTION',
        'MODALIDAD',
        'AREA_1',
        'SUBAREA_1',
        'DURACION',
    ];

    console.log('Results:', results);

    return (
        <div>
            <h2>Resultados de la búsqueda</h2>
            {Array.isArray(results) && results.length > 0 ? (
                results.map(({ type, data }, index) => (
                    <div key={index}>
                        <h3>{`Resultados de ${type}`}</h3>
                        {data ? (
                            <table className="table">
                                <thead>
                                <tr>
                                    {columnasAMostrar.map((columna, columnIndex) => (
                                        <th key={columna}>{columna}</th>
                                    ))}
                                    {selectedInstitution && <th>Institución</th>}
                                </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((result, resultIndex) => (
                                        <tr key={resultIndex}>
                                            {columnasAMostrar.map((columna) => (
                                                <td key={`${resultIndex}-${columna}`}>{result[columna]}</td>
                                            ))}
                                            {selectedInstitution && (
                                                <td key={`${resultIndex}-institucion`}>{selectedInstitution.DISPLAY_VALUE}</td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columnasAMostrar.length + (selectedInstitution ? 1 : 0)}>
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
                ))
            ) : (
                <p>No hay resultados para mostrar.</p>
            )}
        </div>
    );
};

export default ResultadosBusqueda;
