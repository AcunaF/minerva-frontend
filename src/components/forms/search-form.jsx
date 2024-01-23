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
          /*  EspacioFormativo: '',
            gestion: '',
            modalidad: '',
            duracion: '',
            franjaHoraria: '',*/

        });
        const [selectedInstitution, setSelectedInstitution] = useState({
            id: '',
            subAreas: [],
        });
        const handleReset = () => {
            setFormData({
                study: '',
                Institution: '',
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
        const [franjaHoraria, setFranjaHoraria] = useState('');
        const [franjaHorariaOptions, setFranjaHorariaOptions] = useState([]);
        const [duracionOptions, setDuracionOptions] = useState([]);
        const [modalidadOptions, setModalidadOptions] = useState([]);


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
            if (name === 'Institution') {
                const selectedInstitution = institutions.find(
                    (institution) => institution.DISPLAY_VALUE === value
                );
                console.log('Selected Institution:', selectedInstitution);

                if (selectedInstitution) {
                    setSelectedInstitution({
                        id: selectedInstitution?.ID || '',
                        areas: selectedInstitution?.AREAS || [], // Asegúrate de tener este campo AREAS en tu API
                        subAreas: selectedInstitution?.SUBAREAS || [], // Asegúrate de tener este campo SUBAREAS en tu API
                    });
                    console.log('Selected Areas:', selectedInstitution?.AREAS);
                } else {
                    // Si no hay institución seleccionada, puedes reiniciar las áreas y subáreas
                    setSelectedInstitution({
                        id: '',
                        areas: [],
                        subAreas: [],
                    });

                    setFormData((prevState) => ({
                        ...prevState,
                        Area: '',
                        SubArea: '',
                    }));
                }
            } else if (name === 'Area') {
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
                        `${apiUrl}espacio?area=${encodeURIComponent(formData.Area)}&subArea=${encodeURIComponent(value)}`,
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
                        `${apiUrl}gestion?area=${encodeURIComponent(formData.Area)}&subArea=${encodeURIComponent(value)}`,
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

                    // Obtener y actualizar modalidad
                    const responseModalidad = await fetch(
                        `${apiUrl}modalidad?area=${encodeURIComponent(formData.Area)}&subArea=${encodeURIComponent(value)}`,
                        {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const modalidadData = await responseModalidad.json();
                    modalidadOptions(modalidadData[0]?.MODALIDAD || '');
                    console.log('Modalidad:', modalidadData[0]?.MODALIDAD || '');

                    // Obtener y actualizar franja horaria
                    const responseFranjaHoraria = await fetch(
                        `${apiUrl}horarios?keyword=${encodeURIComponent(formData.Area)}`,


                        {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const franjaHorariaOptions = await responseFranjaHoraria.json();
                    franjaHorariaOptions(franjaHorariaOptions[0]?.FRANJA_HORARIA || '');
                    console.log('Franja Horaria:', franjaHorariaOptions[0]?.FRANJA_HORARIA || '');

                    // Obtener y actualizar duración
                    const responseDuracion = await fetch(
                        `${apiUrl}duracion?area=${encodeURIComponent(formData.Area)}&subArea=${encodeURIComponent(value)}`,
                        {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    const duracionData = await responseDuracion.json();
                    setDuracion(duracionData[0]?.DURACION || '');
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
                    responses.push({type: 'study', data: await responseStudy.json()});
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
                    responses.push({
                        type: 'institution',
                        data: await responseInstitution.json(),
                    });
                }


                const results = responses.map(({type, data}) => ({type, data}));
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
            }
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
                                            {modalidadOptions.map((modalidadOption) => (
                                                <option key={modalidadOption.MODALIDAD} value={modalidadOption.MODALIDAD}>
                                                    {modalidadOption.MODALIDAD}
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
                                            {duracionOptions.map((duracionOption) => (
                                                <option key={duracionOption.DURACION} value={duracionOption.DURACION}>
                                                    {duracionOption.DURACION}
                                                </option>
                                            ))}
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
                <FormResults results={searchResults}/>
            </div>
        );
    }
;

export default FormularioConLogo;
