// src/components/Header.js
import React from 'react';
import './header.css';
import LogoTandil from "../logo/logoTandil";
import Detalles from "../details/DetallesComponent";

function Header() {
    return (
        <container>
            <header>
                <nav className=" header-content navbar navbar-expand-lg">
                    <div className="col-lg-4 ">
                        <LogoTandil/>
                    </div>
                </nav>
            </header>
        </container>

    );
}

export default Header;

