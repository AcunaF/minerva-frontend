import React from 'react';

const FormResults = ({ results, show }) => {
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
            {show && results.map(({ type, data }, index) => (
                <div key={index}>
                    <h3>{`Resultados de ${type}`}</h3>
                    {data ? (
                        <table className="table">
                            <thead>
                            <tr>
                                {columnasAMostrar.map((columna, columnIndex) => (
                                    <th key={columna}>{columna}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((result, resultIndex) => (
                                    <tr key={resultIndex}>
                                        {columnasAMostrar.map((columna) => (
                                            <td key={`${resultIndex}-${columna}`}>{result[columna]}</td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columnasAMostrar.length}>
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
        </div>
    );
};

export default FormResults;
