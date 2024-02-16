import React from 'react';
import '../modal/modal.css';

const Modal = ({detallesData, onClose, mostrarDetalles}) => {
    if (!mostrarDetalles || !detallesData) {
        return null;
    }
    return (
        <div className ="container-fluid">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {Object.keys(detallesData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {detallesData.map((detalle, index) => (
                            <tr key={index}>
                                {Object.values(detalle).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Modal;