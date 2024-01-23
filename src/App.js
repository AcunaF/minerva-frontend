import './App.css';
import React from 'react';
import Header from '../src/components/header/header';
import Footer from '../src/components/footer/footer';
import SearchForm from "./components/forms/search-form";
import FormResults from "./components/forms/form-results";

function App() {
    return (
        <div>
            <Header/>
            <main>
                <div className="texto">
                    <h2> Minerva : Guía de Cursos y Carreras</h2>
                    <h4>Te acercamos una herramienta de acceso ordenado a información sobre talleres, cursos y carreras,
                        dictados en Instituciones públicas y privadas de nuestra ciudad y la zona.</h4>
                </div>
              <div>
                <SearchForm/>
              </div>
                <div>
                    <FormResults/>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default App;
