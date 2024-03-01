import React, { useEffect, useState } from 'react';
import './modal.css';

const Modal = ({ detallesData, mostrarDetalles, setMostrarDetalles }) => {
    const [modalClass, setModalClass] = useState('modal');

    const handleOpen = () => {
        console.log('handleOpen called', detallesData);
        setMostrarDetalles(true);
    };

    const handleClose = () => {
        console.log('handleClose called', detallesData);
        setMostrarDetalles(false);
    };
    const formatObject = (obj) => {
        return Object.entries(obj)
            .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
            .join(', ');
    };

    useEffect(() => {
        setModalClass(mostrarDetalles ? 'modal show' : 'modal');
    }, [mostrarDetalles]);

    return (
        <div className={modalClass}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles</h5>
                    </div>
                    <div className="modal-body">
                        {detallesData && detallesData.length > 0 && (
                            <table className="table table-striped">
                                <tbody>

                                {Object.entries(detallesData[0]).map(([key, value], index) => {
                                        const valueToRender = typeof value === 'object' ? JSON.stringify(value) : value;
                                        return (
                                            <tr key={index}>
                                                <td>{key}</td>
                                                <td>{valueToRender}</td>
                                            </tr>
                                        );

                                })}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

/*{Object.entries(detallesData).map(([key, value], index) => {
                                    const valueToRender =
                                        formatObject(value) ;

                                    return (
                                        <tr key={index}>
                                            <td>{valueToRender}</td>
                                        </tr>
                                    );
                                })}*/