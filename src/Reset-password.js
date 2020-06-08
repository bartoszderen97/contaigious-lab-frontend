import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import Auth from "./Auth";

class ResetPassword  extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
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
        const { email } = this.state;

        axios.post(
            "http://localhost/public/api/auth/resetPassword",
            {
                email: email
            },
        )
            .then(response => {
                if(response.data.status === 200){
                    console.log("password resseting successfully");
                    this.props.history.push('/login');
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
                console.log("reset password error", error);
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
                                <h3 className="text-center text-info">Zresetuj hasło:</h3>

                                {this.state.error.email &&
                                <p className={"mb-0 in-valid"}>{this.state.error.email}</p>
                                }

                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">E-mail:</label><br/>
                                    <input type="text" name="email" id="username" className="form-control"
                                           value={this.state.email} onChange={this.handleChange}/>
                                </div>

                                <div className="form-group d-flex justify-content-between">
                                    <input type="submit" name="submit" className="btn btn-info btn-md" value="Zresetuj"/>
                                </div>
                                <div id="register-link" className="form-group d-block text-left">
                                    <span>
                                        <NavLink className="text-info" to="/register">Zarejestruj się</NavLink>
                                    </span>
                                    <span className="d-block">
                                        <NavLink className="text-info" to="/login">Zaloguj się</NavLink>
                                    </span>
                                    <span className="d-block">
                                        <NavLink className="text-info" to="/policy">Polityka prywatnosci</NavLink>
                                    </span>
                                    <span className="d-block">
                                        <NavLink className="text-info" to="/terms">Regulamin serwisu</NavLink>
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

export default ResetPassword;