import React, {useState, useEffect} from 'react';
import Logo from '../logo/logo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormResults from './form-results';
import SearchFilter from "../search-filter/search-filter";
import DetallesComponent from "../details/DetallesComponent";

const apiUrl = 'http://localhost:1521/api/';

const FormularioConLogo = ({onReset}) => {

    const [formData, setFormData] = useState({
        institution: '',
        Area: '',
        subArea: '',
        espacioFormativo: '',
        gestion: '',
        modalidad: '',
        duracion: '',
        franjaHoraria: '',
        search: '',
        name: '',
        nivel: '',
        domicilio: '',
        study: '',

    });

    const handleFilterSearch = async (filtro) => {
        // Lógica para filtrar en función de 'filtro'

        console.log('Buscando con filtro:', filtro);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setFormData({
            study: '',
            Institution: '',
            Area: '',
            subArea: '',
            espacioFormativo: '',
            gestion: '',
            modalidad: '',
            duracion: '',
            franjaHoraria: '',
            search: '',
            name: '',
            nivel: '',
            domicilio: '',

        });

        setSubAreas([]);
        setGestion([]);
        setModalidadOptions([]);
        setFranjaHorariaOptions([]);
        setDuracionOptions([]);
        setEspacioFormativo('');
        setShowResults(false);
        setShowDetalles(false);
        setDetallesData(null);

    };

    const [searchResults, setSearchResults] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [areas, setAreas] = useState([]);
    const [subAreas, setSubAreas] = useState([]);
    const [espacioFormativo, setEspacioFormativo] = useState('');
    const [gestionOptions, setGestion] = useState([]);
    const [franjaHorariaOptions, setFranjaHorariaOptions] = useState([]);
    const [duracionOptions, setDuracionOptions] = useState([]);
    const [modalidadOptions, setModalidadOptions] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showDetalles, setShowDetalles] = useState(false);
    const [detallesData, setDetallesData] = useState(null);


    const handleDetallesClick = (result) => {
        // Lógica para mostrar detalles
        console.log('Mostrar detalles:', result);
        setDetallesData(result);
        setShowDetalles(true); // Establecer showDetalles a true aquí

        console.log('Result:', result);
    };

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

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
                    `${apiUrl}espacio?area=${(formData.Area)}&subarea=${(value)}`,
                    {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const responseData = await responseEspacio.json();
                setEspacioFormativo(responseData[0]?.ESPACIO_FORMATIVO || '');

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

                console.log('Opciones de Gestión:', gestionData);

                if (Array.isArray(gestionData)) {
                    setGestion(gestionData.map((item) => item.GESTION));
                } else {
                    // Manejar el caso en que gestionData no es un array
                    console.error('La respuesta de la API no es un array:', gestionData);
                    // Puedes establecer gestionOptions como un array vacío u otro valor predeterminado
                    setGestion([]);
                }
                try {
                    const responseModalidad = await fetch(
                        `${apiUrl}modalidad?area=${formData.Area}&subArea=${value}`,
                        {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    const modalidadData = await responseModalidad.json();
                    setModalidadOptions(modalidadData.map((item) => item.MODALIDAD));
                    console.log('Modalidad:', modalidadData.map((item) => item.MODALIDAD));
                } catch (error) {
                    console.error('Error al obtener opciones de Modalidad:', error);
                }

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
                const filterParams = `subArea=${value}`;
                const responseFilter = await performSearch('filter', filterParams);
                setSearchResults([{type: 'filter', data: responseFilter}]);
                setShowResults(true);
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

            // Búsqueda por filtros
            const filterParams = `institucion=${formData.Institution || ''}&area=${formData.Area || ''}&subArea=${formData.subArea || ''}&modalidad=${formData.modalidad || ''}&espacioFormativo=${formData.espacioFormativo || ''}&franjaHoraria=${formData.franjaHoraria || ''}&gestion=${formData.gestion || ''}&duracion=${formData.duracion || ''}`;
            const responseFilter = await performSearch('filter', filterParams);
            responses.push({type: 'filter', data: responseFilter});

            const results = responses.map(({type, data}) => ({type, data}));
            setSearchResults(results);
            setShowResults(true); // Agrega esta línea para mostrar los resultados
            console.log('Results:', results);
            console.log('Responses:', responses);
        } catch (error) {
            console.error('Error en la solicitud al servidor:', error);
        }
    };

    const performSearch = async (type, params) => {
        try {
            const response = await fetch(`${apiUrl}filter?type=${type}&${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    };

    useEffect(() => {
        //   Búsqueda por filtros
        const fecthSearchFilter = async () => {
            try {
                const queryParams = {
                    institucion: formData.Institution || '',
                    area: formData.Area || '',
                    subArea: formData.subArea || '',
                    modalidad: formData.modalidad || '',
                    espacioFormativo: formData.espacioFormativo || '',
                    franjaHoraria: formData.franjaHoraria || '',
                    gestion: formData.gestion || '',
                    duracion: formData.duracion || '',
                };

                // Verificar si al menos un campo tiene un valor definido
                const hasValues = Object.values(queryParams).some(value => value !== undefined && value.trim() !== '');

                if (hasValues) {
                    // Filtrar los parámetros que tienen un valor definido
                    const filteredParams = Object.entries(queryParams)
                        .filter(([key, value]) => value !== undefined && value.trim() !== '')
                        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                        .join('&');

                    const response = await fetch(`${apiUrl}filter?${filteredParams}`, {
                        method: 'GET',
                    });

                    const data = await response.json();
                    setFiltro(data);
                    console.log('a ver que trae data:', data);
                } else {
                    console.log('No hay campos con valores definidos para realizar la búsqueda.');
                }
            } catch (error) {
                console.error('Error al cargar los filtros:', error);
            }
        };

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
                // Verificar si selectedArea tiene un valor antes de convertirlo a una cadena
                if (selectedArea) {
                    selectedArea = String(selectedArea);
                    const response = await fetch(`${apiUrl}subArea?area=${selectedArea}`);
                    const data = await response.json();
                    console.log('Subáreas este:', data);
                    setSubAreas(data);
                } else {
                    // Si selectedArea es undefined o null, puedes establecer subAreas como un array vacío
                    setSubAreas([]);
                }
            } catch (error) {
                console.error('Error al cargar la lista de subáreas:', error);
            }
        };
            const fetchEspacioFormativo = async () => {
                try {
                    const response = await fetch(`${apiUrl}espacio?area=${formData.Area}&subArea=${formData.subArea}`);
                    const data = await response.json();
                    setEspacioFormativo(data[0]?.ESPACIO_FORMATIVO || '');
                } catch (error) {
                    console.error('Error al obtener espacio formativo:', error);
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
                    const response = await fetch(`${apiUrl}modalidad?area=${(formData.Area)}`, {
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

            const fetchGestionOptions = async () => {
                try {
                    const response = await fetch(`${apiUrl}gestion?area=${formData.Area}&subArea=${formData.SubArea}`);
                    const gestionData = await response.json();
                    setGestion(Array.isArray(gestionData) ? gestionData.map((item) => item.GESTION) : []);

                    // Verificar el tipo de data y manejarlo en consecuencia
                    let gestionOptionsArray = [];
                    if (typeof gestionData === 'string') {
                        // Si la respuesta es una cadena, convertirla a un array
                        gestionOptionsArray = [gestionData];
                    } else if (Array.isArray(gestionData)) {
                        // Si la respuesta es un array, usarla directamente
                        gestionOptionsArray = gestionData;
                    }
                    // Actualizar el estado
                    setGestion(gestionOptionsArray);

                    console.log('Opciones de Gestión:', gestionData);
                } catch (error) {
                    console.error('Error al obtener opciones de gestión:', error);
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

            fecthSearchFilter();
            fetchInstitutions();
            fetchAreas();
            if (formData.Area) {
                fetchSubAreas(formData.Area);
            }
            fetchEspacioFormativo();
            fetchModalidadOptions();
            fetchGestionOptions();
            fetchFranjaHorariaOptions();
            fetchDuracionOptions();

          // fetchDomicilio();
          // fetchNivel();
           //fetchName();

        }, [apiUrl, formData.study, formData.Area]);

        console.log('Modalidad Options:', modalidadOptions);

        return (

            <div className="Container border p-2 mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <SearchFilter
                                onFilterSearch={handleFilterSearch}
                                onReset={handleReset}
                                onChange={handleChange}
                                handleDetallesClick={handleDetallesClick}
                            />
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="Institution" aria-label="Seleccionar institución">
                                        Donde le gustaria estudiar?
                                        <select
                                            className="form-control"
                                            name="Institution"
                                            value={formData.Institution}
                                            onChange={handleChange}
                                        >
                                            <option key="" value="" disabled>
                                                Seleccione una institución
                                            </option>
                                            {institutions?.map((institution) => (
                                                <option
                                                    key={institution.DISPLAY_VALUE}  // Asegúrate de tener un valor único aquí
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
                                        Que área
                                        <select
                                            className="form-control"
                                            name="Area"
                                            value={formData.Area}
                                            onChange={handleChange}
                                        >
                                            <option key="" value="" disabled>
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
                                    <label htmlFor="subArea">
                                        Subárea:
                                        <select
                                            className="form-control"
                                            name="subArea"
                                            value={formData.subArea}
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
                                    <label htmlFor="espacioFormativo">
                                        Espacio Formativo:
                                        <input
                                            type="text"
                                            id="espacioFormativo"
                                            className="form-control"
                                            name="espacioFormativo"
                                            value={formData.espacioFormativo}
                                            onChange={handleChange}
                                        />
                                        <option value="" disabled>
                                        </option>
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
                                            <option value="" disabled>
                                                Gestión
                                            </option>
                                            {gestionOptions.map((item) => (
                                                <option key={item.GESTION} value={item.GESTION}>
                                                    {item.GESTION}
                                                </option>
                                            ))}
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
                                            {Array.isArray(modalidadOptions) && modalidadOptions.map((modalidadOption, index) => (
                                                <option key={index} value={modalidadOption}>
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
                                            value={formData.franjaHoraria}
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
                                            {Array.isArray(duracionOptions) ? (
                                                duracionOptions.map((duracionOption) => (
                                                    <option key={duracionOption.DURACION}
                                                            value={duracionOption.DURACION}>
                                                        {duracionOption.DURACION}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value={duracionOptions}>{duracionOptions}</option>
                                            )}
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
                                        <button type="button" className="btn btn-primary" onClick={handleReset}>
                                            Reset
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
                <div className="row">
                    <div>

                        <FormResults
                            results={searchResults}
                            show={showResults}
                            handleDetallesClick={handleDetallesClick}  // Pasar la función a FormResults
                        />
                        {showDetalles && detallesData && (
                            <DetallesComponent detallesData={detallesData} onClose={() => setShowDetalles(false)} />
                        )}
                    </div>
                </div>
            </div>
        );
    }
;
export default FormularioConLogo;