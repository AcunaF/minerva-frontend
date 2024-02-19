import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            const response = await fetch(`${backendUrl}/search?area&modalidad&institucion&duracion&subarea&nombre=${filtro}&espacioFormativo&gestion&`, {
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
                <div className="input-group-append">
                    <button type="button" className="btn btn-primary btn-margin" onClick={handleSubmit}
                            disabled={loading}>
                        {loading ? 'Loading...' : <BiSearch style={{marginRight: '5px'}}/>}
                    </button>
                    <button type="button" className="btn btn-primary btn-margin" onClick={(e) => handleResetFilter(e)}>
                        Reset
                    </button>
                </div>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
            <div className="mt-4">
                <div className="container mt-4">
                    {resultados.length > 0 ? (
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th>Institución</th>
                                <th>Nombre</th>
                                <th>Área</th>
                                <th>Subárea</th>
                                <th>Espacio Formativo</th>
                                <th>Gestión</th>
                                <th>Modalidad</th>
                                <th>Duración</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultados.map((resultado, index) => (
                                <tr key={index}>
                                    <td>{resultado.INSTITUCION}</td>
                                    <td>{resultado.NOMBRE}</td>
                                    <td>{resultado.AREA}</td>
                                    <td>{resultado.SUBAREA}</td>
                                    <td>{resultado.ESPACIO_FORMATIVO}</td>
                                    <td>{resultado.GESTION}</td>
                                    <td>{resultado.MODALIDAD}</td>
                                    <td>{resultado.DURACION}</td>
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
