import React, { useEffect } from 'react';

const Modal = ({ detallesData,  mostrarDetalles, setMostrarDetalles }) => {

    const handleOpen = () => {
        console.log('modal abierto');
        setMostrarDetalles(true);
    };
    const handleClose = () => {
        setMostrarDetalles(false);
    };

    useEffect(() => {
        const modalElement = document.querySelector('.modal');
        if (modalElement) {
            if (mostrarDetalles) {
                modalElement.classList.add('show');
            } else {
                modalElement.classList.remove('show');
            }
        }
    }, [mostrarDetalles]);

    if (!mostrarDetalles) {
        return null;
    }
    return (
        <div className={`modal ${mostrarDetalles ? 'show' : ''}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles</h5>
                        <button type="button" className="btn-close" onClick={handleOpen}></button>

                    </div>

                    <div className="modal-body">
                        {detallesData && Object.entries(detallesData).map(([key, value], index) => (
                            <p key={index}>{`${key}: ${value}`}</p>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;