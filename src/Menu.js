import React from 'react';
import logo from './logo.png';
import './Menu.css';


function Menu() {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <a href="/home_page" className="navbar-brand">

                     <img id="logo" className="my-0 mr-md-auto" src={logo}
                          alt="Logo Laboratorium" />
                </a>
            </h5>



            <nav className="my-2 my-md-0 mr-md-3">

                <a className="menu-item" href="/home_page">Strona główna </a>
                <a className="menu-item" href="/about">O nas</a>
                <a className="menu-item" href="/offer">Oferta</a>
                <a className="menu-item" href="/contact">Kontakt</a>
            </nav>
            <a className="btn btn-outline-primary" href="#">Logowanie</a>
        </div>
    );
}

export default Menu;
