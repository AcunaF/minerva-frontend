import React, { useState } from 'react';
import Modal from "../modal/modal.jsx";
const apiUrl = 'http://localhost:1521/api/';

const DetallesComponent = ({ results, show, handleDetallesClick }) => {

    return (
        <div>
            {show && results.map(({ type, data }, index) => {
                return (
                    <div key={type}>
                        {data ? (
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Area</th>
                                    <th>Calle</th>
                                    <th>Contacto</th>
                                    <th>Duracion</th>
                                    <th>Espacio Formativo</th>
                                    <th>Franja Horaria</th>
                                    <th>Gestion</th>
                                    <th>Institucion</th>
                                    <th>Localidad</th>
                                    <th>Mail</th>
                                    <th>Modalidad</th>
                                    <th>Nivel</th>
                                    <th>Redes</th>
                                    <th>Titulo</th>
                                    <th>Web</th>
                                </tr>
                                </thead>
                            <thead>
                                <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} onClick={() =>
                                    console.log("Detalles", item)
                                    }>
                                        <td>{item.AREA_1}</td>
                                        <td>{item.CALLE}</td>
                                        <td>{item.CONTACTO}</td>
                                        <td>{item.DURACION}</td>
                                        <td>{item.ESPACIO_FORMATIVO}</td>
                                        <td>{item.FRANJA_HORARIA}</td>
                                        <td>{item.GESTION}</td>
                                        <td>{item.INSTITUCION}</td>
                                        <td>{item.LOCALIDAD}</td>
                                        <td>{item.MAIL}</td>
                                        <td>{item.MODALIDAD}</td>
                                        <td>{item.NIVEL}</td>
                                        <td>{item.REDES}</td>
                                        <td>{item.TITULO}</td>
                                        <td>{item.WEB}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </thead>
                            </table>
                            ) : (
                            <div className="alert alert-danger" role="alert">
                            No se pudo obtener la información de los resultados.
                            </div>
                            )}
                </div>
                );
            })}
</div>
);
};

export default DetallesComponent;
