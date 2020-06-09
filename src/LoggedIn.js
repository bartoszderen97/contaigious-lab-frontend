import React from 'react';
import {NavLink} from "react-router-dom";
import Auth from "./Auth";

class LoggedIn  extends React.Component {

    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.state = {
            userID: null,
            userRole:null
        };
    }

    componentDidMount() {
        let session = new Auth();
        this.setState({userID:session.getUserId()});
        this.setState({userRole:session.getUserRole()});
    }

    handleOnClick(event) {
        let session = new Auth();
        session.logout();
        this.props.history.push('/login');
        window.location.reload(false);
    }

    render() {
        if (this.state.userRole == "admin") {
            return (
                <div className="mx-auto my-5">
                    <div className="text-center">

                        <h2>Menu administratora</h2>
                        <NavLink to={"/userProfile/"+this.state.userID}>
                            <button type="button" className="list-group-item list-group-item-action">
                                Profil użytkownika
                            </button>
                        </NavLink>
                        <NavLink to="/application-history">
                            <button type="button" className="list-group-item list-group-item-action">
                                Historia zgłoszeń na badania
                            </button>
                        </NavLink>
                        <NavLink to="/result-history">
                            <button type="button" className="list-group-item list-group-item-action">
                                Historia wyników badań
                            </button>
                        </NavLink>
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
                        <NavLink to="/new-application/0">
                            <button type="button" className="list-group-item list-group-item-action">
                                Dodaj zgłoszenie na badanie
                            </button>
                        </NavLink>
                        <NavLink to="/results">
                            <button type="button" className="list-group-item list-group-item-action">
                                Lista wyników badań
                            </button>
                        </NavLink>
                        <NavLink to="/new-result/0">
                            <button type="button" className="list-group-item list-group-item-action">
                                Dodaj wynik badania
                            </button>
                        </NavLink>
                        <button type="button" className="list-group-item list-group-item-action" onClick={this.handleOnClick}>Wyloguj
                        </button>
                    </div>
                </div>
            );
        }
        else if (this.state.userRole === "worker") {
            return (
                <div className="mx-auto my-5">
                    <div className="text-center">

                        <h2>Menu pracownika</h2>
                        <NavLink to={"/userProfile/"+this.state.userID}>
                            <button type="button" className="list-group-item list-group-item-action">
                                Profil użytkownika
                            </button>
                        </NavLink>
                        <NavLink to="/application-history">
                            <button type="button" className="list-group-item list-group-item-action">
                                Historia zgłoszeń na badania
                            </button>
                        </NavLink>
                        <NavLink to="/result-history">
                            <button type="button" className="list-group-item list-group-item-action">
                                Historia wyników badań
                            </button>
                        </NavLink>
                        <NavLink to="/applications">
                            <button type="button" className="list-group-item list-group-item-action">
                                Lista zgłoszeń na badania
                            </button>
                        </NavLink>
                        <NavLink to="/new-application/0">
                            <button type="button" className="list-group-item list-group-item-action">
                                Dodaj zgłoszenie na badanie
                            </button>
                        </NavLink>
                        <NavLink to="/results">
                            <button type="button" className="list-group-item list-group-item-action">
                                Lista wyników badań
                            </button>
                        </NavLink>
                        <NavLink to="/new-result/0">
                            <button type="button" className="list-group-item list-group-item-action">
                                Dodaj wynik badania
                            </button>
                        </NavLink>
                        <button type="button" className="list-group-item list-group-item-action" onClick={this.handleOnClick}>Wyloguj
                        </button>
                    </div>
                </div>
            );
        }
        else  {
            return (
                <div className="mx-auto my-5">
                    <div className="text-center">

                        <h2>Menu pacjenta</h2>
                        <NavLink to={"/userProfile/"+this.state.userID}>
                            <button type="button" className="list-group-item list-group-item-action">
                                Profil użytkownika
                            </button>
                        </NavLink>
                        <NavLink to="/application-history">
                            <button type="button" className="list-group-item list-group-item-action">
                                Historia zgłoszeń na badania
                            </button>
                        </NavLink>
                        <NavLink to="/result-history">
                            <button type="button" className="list-group-item list-group-item-action">
                                Historia wyników badań
                            </button>
                        </NavLink>
                        <NavLink to="/new-application/0">
                            <button type="button" className="list-group-item list-group-item-action">
                                Dodaj zgłoszenie na badanie
                            </button>
                        </NavLink>
                        <button type="button" className="list-group-item list-group-item-action" onClick={this.handleOnClick}>Wyloguj
                        </button>
                    </div>
                </div>
            );
        }

    }
}

export default LoggedIn;
