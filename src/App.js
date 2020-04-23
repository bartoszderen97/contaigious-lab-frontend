import React from 'react';
import logo from './logo.svg';
import Menu from './Menu.js';
import './App.css';
import Footer from './Footer.js';
import About from './About.js';
import Contact from './Contact.js';
import Login from './Login.js';
import Offer from './Offer.js';
import Home_page from './Home_page.js';
import {
    BrowserRouter as Router,
    Switch,
    Route
}
from "react-router-dom";



function App() {
    return (
        <div>
            <Router>
                <Menu />
                    <div className="container my-0 my-md-3">
                        <Switch>
                            <Route exact path={"/"} component={Home_page} />
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

export default App;
