import React from 'react';

const FormResults = ({ results }) => {
    if (!results || results.length === 0) {
        return <div></div>;
    }

    return (
        <div>
            <h2>Resultados de la búsqueda</h2>
            {results.map(({ type, data }, index) => (
                <div key={index}>
                    <h3>{type}</h3>
                    <table className="table">
                        <thead>
                        <tr>
                            {Object.keys(data[0]).map((column, columnIndex) => (
                                <th key={columnIndex}>{column}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((result, resultIndex) => (
                            <tr key={resultIndex}>
                                {Object.keys(result).map((column, columnIndex) => (
                                    <td key={columnIndex}>{result[column]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default FormResults;
