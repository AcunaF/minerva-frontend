// src/components/Header.js
import React from 'react';

function Header() {
    return (
        <header>
            {/* Contenido del encabezado */}
            <h1>Mi Aplicación</h1>
        </header>
    );
}

export default Header;

/*     <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label>
                            Qué quieres estudiar o aprender?:
                            <input type="text" className="form-control" name="study" value={formData.study}
                                   onChange={handleChange}/>
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>
                            Institución:
                            <input type="text" className="form-control" name="Institution" value={formData.Institution}
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
                            <textarea className="form-control" name="SubArea" value={formData.SubArea}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>
                            Tipo Espacio Formativo:
                            <textarea className="form-control" name="Type" value={formData.Type}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>
                            Gestión:
                            <textarea className="form-control" name="Management" value={formData.Management}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>
                            Modalidad:
                            <textarea className="form-control" name="Modality" value={formData.Modality}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>
                            Franja Horaria:
                            <textarea className="form-control" name="Schedule" value={formData.Schedule}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>
                            Duración:
                            <textarea className="form-control" name="Duration" value={formData.Duration}
                                      onChange={handleChange}/>
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </div>
                    <div className="col-md-6 mb-3">
                        <button type="reset" className="btn btn-secondary">Limpiar búsqueda</button>
                    </div>
                </div>
            </form>*/
