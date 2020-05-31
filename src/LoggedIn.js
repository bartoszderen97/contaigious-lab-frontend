import React from 'react';
import {NavLink} from "react-router-dom";
import Auth from "./Auth";

class LoggedIn  extends React.Component {

    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event) {
        let session = new Auth();
        session.logout();
        this.props.history.push('/login');
        window.location.reload(false);
    }

    render() {
        return (
            <div className="mx-auto my-5">
                <div className="text-center">

                    <NavLink to="/users">
                        <button type="button" className="list-group-item list-group-item-action">
                            Lista użytkowników
                        </button>
                    </NavLink>
                    <NavLink to="/applications">
                        <button type="button" className="list-group-item list-group-item-action">
                            Lista zgłoszeń na badania
                        </button>
                    </NavLink>
                    <NavLink to="/results">
                        <button type="button" className="list-group-item list-group-item-action">
                            Lista wyników badań
                        </button>
                    </NavLink>
                    <button type="button" className="list-group-item list-group-item-action" onClick={this.handleOnClick}>Wyloguj
                    </button>
                </div>
            </div>
        );
    }
}

export default LoggedIn;
