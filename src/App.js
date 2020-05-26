import React from 'react';
import './App.css';
import Menu from './Menu.js';
import Footer from './Footer.js';
import Contact from './Contact.js';
import Login from './Login.js';
import Register from './Register.js';
import ResetPassword from './Reset-password.js';
import Offer from './Offer.js';
import Users from './Users.js';
import HomePage from './Home-page.js';
import {
    BrowserRouter as Router,
    Switch,
    Route
}
from "react-router-dom";
import {ProtectedRoute} from "./Protected.route";
import LoggedIn from "./LoggedIn";

class App extends React.Component{
    render() {
        return (
            <div>
                <Router>
                    <Menu />
                    <div className="row mx-5">
                        <Switch>
                            <Route exact path={"/"} component={HomePage} />
                            <Route path={"/login"} component={Login} />
                            <ProtectedRoute path={"/logged-in"} component={LoggedIn} />
                            <ProtectedRoute path={"/users"} component={Users} />
                            <Route path={"/register"} component={Register} />
                            <Route path={"/reset-password"} component={ResetPassword} />
                            <Route path={"/offer"} component={Offer} />
                            <Route path={"/contact"} component={Contact} />
                        </Switch>
                    </div>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
