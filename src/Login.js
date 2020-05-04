import React from 'react';
import './Login.css';
import {NavLink} from 'react-router-dom';

class Login  extends React.Component {
    render() {
        return (
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" action="" method="post">
                                <h3 className="text-center text-info">Logowanie</h3>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">E-mail:</label><br/>
                                    <input type="text" name="username" id="username" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Hasło:</label><br/>
                                    <input type="text" name="password" id="password" className="form-control"/>
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