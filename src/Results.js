import React from 'react';
import Auth from "./Auth";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

class Results extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        filteredResults: [],
        id_application: ""
    };

    handleChange(event) {
        this.setState({id_application:event.target.value});
    }

    handleSubmit(event) {
        let session = new Auth();
        axios.get('http://localhost/public/api/result/getSingle/'+this.state.id_application,{
            headers: {
                Authorization: "Bearer "+session.getAuthToken()
            }
        }).then(response => {
            if (response.status === 200){
                this.setState({filteredResults:response.data.data});
            }
        }).catch(error => {

        });
        event.preventDefault();
    }

    handleDelete(idresult) {
        let session = new Auth();
        axios.delete('http://localhost/public/api/result/delete/'+idresult,{
                headers: {
                    Authorization: "Bearer "+session.getAuthToken()
                }
            }
        ).then(response => {
            console.log("Zgloszenie usunięte");
            window.location.reload(false);
        }).catch(error => {
            console.log("Error "+error);
        });
    }

    componentDidMount() {

        let session = new Auth();
        axios.get('http://localhost/public/api/result/getAll' ,{
            headers: {
                Authorization: "Bearer "+session.getAuthToken()
            }
        }).then(response => {
            if (response.status === 200){
                this.setState({filteredResults:response.data.data});
            }
        })
    }

    showResult(val) {
        if(val) return 'pozytywny'
        else return 'negatywny';
    }

    render() {

        return (

            <div className="container text-center">
                <h1 className="my-5">Oto lista wyników badań naszego laboratorium</h1>
                <p className="lead mb-5">
                    Jeśli szukasz wyników do konkretnego zgłoszenia możesz skorzystac z wyszukiwarki
                </p>
                <form className="form-inline mr-auto mb-5">
                    <div className="container text-center">
                        <input className="form-control mr-sm-2" type="text" onChange={this.handleChange} placeholder="Wpisz tutaj id zgłoszenia..."/>
                        <button id="results_search_btn" className="btn btn-primary btn-rounded btn-lg my-0"
                                type="button" onClick={this.handleSubmit}>Wyszukaj
                        </button>
                    </div>
                </form>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            <b>Id zgłoszenia</b>
                        </div>
                        <div className="col-md-1">
                            <b>Data dodania</b>
                        </div>
                        <div className="col-md-1">
                            <b>Jednostka</b>
                        </div>
                        <div className="col-md-1">
                            <b>Dolna granica</b>
                        </div>
                        <div className="col-md-1">
                            <b>Wynik</b>
                        </div>
                        <div className="col-md-1">
                            <b>Gorna granica</b>
                        </div>
                        <div className="col-md-3">
                            <b>Zgłoszenie dodane przez</b>
                        </div>
                        <div className="col-md-1">
                            <b>Wynik ostateczny</b>
                        </div>
                        <div className="col-md-2">
                            <b>Edycja</b>
                        </div>
                    </div>
                    { this.state.filteredResults.map((result, index) =>

                        <div className={"row my-2 parzyste" + index%2} key={result.id}>
                            <div className="col-md-1">
                                {result.application_id}
                            </div>
                            <div className="col-md-1">
                                {result.created_at.toString()}
                            </div>
                            <div className="col-md-1">
                                {result.unit_name}
                            </div>
                            <div className="col-md-1">
                                {result.result_lowest_norm}
                            </div>
                            <div className="col-md-1">
                                {result.result_value}
                            </div>
                            <div className="col-md-1">
                                {result.result_highest_norm}
                            </div>
                            <div className="col-md-3">
                                {result.applier.first_name+" "+result.applier.last_name}
                            </div>
                            <div className="col-md-1">
                                {
                                    this.showResult(result.illness_presence)
                                }
                            </div>
                            <div className="col-md-2">
                                <button className="btn"  key={result.id} onClick={() => this.handleDelete(result.id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default Results;