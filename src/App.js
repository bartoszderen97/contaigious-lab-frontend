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
import Applications from './Applications.js';
import ApplicationHistory from './ApplicationHistory.js';
import ApplicationDetails from './ApplicationDetails.js';

import Results from "./Results";
import ResultHistory from "./ResultHistory";
import HomePage from './Home-page.js';
import {
    BrowserRouter as Router,
    Switch,
    Route
}
from "react-router-dom";
import {ProtectedRoute} from "./Protected.route";
import LoggedIn from "./LoggedIn";
import NewApplication from "./NewApplication";
import NewResult from "./NewResult";
import UserProfile from "./UserProfile";
import Regulamin from "./Regulamin";
import Polityka from "./Polityka";

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
                            <ProtectedRoute path={"/userProfile/:handle"} component={UserProfile} />
                            <ProtectedRoute path={"/applications"} component={Applications} />
                            <ProtectedRoute path={"/application-details/:handle"} component={ApplicationDetails} />
                            <ProtectedRoute path={"/application-history"} component={ApplicationHistory} />
                            <ProtectedRoute path={"/new-application/:handle"} component={NewApplication} />
                            <ProtectedRoute path={"/results"} component={Results} />
                            <ProtectedRoute path={"/result-history"} component={ResultHistory} />
                            <ProtectedRoute path={"/new-result/:handle"} component={NewResult} />
                            <Route path={"/register"} component={Register} />
                            <Route path={"/terms"} component={Regulamin} />
                            <Route path={"/policy"} component={Polityka} />
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
