import React from 'react';
import './Offer.css';
import axios from "axios";

class Offer extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        filteredExaminations: [],
        examName: ""
    };

    handleChange(event) {
        this.setState({examName:event.target.value});
    }

    handleSubmit(event) {
        axios.
        get('http://localhost/public/api/examination/getByName/'+this.state.examName).
        then(response => {
            if (response.status === 200){
                this.setState({filteredExaminations:response.data.data});
            }
        }).
        catch(error => {

        });
        event.preventDefault();
    }

    componentDidMount() {

        axios.
        get('http://localhost/public/api/examination/getAll').
        then(response => {
            if (response.status === 200){
                this.setState({filteredExaminations:response.data.data});
            }
        })
    }

    render() {

        return (

            <div className="container text-center">
                <h1 className="my-5">Oto oferta naszego laboratorium</h1>
                <p className="lead mb-5">Tutaj możesz zapoznac sie z oferta naszego laboratorium <br/>
                    Jeśli szukasz konkretnego badania możesz skorzystac z wyszukiwarki
                </p>
                <form className="form-inline mr-auto mb-5">
                    <div className="container text-center">
                        <input className="form-control mr-sm-2" type="text" onChange={this.handleChange} placeholder="Wpisz tutaj nazwe badania..."/>
                        <button id="offer_search_btn" className="btn btn-primary btn-rounded btn-lg my-0"
                                type="button" onClick={this.handleSubmit}>Wyszukaj
                        </button>
                    </div>
                </form>
                <div className="card-deck mb-4 text-center">
                    { this.state.filteredExaminations.map(exam =>
                        <div className="card mb-4 box-shadow" key={exam.id}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">{exam.name}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">{exam.pricePLN} PLN</h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    {exam.details.map((detail, key) => <li key={key}>{detail}</li>)}
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">Zapisz sie</button>

                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default Offer;