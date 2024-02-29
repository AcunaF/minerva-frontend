import React, { useState,useEffect } from 'react';
import DetallesComponent from '../details/DetallesComponent';
import Modal from "../modal/modal";

const apiUrl = 'http://localhost:1521/api/';

//Los datos de detalle que vienen del backend se almacenan en el estado detallesData que se define en el componente FormResults con useState.
//Cuando hago la petición al backend con la función fetchDetails, se guarda la respuesta en detallesData con setDetallesData(data).
//El estado mostrarDetalles se utiliza para controlar si el modal se muestra o no.
// Cuando hago clic en el botón de detalles, se llama a fetchDetails, que a su vez llama a setMostrarDetalles(!mostrarDetalles) para mostrar el modal.
//<Modal detallesData={detallesData} mostrarDetalles={mostrarDetalles} /> Para mostrar estos datos le paso como prop al componente Modal:
const FormResults = ({ results, show,handleDetallesClick }) => {

    const [detallesData, setDetallesData] = useState(null);
    const [mostrarDetalles, setMostrarDetalles] = useState(true);
    const [resultIndex, setResultIndex] = useState(null);  // Nuevo estado para almacenar resultIndex

    const columnasAMostrar = [
        'NOMBRE',
        'INSTITUCION',
        'AREA_1',
        'ESPACIO_FORMATIVO',
        'NIVEL',
        'DOMICILIO', // Ajuste: eliminé la duplicación de 'INSTITUCION'
    ];

    const openDetalles   = () => {
        alert('Abrió la función openDetalles en:\n' +
            'Mostrar Detalles: ' + mostrarDetalles + '\n' +
            'Detalles:\n' + JSON.stringify(detallesData, null, 2));
        setMostrarDetalles(true);
    };

    const resetDetalles = () => {
        setDetallesData(null);
        setMostrarDetalles(false);
        setResultIndex(null);  // Restablecer resultIndex al cerrar los detalles
    };

    const fetchDetails = async (formDataDetail, index) => {
        try {
            const detailsUrl = `details?institucion=${encodeURIComponent(formDataDetail.INSTITUCION)}&area=${encodeURIComponent(formDataDetail.AREA_1)}&subarea=${encodeURIComponent(formDataDetail.SUBAREA_1)}&espacioFormativo=${encodeURIComponent(formDataDetail.ESPACIO_FORMATIVO)}&modalidad=${encodeURIComponent(formDataDetail.MODALIDAD)}&franjaHoraria=${encodeURIComponent(formDataDetail.FRANJA_HORARIA)}&gestion=${encodeURIComponent(formDataDetail.GESTION)}&nombre=${encodeURIComponent(formDataDetail.NOMBRE || '')}`;
       //   const filterParams = `institucion=${formData.Institution}&area=${formData.Area}&subArea=${formData.subArea}&modalidad=${formData.modalidad}&espacioFormativo=${formData.espacioFormativo}&franjaHoraria=${formData.franjaHoraria}&gestion=${formData.gestion}&duracion=${formData.duracion}`;
            const response = await fetch(`${apiUrl}/${detailsUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error al obtener detalles: ${response.status}`);
            }

 //cuando hago clic en el botón de detalles, se llama a la función fetchDetails
 // Esta función realiza una petición al backend para obtener los detalles del elemento seleccionado.
 // Una vez que los detalles se han obtenido, se almacenan en el estado detallesData y se llama a la función setMostrarDetalles con el argumento true para mostrar el modal.
            const data = await response.json();
            setDetallesData(data);
            setResultIndex(index);
            handleDetallesClick(data);
            console.log('fetchDetails:', data);
            setResultIndex(index);  // Almacenar resultIndex cuando se abren los detalles
            console.log('resultIndex:', index);
        } catch (error) {
            console.error('Error fetching details:', error.message);

        }
       // setMostrarDetalles(mostrarDetalles);
    };
    useEffect(() => {
        console.log('mostrarDetalles updated en :', mostrarDetalles,'detalles',detallesData);
    }, [mostrarDetalles]);

    return (
       <div className = "table-responsive" >
            {show && results.map(({type, data}, index) => (
                <div key={type}>
                    {data ? (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                {columnasAMostrar.map((columna) => (
                                    <th key={columna}>{columna}</th>
                                ))}
                                <th>Mas Inf.</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((formDataDetail, resultIndex) => (
                                    <tr key={`${type}-${resultIndex}`}>
                                        {columnasAMostrar.map((columna) => (
                                            <td key={columna}>
                                                {columna === 'SUBAREA_1' ? formDataDetail.SUBAREA_1 : columna === 'AREA_1' ? formDataDetail.AREA_1 : formDataDetail[columna]}
                                            </td>
                                        ))}
                                        <td>
                                            {/*el boton se cierra desde el componente modal... en la misma aventana aparece el boton de cerrar*/}
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    fetchDetails(formDataDetail, index);
                                                    openDetalles();
                                                }}>
                                                Más
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
                        <p></p>
                    )}
                </div>
            ))}
           {mostrarDetalles && <Modal detallesData={detallesData} mostrarDetalles={mostrarDetalles} setMostrarDetalles={setMostrarDetalles} />}
       </div>
    );
};

export default FormResults;
