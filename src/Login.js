import React from 'react';
import './Login.css';
import {NavLink} from 'react-router-dom';
import axios from "axios";
import Auth from "./Auth";

class Login  extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
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
        const { email, password } = this.state;

        axios.post(
                "http://localhost/public/api/auth/login",
                {
                    email: email,
                    password: password
                },
            )
            .then(response => {
                if(response.data.status === 200){
                    new Auth(response.data.token);
                    console.log("loggedIn");
                    this.props.history.push('/logged-in');
                    window.location.reload(false);
                }
                else {
                    this.setState({
                        error: response.data.errors
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: error.response.data.errors
                });
                console.log("login error", error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                                <h3 className="text-center text-info">Logowanie</h3>


                                {this.state.error.token &&
                                <p className={"mb-0 in-valid"}>{this.state.error.token}</p>
                                }

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

                                <div className="form-group d-flex justify-content-between">
                                    <label htmlFor="remember-me" className="text-info">
                                        <span>Zapamiętaj e-mail</span>
                                        <input id="remember-me" className="ml-3" name="remember-me" type="checkbox"/>
                                    </label>
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Zaloguj"/>
                                </div>
                                <div id="register-link" className="form-group d-block text-left">
                                    <span>
                                        <NavLink className="text-info" to="/register">Zarejestruj się</NavLink>
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

export default Login;