import React, {useState, useEffect} from 'react';
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
        EspacioFormativo: '',
        gestion: '',
        modalidad: '',
        duracion: '',
        franjaHoraria: '',
        search: '',


    });
    const [selectedInstitution, setSelectedInstitution] = useState({
        id: '',
        subAreas: [],
    });
    const handleReset = () => {
        setFormData({
            study: '',
            Institution: '',
            Area: '',
            SubArea: '',
            EspacioFormativo: '',
            gestion: '',
            modalidad: '',
            duracion: '',
            franjaHoraria: '',
            search: '',
        });
    };
    const [searchResults, setSearchResults] = useState([]);
    const [study, setStudy] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [subAreas, setSubAreas] = useState([]);
    const [espacioFormativo, setEspacioFormativo] = useState('');
    const [gestion, setGestion] = useState('');
    const [duracionData, setDuracion] = useState('');
    const [franjaHorariaOptions, setFranjaHorariaOptions] = useState([]);
    const [duracionOptions, setDuracionOptions] = useState([]);
    const [modalidadOptions, setModalidadOptions] = useState([]);
    const [showResults, setShowResults] = useState(false);


    const handleChange = async (e) => {
        const {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setSelectedInstitution({
            id: '',
            subAreas: [],
        })
        if (name === 'Area') {
            const selectedArea = areas.find((area) => area.AREA === value);

            console.log('Selected Area:', selectedArea);

            if (selectedArea) {
                // Actualizar las subáreas en el estado
                setSubAreas(selectedArea?.SUBAREAS || []);
            } else {
                // Si no hay área seleccionada, puedes reiniciar las subáreas
                setSubAreas([]);
            }

        } else if (name === 'SubArea') {
            // Obtener espacio formativo
            try {
                const responseEspacio = await fetch(
                    `${apiUrl}espacio?area=${(formData.Area)}&subArea=${(value)}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const espacioData = await responseEspacio.json();
                // Actualizar estado del espacio formativo
                setEspacioFormativo(espacioData[0]?.ESPACIO_FORMATIVO || '');
                console.log('Espacio Formativo esteee:', espacioData[0]?.ESPACIO_FORMATIVO || '');

                // Obtener y actualizar gestión
                const responseGestion = await fetch(
                    `${apiUrl}gestion?area=${(formData.Area)}&subArea=${(value)}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const gestionData = await responseGestion.json();
                setGestion(gestionData[0]?.GESTION || '');
                console.log('Gestión:', gestionData[0]?.GESTION || '');

                const responseModalidad = await fetch(
                    `${apiUrl}modalidad?area=${(formData.Area)}&subArea=${(value)}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const modalidadData = await responseModalidad.json();

                // Actualiza el estado utilizando setModalidadOptions
                setModalidadOptions(modalidadData.map((item) => item.MODALIDAD));
                console.log('Modalidad:', modalidadData.map((item) => item.MODALIDAD));

                // Obtener y actualizar franja horaria

                const responseFranjaHoraria = await fetch(
                    `${apiUrl}horarios?keyword=${(formData.Area)}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const franjaHorariaOptionsData = await responseFranjaHoraria.json();
                setFranjaHorariaOptions(franjaHorariaOptionsData.map((item) => item.FRANJA_HORARIA || ''));
                console.log('Franja Horaria:', franjaHorariaOptionsData.map((item) => item.FRANJA_HORARIA || ''));

                // Obtener y actualizar duración
                const responseDuracion = await fetch(
                    `${apiUrl}duracion?area=${(formData.Area)}&subArea=${(value)}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const duracionData = await responseDuracion.json();
                setDuracionOptions(duracionData[0]?.DURACION || '');
                console.log('Duración:', duracionData[0]?.DURACION || '');


            } catch (error) {
                console.error('Error al obtener información adicional:', error);
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responses = [];

            if (formData.study.trim() !== '') {
                const responseStudy = await fetch(
                    `${apiUrl}/search?palabraClave=${formData.study}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                responses.push({ type: 'study', data: await responseStudy.json() });
            }

            if (formData.Area && formData.SubArea && formData.modalidad) {
                const responseSearch = await fetch(
                    `${apiUrl}/search?area=${formData.Area}&subArea=${formData.SubArea}&modalidad=${formData.modalidad}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                responses.push({ type: 'search', data: await responseSearch.json() });
            }

            const results = responses.map(({ type, data }) => ({ type, data }));
            setSearchResults(results);
        } catch (error) {
            console.error('Error en la solicitud al servidor:', error);
        }
    };



    useEffect(() => {


            const fetchInstitutions = async () => {
                try {
                    const response = await fetch(`${apiUrl}instituciones`);
                    const data = await response.json();
                    console.log('Instituciones:', data);
                    setInstitutions(data);
                } catch (error) {
                    console.error('Error al cargar la lista de instituciones:', error);
                }
            };

            const fetchAreas = async () => {
                try {
                    const response = await fetch(`${apiUrl}area`);
                    const data = await response.json();
                    console.log('Áreas:', data);
                    setAreas(data);
                } catch (error) {
                    console.error('Error al cargar la lista de áreas:', error);
                }
            };
            const fetchSubAreas = async (selectedArea) => {
                try {
                    selectedArea = String(selectedArea);
                    const response = await fetch(`${apiUrl}subArea?area=${selectedArea}`);
                    const data = await response.json();
                    console.log('Subáreas este:', data);
                    setSubAreas(data);
                } catch (error) {
                    console.error('Error al cargar la lista de subáreas:', error);
                }
            };
            ;

            const fetchStudy = async () => {
                try {
                    const response = await fetch(
                        `${apiUrl}/search?palabraClave=${formData.study}`
                    );
                    const data = await response.json();
                    setStudy(data);
                } catch (error) {
                    console.error('Error al cargar la lista estudios:', error);
                }
            };
            const fetchFranjaHorariaOptions = async () => {
                try {
                    const response = await fetch(`${apiUrl}horarios?keyword=${(formData.Area)}`, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    setFranjaHorariaOptions(data.map((item) => item.FRANJA_HORARIA));
                } catch (error) {
                    console.error('Error al obtener opciones de franja horaria:', error);
                }
            };
            const fetchModalidadOptions = async () => {
                try {
                    const response = await fetch(`${apiUrl}modalidad?area=${encodeURIComponent(formData.Area)}`, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    setModalidadOptions(data.map((item) => item.MODALIDAD));
                } catch (error) {
                    console.error('Error al obtener opciones de modalidad:', error);
                }
            };

            const fetchDuracionOptions = async () => {
                try {
                    const response = await fetch(`${apiUrl}duracion?area=${formData.Area}&subArea=${formData.SubArea}`);
                    const duracionData = await response.json();

                    // Verificar el tipo de data y manejarlo en consecuencia
                    if (typeof duracionData === 'string') {
                        // Si la respuesta es una cadena, convertirla a un array
                        setDuracionOptions([duracionData]);
                    } else if (Array.isArray(duracionData)) {
                        // Si la respuesta es un array, usarla directamente
                        setDuracionOptions(duracionData);
                    } else {
                        // Si no es ni cadena ni array, establecer duracionOptions como un array vacío
                        setDuracionOptions([]);
                    }

                    console.log('Opciones de Duración:', duracionData);
                } catch (error) {
                    console.error('Error al obtener opciones de duración:', error);
                }
            };

            fetchModalidadOptions();
            fetchFranjaHorariaOptions();
            fetchInstitutions();
            fetchAreas();
            fetchStudy();
            fetchDuracionOptions();
            if (formData.Area) {
                fetchSubAreas(formData.Area);
            }
        }, [apiUrl, formData.study, formData.Area]);

        console.log('Modalidad Options:', modalidadOptions);

        return (
            <div className="Container border p-4 mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 mb-xl-4">
                                    <label htmlFor="study">
                                        Qué quieres estudiar o aprender?
                                    </label>
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
                                            {institutions?.map((institution) => (
                                                <option
                                                    key={institution.DISPLAY_VALUE}
                                                    value={institution.DISPLAY_VALUE}
                                                >
                                                    {institution.DISPLAY_VALUE}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="Area">
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
                                            {areas?.map((area) => (
                                                <option key={area.AREA} value={area.AREA}>
                                                    {area.AREA}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="SubArea">
                                        Subárea:
                                        <select
                                            className="form-control"
                                            name="SubArea"
                                            value={formData.SubArea}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Seleccione una subárea
                                            </option>
                                            {subAreas?.map((subArea) => (
                                                <option key={subArea.VAL} value={subArea.DIS}>
                                                    {subArea.DIS}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="EspacioFormativo">
                                        Espacio formativo:
                                        <input
                                            className="form-control"
                                            name="EspacioFormativo"
                                            value={espacioFormativo}
                                            readOnly
                                        />
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="gestion">
                                        Gestión:
                                        <select
                                            className="form-control"
                                            name="gestion"
                                            value={formData.gestion}
                                            onChange={handleChange}
                                        >
                                            <option value="estatal">Estatal</option>
                                            <option value="privada">Privada</option>
                                            {/* Agrega más opciones según sea necesario */}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="modalidad">
                                        Modalidad:
                                        <select
                                            className="form-control"
                                            name="modalidad"
                                            value={formData.modalidad}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Modalidad
                                            </option>
                                            {Array.isArray(modalidadOptions) && modalidadOptions.map((modalidadOption) => (
                                                <option key={modalidadOption.id} value={modalidadOption}>
                                                    {modalidadOption}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="franjaHoraria">
                                        Franja Horaria:
                                        <select
                                            className="form-control"
                                            name="franjaHoraria"
                                            value={formData.franjaHorariaOptions}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Seleccione una franja horaria
                                            </option>
                                            {franjaHorariaOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="duracion">
                                        Duración:
                                        <select
                                            className="form-control"
                                            name="duracion"
                                            value={formData.duracion}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>
                                                Duración
                                            </option>
                                            {Array.isArray(duracionOptions)
                                                ? duracionOptions.map((duracionOption) => (
                                                    <option key={duracionOption.DURACION}
                                                            value={duracionOption.DURACION}>
                                                        {duracionOption.DURACION}
                                                    </option>
                                                ))
                                                : (
                                                    <option value={duracionOptions}>{duracionOptions}</option>
                                                )
                                            }
                                        </select>
                                    </label>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-6 mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Buscar
                                        </button>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <button
                                            type="reset"
                                            className="btn btn-secondary"
                                            onClick={handleReset}
                                        >
                                            Limpiar búsqueda
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <Logo/>
                    </div>
                </div>
                <FormResults results={searchResults} show={showResults} />
            </div>
        );
    }
;

export default FormularioConLogo;
