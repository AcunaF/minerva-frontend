import React, {useState} from 'react';

const SearchFilter = ({onBuscar}) => {
    const [filtro, setFiltro] = useState('');

    const handleChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Puedes pasar el filtro al componente principal u otro lugar según tus necesidades
        onBuscar(filtro);
    };

    return (

        <div className="container mt-4">
            <div className="col-md-13 mb-xl-4 ml-auto">
                <label htmlFor="study">Qué quieres estudiar o aprender?</label>
                <input
                    type="text"
                    id="study"
                    className="form-control"
                    name="study"
                    value={filtro}
                    onChange={handleChange}
                />
            </div>
            <div>
                <br></br>
                <button type="submit" className="btn btn-primary">Buscar</button>
            </div>
        </div>

    );
};

export default SearchFilter;
