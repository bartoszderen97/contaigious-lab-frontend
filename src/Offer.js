import React from 'react';
import './Offer.css';

class Offer extends React.Component {
    render() {
        return (

            <div className="container text-center">
                <h1 className="my-5">Oto oferta naszego laboratorium</h1>
                <p className="lead mb-5">Tutaj możesz zapoznac sie z oferta naszego laboratorium <br/>
                    Jeśli szukasz konkretnego badania możesz skorzystac z wyszukiwarki
                </p>
                <form className="form-inline mr-auto mb-5">
                    <div className="container text-center">
                        <input className="form-control mr-sm-2" type="text" placeholder="Wpisz tutaj nazwe badania..."/>
                        <button id="offer_search_btn" className="btn btn-primary btn-rounded btn-lg my-0"
                                type="submit">Wyszukaj
                        </button>
                    </div>
                </form>

                <div className="card-deck mb-4 text-center">
                    <div className="card mb-4 box-shadow">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">COVID-19</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">300 PLN</h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>przeciwciala Ig-G</li>
                                <li>przeciwciala Ig-M</li>
                                <li>Skutecznosc 90%</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-primary">Zapisz sie</button>
                        </div>
                    </div>
                    <div className="card mb-4 box-shadow">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">AIDS</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">150 PLN</h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Certyfikowane przez WHO</li>
                                <li>Leukocyty HCX</li>
                                <li>Skutecznosc 99%</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-primary">Zapisz sie</button>
                        </div>
                    </div>
                    <div className="card mb-4 box-shadow">
                        <div className="card-header">
                            <h4 className="my-0 font-weight-normal">Ebola</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">50 PLN
                            </h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>Tylko na zamowienie</li>
                                <li>15% znizki w zakladzie pogrzebowym Swiety Spokoj</li>
                                <li>Skutecznosc 100%</li>
                            </ul>
                            <button type="button" className="btn btn-lg btn-block btn-primary">Zapisz sie</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Offer;