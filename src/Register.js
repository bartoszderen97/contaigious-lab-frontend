import React from 'react';
import {NavLink} from "react-router-dom";
import './Login.css';
import axios from "axios";
import Auth from "./Auth";

class Register  extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            pesel: null,
            gender: "",
            lang: "",
            error: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {

        const { first_name, last_name,
            email, password, password_confirmation,
            pesel, gender, lang } = this.state;

        axios.post(
            "http://localhost/public/api/auth/register",
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                pesel: pesel,
                gender: gender,
                lang: lang
            },
        )
            .then(response => {
                if(response.data.status === 200){
                    new Auth(response.data.token);
                    console.log("registered");
                    this.props.history.push('/logged-in');
                    window.location.reload(false);
                }
                else {
                    this.setState({
                        error: response.data.message
                    });
                }

            })
            .catch(error => {
                this.setState({
                    error: error.response.data.errors
                });
                console.log("register error", error);
            });
        event.preventDefault();
    }

    render() {
        return (<div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                                <h3 className="text-center text-info">Rejestracja</h3>

                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Imie:</label><br/>
                                    <input type="text" name="first_name" id="first_name" className="form-control"
                                           value={this.state.first_name} onChange={this.handleChange}/>
                                    {this.state.error.first_name &&
                                    <p className="mb-0 in-valid">{this.state.error.first_name[0]}</p>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Nazwisko:</label><br/>
                                    <input type="text" name="last_name" id="last_name" className="form-control"
                                           value={this.state.last_name} onChange={this.handleChange}/>
                                    {this.state.error.last_name &&
                                    <p className="mb-0 in-valid">{this.state.error.last_name[0]}</p>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">E-mail:</label><br/>
                                    <input type="text" name="email" id="username" className="form-control"
                                           value={this.state.email} onChange={this.handleChange}/>
                                    {this.state.error.email &&
                                    <p className={"mb-0 in-valid"}>{this.state.error.email[0]}</p>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Hasło:</label><br/>
                                    <input type="password" name="password" id="password" className="form-control"
                                           value={this.state.password} onChange={this.handleChange}/>
                                    {this.state.error.password &&
                                    <p className={"mb-0 in-valid"}>{this.state.error.password[0]}</p>
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Potwierdz hasło:</label><br/>
                                    <input type="password" name="password_confirmation" id="password_confirmation" className="form-control"
                                           value={this.state.password_confirmation} onChange={this.handleChange}/>
                                    {this.state.error.password_confirmation &&
                                    <p className="mb-0 in-valid">{this.state.error.password_confirmation[0]}</p>
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">PESEL:</label><br/>
                                    <input type="text" name="pesel" id="pesel" className="form-control"
                                           value={this.state.pesel} onChange={this.handleChange}/>
                                    {this.state.error.pesel &&
                                    <p className="mb-0 in-valid">{this.state.error.pesel[0]}</p>
                                    }
                                </div>

                                <div className="form-group d-block">
                                    <label htmlFor="password" className="text-info">Plec:</label><br/>
                                    {this.state.error.gender &&
                                    <p className="mb-0 in-valid">{this.state.error.gender[0]}</p>
                                    }
                                        <input className="mx-3" type="radio" name="gender" id="option1" autoComplete="off"
                                               value="F" onClick={this.handleChange} /> Kobieta

                                        <input className="mx-3" type="radio" name="gender" id="option2" autoComplete="off"
                                               value="M" onClick={this.handleChange} /> Mezczyzna

                                        <input className="mx-3" type="radio" name="gender" id="option3" autoComplete="off"
                                               value="O" onClick={this.handleChange} /> Inna
                                </div>

                                <div className="form-group d-block">
                                    <label htmlFor="password" className="text-info">Jezyk:</label><br/>
                                    {this.state.error.lang &&
                                    <p className="mb-0 in-valid">{this.state.error.lang[0]}</p>
                                    }
                                        <input className="mx-3" type="radio" name="lang" id="option1" autoComplete="off"
                                               value="pl" onClick={this.handleChange} /> Polski

                                        <input className="mx-3" type="radio" name="lang" id="option2" autoComplete="off"
                                               value="en" onClick={this.handleChange} /> English
                                </div>


                                <div className="form-group d-flex justify-content-between">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Zarejestruj"/>
                                </div>
                                <div id="register-link" className="form-group d-block text-left">
                                    <span>
                                        <NavLink className="text-info" to="/login">Zaloguj się</NavLink>
                                    </span>
                                    <span className="d-block">
                                        <NavLink className="text-info" to="/reset-password">Zresetuj hasło</NavLink>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
