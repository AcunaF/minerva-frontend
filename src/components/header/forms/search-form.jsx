import React, { useState } from 'react';
import Logo from '../../../components/logo/logo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';



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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones con los datos del formulario
        console.log('Datos del formulario:', formData);
    };

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
                                <label>
                                    Institución:
                                    <input className="form-control" name="Institution"
                                               value={formData.Institution}
                                               onChange={handleChange}/>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>
                                        Área:
                                        <input type="text" className="form-control" name="Area" value={formData.Area}
                                               onChange={handleChange}/>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>
                                        Sub-Área:
                                        <input className="form-control" name="SubArea" value={formData.SubArea}
                                                  onChange={handleChange}/>
                                    </label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label>
                                        Tipo Espacio Formativo:
                                        <input className="form-control" name="Type" value={formData.Type}
                                                  onChange={handleChange}/>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>
                                        Gestión:
                                        <input className="form-control" name="Management" value={formData.Management}
                                                  onChange={handleChange}/>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>
                                        Modalidad:
                                        <input className="form-control" name="Modality" value={formData.Modality}
                                                  onChange={handleChange}/>
                                    </label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label>
                                        Franja Horaria:
                                        <input className="form-control" name="Schedule" value={formData.Schedule}
                                                  onChange={handleChange}/>
                                    </label>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>
                                        Duración:
                                        <input className="form-control" name="Duration" value={formData.Duration}
                                                  onChange={handleChange}/>
                                    </label>
                                </div>
                            </div>


                        <div className="row mt-4">
                            <div className="col-md-6 mb-3">
                                <button type="submit" className="btn btn-primary">Buscar</button>
                            </div>
                            <div className="col-md-6 mb-3">
                                <button type="reset" className="btn btn-secondary">Limpiar búsqueda</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-4">
                    <Logo/>
                </div>
            </div>
        </div>
    );
};

export default FormularioConLogo;
