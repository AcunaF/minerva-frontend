import React, { useState } from 'react';
import Modal from "../modal/modal.jsx";

const apiUrl = 'http://localhost:1521/api/';

const FormResults = ({ results, show, handleDetallesClick }) => {
    const [detallesData, setDetallesData] = useState(null);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [resultIndex, setResultIndex] = useState(null);

    const resetDetalles = () => {
        setDetallesData(null);
        setMostrarDetalles(false);
        setResultIndex(null);
    };

    const handleCloseDetalles = () => {
        resetDetalles();
    };

    return (
        <div>
            {show && results.map(({ type, data }, index) => (
                <div key={type}>
                    {data ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    {Object.keys(data[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            No se pudo obtener la información de los resultados.
                        </div>
                    )}
                    {mostrarDetalles && resultIndex === index && (
                        <Modal
                            detallesData={detallesData}
                            onClose={handleCloseDetalles}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default FormResults;