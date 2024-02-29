import React, {useEffect} from 'react';

const Modal = ({ detallesData, mostrarDetalles, setMostrarDetalles }) => {

    const handleClose = () => {
        console.log('handleClose called');
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
                        {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>*/}
                        <button type="button" className="close" onClick={handleClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {detallesData &&
                            <table>
                                <thead>
                                <tr>
                                    {Object.keys(detallesData).map((key, index) => (
                                        <th key={index}>{key}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {Object.values(detallesData).map((value, index) => (
                                        <td key={index}>{value.toString()}</td>
                                    ))}
                                </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;