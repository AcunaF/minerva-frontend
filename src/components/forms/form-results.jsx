import React from 'react';

const FormResults = ({ results }) => {
    if (!results || results.length === 0) {
        return <div>No hay resultados para mostrar.</div>;
    }

    return (
        <div>
            <h2>Resultados de la búsqueda</h2>
            {results.map(({ type, data }, index) => (
                <div key={index}>
                    <h3>{type}</h3>
                    {data && data.resultados && data.resultados.length > 0 ? (
                        <table className="table">
                            <thead>
                            <tr>
                                {data.resultados[0] && Object.keys(data.resultados[0]).map((column, columnIndex) => (
                                    <th key={columnIndex}>{column}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {data.resultados.map((result, resultIndex) => (
                                <tr key={resultIndex}>
                                    {Object.keys(result).map((column, columnIndex) => (
                                        <td key={columnIndex}>{result[column]}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay resultados para mostrar.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FormResults;
