import React from 'react';
import logo from './logo.svg';
import './Menu.css';
import {NavLink} from 'react-router-dom';
import Auth from "./Auth";


class Menu  extends React.Component {

    componentDidMount() {
        let session = new Auth();
        if(session.isTokenValid()) {
            return <NavLink className="btn btn-outline-primary" to="/logged-in"> Menu klienta </NavLink>;
        }
        else {
            return <NavLink className="btn btn-outline-primary" to="/login"> Logowanie </NavLink>;
        }
    }

    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">

                <h5 className="my-0 mr-md-auto font-weight-normal">

                    <NavLink className="navbar-brand" to="/">
                            <img id="logo" className="my-0 mr-md-auto" src={logo} alt="Logo Laboratorium" />
                    </NavLink>

                </h5>

                <nav className="my-2 my-md-0 mr-md-3">

                    <NavLink className="menu-item" to="/offer"> Oferta </NavLink>
                    <NavLink className="menu-item" to="/contact"> Kontakt </NavLink>

                </nav>
                {this.componentDidMount()}


            </div>
        );
    }
}

export default Menu;
