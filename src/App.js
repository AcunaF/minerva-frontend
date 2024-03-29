import './App.css';
import React, {useState} from 'react';
import Header from '../src/components/header/header';
import Footer from '../src/components/footer/footer';
import SearchForm from "./components/forms/search-form";
import Banner from "./components/banner/banner";


function App() {

    const [searchData, setSearchData] = useState({
        area: '',
        modalidad: '',
        institucion: '',
        duracion: '',
        subarea: '',
        nombre: '',
        espacioFormativo: '',
        gestion: '',
    });
    const handleSearchDataChange = (newData) => {
        setSearchData(newData);
    };
    const handleSubmit = (e) => {
        alert('Formulario enviado')
    };
    const handleReset = (e) => {
        alert('Formulario reseteado')
    };

    return (

            <main>
                <div className="container-fluid">
                    <Header/>
                    <Banner/>
                    <div className="container">
                        <SearchForm handleSearchDataChange={handleSearchDataChange}
                                    handleSubmit={handleSubmit}
                                    handleReset={handleReset}/>
                    </div>
                    <div className="footer">
                        <Footer/>
                    </div>
                </div>
            </main>

    );
}

export default App;