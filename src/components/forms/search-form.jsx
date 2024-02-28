import React, {useState, useEffect} from 'react';
import Logo from '../logo/logo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormResults from './form-results';
import DetallesComponent from "../details/DetallesComponent";
import Modal from "../modal/modal";
import ButtonComponent from "../buttons/button";
const apiUrl = 'http://localhost:1521/api/';


const MinervaForm = ({onReset}) => {

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
        address: '',
        domicilio: '',
        study: '',

    });
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
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [mostrarDetalles, setMostrarDetalles] = React.useState(false);
    const [result, setResult] = React.useState(null);

    const handleFilterSearch = async (filtro) => {
        //'filtro' es la que arma la query de resultados.
        try {
            const filteredParams = Object.entries(filtro)
                .filter(([key, value]) => value !== undefined && value.trim() !== '')
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');

            const response = await performSearch('filter', filteredParams);
            setSearchResults([{type: 'filter', data: response}]);
            setShowResults(true);
        } catch (error) {
            console.error('Error en la búsqueda con filtro:', error);
        }
    };
    const performSearch = async (type, params) => {
        try {
            // Verificar si se ha seleccionado un elemento de la lista
            if (formData.institution || formData.search || formData.Area || formData.subArea) {
                const url = `${apiUrl}${type}?${params}`;
              //  console.log('URL:', url);
              //  console.log('Params:', params);
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
               //     console.log('Data institucion:', data);
                    return data;
                } else {
               //     console.log('Response not OK:', response);
                    return null;
                }
            } else {

                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };
    const handleReset = (e) => {
        e.preventDefault();
        setFormData({
            study: '',
            institution: '',
            Area: '',
            subarea: '',
            espacioFormativo: '',
            gestion: '',
            modalidad: '',
            duracion: '',
            franjaHoraria: '',
            search: '',
            nombre: '',
            nivel: '',
            address: '',
            domicilio: '',


        });
        setSubAreas([]);
        setGestion([]);
        setModalidadOptions([]);
        setFranjaHorariaOptions([]);
        setDuracionOptions([]);
        setEspacioFormativo([]);
        setShowResults(false);
        setNombre(null);

    };

    const fetchDetails = (result) => {
        setModalData(result);
        setIsModalOpen(true)
    }
    const handleDetallesClick = (detalles) => {
        setResult(detalles);
        setMostrarDetalles(true);
    };

    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responses = [];
            // Búsqueda por filtros
            const filterParams = `nombre=${formData.search || ''}&institucion=${formData.institution || ''}&Area=${formData.Area || ''}&subArea=${formData.subArea || ''}&modalidad=${formData.modalidad || ''}&espacioFormativo=${formData.espacioFormativo || ''}&franjaHoraria=${formData.franjaHoraria || ''}&gestion=${formData.gestion || ''}&duracion=${formData.duracion || ''}`;
            const responseFilter = await performSearch('filter', filterParams);
            responses.push({type: 'filter', data: responseFilter});
            const results = responses.map(({type, data}) => ({type, data}));
            setSearchResults(results);
            setShowResults(true);
       //     console.log('Results:', results);
       //     console.log('Responses:', responses);
        } catch (error) {
            console.error('Error en la solicitud al servidor:', error);
        }

    };

    useEffect(() => {

        const fetchSearch = async () => {
            try {
                const response = await fetch(`${apiUrl}search?`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setSearchResults([{type: 'search', data}]);
                setShowResults(true);

            } catch (error) {
                console.error('Error al cargar los filtros:', error);
            }
        };
        const fecthSearchFilter = async () => {
            try {
                const queryParams = {
                    nombre: formData.search || '',
                    institucion: formData.institution || '',
                    Area: formData.Area || '',
                    subArea: formData.subArea || '',
                    modalidad: formData.modalidad || '',
                    espacioFormativo: formData.espacioFormativo || '',
                    franjaHoraria: formData.franjaHoraria || '',
                    gestion: formData.gestion || '',
                    duracion: formData.duracion || '',
                };

                const filteredParams = Object.entries(queryParams)
                    .filter(([key, value]) => value !== undefined && value.trim() !== '')
                    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                    .join('&');

                const response = await performSearch('filter', filteredParams);
                setFiltro(response);
       //         console.log('a ver que trae data (response):', response);

                // Aplicar el filtro y actualizar los resultados
                handleFilterSearch(queryParams);
            } catch (error) {
                console.error('Error al cargar los filtros:', error);
            }
        };
        const fetchInstitutions = async () => {
            try {
                const response = await fetch(`${apiUrl}instituciones`);
                const data = await response.json();
        //        console.log('Instituciones:', data);
                setInstitutions(data);
            } catch (error) {
                console.error('Error al cargar la lista de instituciones:', error);
            }
        }
        const fetchAreas = async () => {
            try {
                const response = await fetch(`${apiUrl}area`);
                const data = await response.json();
        //        console.log('Áreas:', data);
                setAreas(data);
            } catch (error) {
                console.error('Error al cargar la lista de áreas:', error);
            }
        };
        const fetchSubAreas = async (selectedArea) => {
            try {
                if (selectedArea) {
                    selectedArea = String(selectedArea);
                    const response = await fetch(`${apiUrl}subArea?area=${selectedArea}`);
                    const data = await response.json();
                    setSubAreas(data);
                } else {
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
                // Verifica si data es un array antes de intentar usar .map() en él
                if (Array.isArray(data)) {
                    setEspacioFormativo(data.map((item) => item) || []);
                } else {
                    console.error('La respuesta de la API no es un array:', data);
                    // Puedes establecer espacioFormativo como un array vacío u otro valor predeterminado
                    setEspacioFormativo([]);
                }
     //           console.log('Espacio Formativo:', data?.ESPACIO_FORMATIVO || '');
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
                const response = await fetch(`${apiUrl}gestion?area=${formData.Area}&subArea=${formData.subArea}`);
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

       //         console.log('Opciones de Gestión:', gestionData);
            } catch (error) {
                console.error('Error al obtener opciones de gestión:', error);
            }
        };
        const fetchDuracionOptions = async () => {
            try {
                const response = await fetch(`${apiUrl}duracion?area=${formData.Area}&subArea=${formData.subArea}`);
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

        //        console.log('Opciones de Duración:', duracionData);
            } catch (error) {
                console.error('Error al obtener opciones de duración:', error);
            }
        };
        const fetchAddress = async () => {
            try {
                const response = await fetch(`${apiUrl}addres?institucion=${formData.institution}`);
                const data = await response.json();
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    address: data,
                }));
            } catch (error) {
                console.error('Error al obtener el domicilio:', error);
            }
        };

        fetchSearch();
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
        fetchAddress();
        fecthSearchFilter();

    }, [apiUrl, formData.study, formData.institution, formData.Area, formData.subArea, formData.search,]);

    return (
        <div className="Container p-12">
            <div className="row">
                <div className="container-fluid col-md-8 ">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="row-cols-auto mt-2">
                                <div className="row">
                                    <label htmlFor="search" aria-label="Seleccionar searcherd">
                                        Qué queres estudiar?
                                        <input
                                            type="text"
                                            className="form-control col-md-16"
                                            name="search"
                                            value={formData.search}
                                            onChange={handleChange}
                                            onReset={handleReset}
                                            style={{width: '100%'}} // Establece el mismo ancho para el input y el select
                                        />
                                    </label>
                                </div>
                                <div className="col-md-18 mb-3">
                                    <label htmlFor="institution" aria-label="Seleccionar instituciones">
                                        Institucion?
                                        <select
                                            className="form-control"
                                            name="institution"
                                            value={formData.institution}
                                            onChange={(e) => handleChange(e)}
                                            onReset={handleReset}
                                        >
                                            <option key="" value="">
                                                En que institucion te gustaria aprender
                                            </option>
                                            {institutions?.map((institution) => (
                                                <option
                                                    key={institution.institution}
                                                    value={institution.institution}
                                                >
                                                    {institution.DISPLAY_VALUE}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="Area">
                                    Area
                                    <select
                                        className="form-control"
                                        name="Area"
                                        value={formData.Area}
                                        onChange={handleChange}
                                    >
                                        <option key=" " value=" ">
                                            En que area te gustaria aprender?
                                        </option>
                                        {areas?.map((data) => (
                                            <option key={data.Area} value={data.AREA}>
                                                {data.AREA}
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
                                        <option key=" " value=" ">
                                            Seleccione una subárea
                                        </option>
                                        {subAreas?.map((data) => (
                                            <option key={data.subArea} value={data.DIS}>
                                                {data.DIS}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="espacioFormativo">
                                    Espacio Formativo:
                                    <select
                                        className="form-control"
                                        name="espacioFormativo"
                                        value={formData.espacioFormativo}
                                        onChange={handleChange}
                                    >
                                        <option key="" value="">
                                            Seleccione un espacio formativo
                                        </option>
                                        {Array.isArray(espacioFormativo) && espacioFormativo.map((data) => (
                                            <option key={data.ESPACIO_FORMATIVO} value={data.ESPACIO_FORMATIVO}>
                                                {data.ESPACIO_FORMATIVO}
                                            </option>
                                        ))};
                                    </select>
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
                                        <option key=" " value=" ">
                                            Tipo de Gestión preferis?
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
                                        <option key=" " value=" ">
                                            Que Modalidad preferis
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
                                        <option key=" " value=" ">
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
                                        <option key=" " value=" ">
                                            De cuanto tiempo buscas?
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
                            <div>
                                <ButtonComponent
                                    handleSubmit={handleSubmit}
                                    handleReset={handleReset}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-4 d-flex align-items-lef">
                    <Logo/>
                </div>
            </div>
            <div className="row">
                <FormResults
                    results={searchResults}
                    show={showResults}
                    handleDetallesClick={(data) => {
                        handleDetallesClick(data);
                    }}
                />
            </div>
            <div>
                <Modal detallesData={result} mostrarDetalles={mostrarDetalles}/>
            </div>

        </div>
    );
}
export default MinervaForm;