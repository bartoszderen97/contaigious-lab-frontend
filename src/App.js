import React from 'react';
import Menu from './Menu.js';
import './App.css';
import Footer from './Footer.js';
import About from './About.js';
import Contact from './Contact.js';
import Login from './Login.js';
import Offer from './Offer.js';
import HomePage from './Home-page.js';
import {
    BrowserRouter as Router,
    Switch,
    Route
}
from "react-router-dom";

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
                            <Route path={"/about"} component={About} />
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
