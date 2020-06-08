import React from 'react';
import Auth from "./Auth";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

class ResultHistory  extends React.Component {

    constructor() {
        super();

        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        filteredResults: []
    };


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
        axios.get('http://localhost/public/api/result/getAllUser' ,{
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
        if(val) return 'pozytywny';
        else return 'negatywny';
    }

    render() {

        return (

            <div className="container text-center my-5">
                <h1 className="my-5">Historia wyników badań zalogowanego użytkownika</h1>
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

export default ResultHistory;