import React, { useState, useEffect } from 'react';
import Logo from '../logo/logo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormResults from './form-results';

const apiUrl = 'http://localhost:1521/api/';

const FormularioConLogo = () => {
    const [formData, setFormData] = useState({
        study: '',
        Institution: '',
        Area: '',
        SubArea: '',
        Type: '',
        Management: '',
        Modality: '',
        Schedule: '',
        Duration: '',
    });

    const handleReset = () => {
        setFormData({
            study: '',
            Institution: '',
            Area: '',
            SubArea: '',
            Type: '',
            Management: '',
            Modality: '',
            Schedule: '',
            Duration: '',
        });
        setSearchResults([]);
    };

    const [searchResults, setSearchResults] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [subAreas, setSubAreas] = useState([]);
    const [study, setStudy] = useState([]);

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            SubArea: '',
        });

        if (name === 'Area' && value.trim() !== '') {
            try {
                const responseSubArea = await fetch(`${apiUrl}subArea?area=${formData(value)}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const dataSubArea = await responseSubArea.json();
                setSubAreas(dataSubArea);
            } catch (error) {
                console.error('Error al obtener subáreas:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responses = [];

            if (formData.study.trim() !== '') {
                const responseStudy = await fetch(`${apiUrl}/search?palabraClave=${(formData.study)}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                responses.push({ type: 'study', data: await responseStudy.json() });
            }

            if (formData.Institution.trim() !== '') {
                const responseInstitution = await fetch(`${apiUrl}instituciones?query=${formData.Institution}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                responses.push({ type: 'institution', data: await responseInstitution.json() });
            }

            if (formData.Area.trim() !== '') {
                const responseArea = await fetch(`${apiUrl}area?query=${formData.Area}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                responses.push({ type: 'area', data: await responseArea.json() });
            }

            if (formData.SubArea.trim() !== '') {
                const responseSubArea = await fetch(`${apiUrl}subArea?query=${formData.SubArea}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                responses.push({ type: 'subArea', data: await responseSubArea.json() });
            }

            const results = responses.map(({ type, data }) => ({ type, data }));
            setSearchResults(results);
        } catch (error) {
            console.error('Error en la solicitud al servidor:', error);
        }
    };

    useEffect(() => {
        const fetchtStudy = async () => {
            try {
                const response = await fetch(`${apiUrl}/search?palabraClave=${encodeURIComponent(formData.study)}`);
                const data = await response.json();
                setStudy(data);
            } catch (error) {
                console.error('Error al cargar la lista estudios:', error);
            }
        };

        const fetchInstitutions = async () => {
            try {
                const response = await fetch(`${apiUrl}instituciones`);
                const data = await response.json();
                setInstitutions(data);
            } catch (error) {
                console.error('Error al cargar la lista de instituciones:', error);
            }
        };

        const fetchAreas = async () => {
            try {
                const response = await fetch(`${apiUrl}area`);
                const data = await response.json();
                setAreas(data);
            } catch (error) {
                console.error('Error al cargar la lista de áreas:', error);
            }
        };

        const fetchSubAreas = async (selectedArea) => {
            try {
                const response = await fetch(`${apiUrl}subArea?area=${selectedArea}`);
                const data = await response.json();
                setSubAreas(data);
            } catch (error) {
                console.error('Error al obtener subáreas:', error);
            }
        };

        fetchInstitutions();
        fetchAreas();
        fetchSubAreas([]);
        fetchtStudy();
    }, [formData.study]);

    return (
        <div className="container border p-4 mt-5">
            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12 mb-xl-4">
                                <label htmlFor="study">Qué quieres estudiar o aprender?</label>
                                <input
                                    type="text"
                                    id="study"
                                    className="form-control"
                                    name="study"
                                    value={formData.study}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="Institution" aria-label="Seleccionar institución">
                                    Institución:
                                    <select
                                        className="form-control"
                                        name="Institution"
                                        value={formData.Institution}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Seleccione una institución
                                        </option>
                                        {institutions.map((institution) => (
                                            <option key={institution.DISPLAY_VALUE} value={institution.DISPLAY_VALUE}>
                                                {institution.DISPLAY_VALUE}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Área:
                                    <select
                                        className="form-control"
                                        name="Area"
                                        value={formData.Area}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>
                                            Seleccione un área
                                        </option>
                                        {areas.map((area) => (
                                            <option key={area.VAL} value={area.VAL}>
                                                {area.DIS}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Sub-Área:
                                    <select className="form-control" name="SubArea" value={formData.SubArea} onChange={handleChange}>
                                        <option value="" disabled>
                                            Seleccione una subárea
                                        </option>
                                        {subAreas.map((subArea) => (
                                            <option key={subArea.VAL} value={subArea.VAL}>
                                                {subArea.DIS}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Espacio informativo:
                                    <input className="form-control" name="Type" value={formData.Type} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Gestión:
                                    <input className="form-control" name="Management" value={formData.Management} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Modalidad:
                                    <input className="form-control" name="Modality" value={formData.Modality} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Franja horaria
                                    <input className="form-control" name="Schedule" value={formData.Schedule} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Duración:
                                    <input className="form-control" name="Duration" value={formData.Duration} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-6 mb-3">
                                    <button type="submit" className="btn btn-primary">
                                        Buscar
                                    </button>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <button type="reset" className="btn btn-secondary" onClick={handleReset}>
                                        Limpiar búsqueda
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-4">
                    <Logo />
                </div>
            </div>
            <FormResults results={searchResults} />
        </div>
    );
};

export default FormularioConLogo;
