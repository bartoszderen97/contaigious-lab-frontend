import React from 'react';
import logo from './logo.png';


function Menu() {
    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">
                <a href="#" className="navbar-brand">

                     <img className="my-0 mr-md-auto font-weight-normal" src={logo} width="160"
                          alt="" className="d-inline-block align-middle mr-2"/>
                </a>
            </h5>



            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="#">Strona główna </a>
                <a className="p-2 text-dark" href="#">O nas</a>
                <a className="p-2 text-dark" href="#">Oferta</a>
                <a className="p-2 text-dark" href="#">Kontakt</a>
            </nav>
            <a className="btn btn-outline-primary" href="#">Logowanie</a>
        </div>
    );
}

export default Menu;
