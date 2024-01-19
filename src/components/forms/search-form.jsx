import React, { useState, useEffect } from 'react';
import Logo from '../logo/logo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormResults from './form-results';

const apiUrl = 'http://localhost:1521/api/';

const FormularioConLogo = () => {
    // Estado inicial del formulario
    const [formData, setFormData,] = useState({
        study: '',
        Institution: '',
        Area: '',
        SubArea: '',
        Type: '',
        Management: '',
        Modality: '',
        Schedule: '',
        Duration: '',
        institutionId: '',
        institutionInfo: {
            id: '',
            areas: [],
            subAreas: [],
        },
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
            institutionId: '',
            institutionInfo: {
                id: '',
                areas: [],
                subAreas: [],
            },
        });
    };

    const [searchResults, setSearchResults] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [subAreas, setSubAreas] = useState([]);
    const [Espacios, setEspacios] = useState([]);
    const [study, setStudy] = useState([]);
    const [management, setManagement] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState({
        id: '',
        areas: [],
        subAreas: [],
    });

    // Manejo de cambios en el formulario
    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            id: '',
            areas: [],
            SubArea: '',
        });

        if (name === 'Area' && value.trim() !== '') {
            try {
                if (name === 'Institution') {
                    const selectedInstitution = institutions.find(
                        (institution) => institution.DISPLAY_VALUE === value
                    );

                    setSelectedInstitution({
                        id: selectedInstitution ? selectedInstitution.ID : '',
                        areas: selectedInstitution ? selectedInstitution.AREAS : [],
                        subAreas: selectedInstitution ? selectedInstitution.SUBAREAS : [],
                    });

                    // Obtén subáreas solo si hay un valor de área válido
                    const responseSubArea = await fetch(`${apiUrl}subArea?area=${value}`);
                    const dataSubArea = await responseSubArea.json();

                    // Verifica si hay una subárea seleccionada antes de hacer la llamada para obtener espacios formativos
                    if (formData.SubArea.trim() !== '') {
                        const responseEspacio = await fetch(
                            `${apiUrl}espacio?area=${value}&subArea=${formData.SubArea}`
                        );
                        const dataEspacio = await responseEspacio.json();
                        setEspacios(dataEspacio);
                    } else {
                        // Si no hay subárea seleccionada, puedes establecer Espacios en un array vacío o manejarlo de acuerdo a tu lógica
                        setEspacios([]);
                    }

                    // Actualiza las subáreas
                    setSubAreas(dataSubArea);
                    setManagement([]);
                }
            } catch (error) {
                console.error('Error al obtener subáreas o espacios formativos:', error);
            }
        }
    };

    // Manejo de envíos en el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responses = [];

            if (formData.Management.trim() !== '') {
                const responseManagement = await fetch(`${apiUrl}gestion?query=${formData.Management}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                responses.push({ type: 'management', data: await responseManagement.json() });
            }

            if (formData.study.trim() !== '') {
                const responseStudy = await fetch(`${apiUrl}/search?palabraClave=${formData.study}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                responses.push({ type: 'study', data: await responseStudy.json() });
            }

            if (formData.Institution.trim() !== '') {
                const responseInstitution = await fetch(
                    `${apiUrl}instituciones?query=${formData.Institution}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
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

    // Se ejecuta después de que el componente se haya montado y cada vez que cambia el valor de formData.study.
    useEffect(() => {
        const fetchtStudy = async () => {
            try {
                const response = await fetch(`${apiUrl}/search?palabraClave=${formData.study}`);
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
                setInstitutions(
                    data.map((institution) => ({
                        ...institution,
                        areas: institution.AREAS,
                        subAreas: institution.SUBAREAS,
                    }))
                );
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

        const fetchEspacios = async (selectedArea, selectedSubArea) => {
            try {
                const response = await fetch(
                    `${apiUrl}espacio?area=${selectedArea}&subArea=${selectedSubArea}`
                );
                const data = await response.json();
                setEspacios(data);
            } catch (error) {
                console.error('Error al obtener espacios formativos:', error);
            }
        };

        fetchInstitutions();
        fetchAreas();
        fetchSubAreas([]);
        fetchtStudy();
        fetchEspacios(selectedInstitution.id, formData.SubArea);
    }, [selectedInstitution.id, formData.SubArea, formData.study]);

    // Renderiza el formulario
    return (
        <div className="Container border p-4 mt-5">
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
                                        {selectedInstitution.areas.map((area) => (
                                            <option key={area} value={area}>
                                                {area}
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
                                        {selectedInstitution.subAreas.map((subArea) => (
                                            <option key={subArea} value={subArea}>
                                                {subArea}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>
                                    Espacio formativo:
                                    <select className="form-control" name="Espacio" value={formData.Espacio} onChange={handleChange}>
                                        <option value="" disabled>
                                            Seleccione un espacio formativo
                                        </option>
                                        {Espacios.map((Espacio) => (
                                            <option key={Espacio.VAL} value={Espacio.VAL}>
                                                {Espacio.DIS}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className="col-md-4 mb-3">
                                <label>
                                    Gestión:
                                    <input
                                        className="form-control"
                                        name="Management"
                                        value={formData.Management}
                                        onChange={handleChange}
                                    />
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
