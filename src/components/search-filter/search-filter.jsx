import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Detalles from '../details/DetallesComponent';

const backendUrl = 'http://localhost:1521/api/';

const SearchFilter = ({ onFilterSearch, onReset, onChange }) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [resultados, setResultados] = React.useState([]);
    const [filtro, setFiltro] = React.useState('');

    const handleResetFilter = (e) => {
        e.preventDefault();
        setFiltro('');
        setResultados([]);
        setError('');
        onChange(e);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            // Llamada a la función proporcionada desde las props para manejar la búsqueda
            await onFilterSearch(filtro);
            const response = await fetch(`${backendUrl}/search?area&institucion&subarea&nombre=${filtro}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setResultados(data.resultados);
            } else {
                setError(`Error en la solicitud al backend: ${response.status} - ${data.message}`);
            }
        } catch (error) {
            setError(`Error al realizar la solicitud: ${error.message}`);
        } finally {
            setLoading(false);
        }

        console.log('resultados ',resultados)
    };

    return (
        <div className="input-group">
            <div className="input-group">
                <input
                    type="text"
                    id="search"
                    className="form-control"
                    name="study"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />

            </div>
            {error && <div className="text-danger mt-2">{error}</div>}

            <div className="mt-4">
                <div >
                    {resultados.length > 0 ? (
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Espacio Formativo</th>
                                <th>Nivel</th>
                                <th>Institucion</th>
                                <th>Domicilio</th>
                                <th>Area</th>
                                <th>Mas Información</th>

                            </tr>
                            </thead>
                            <tbody>
                            {resultados.map((resultado, index) => (
                                <tr key={index}>
                                    <td>{resultado.Nombre}</td>
                                    <td>{resultado.ESPACIO_FORMATIVO}</td>
                                    <td>{resultado.NIVEL}</td>
                                    <td>{resultado.INSTITUCION}</td>
                                    <td>{resultado.DOMICILIO}</td>
                                    <td>{resultado.AREA}</td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
