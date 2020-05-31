import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEnvelope, faTrash  } from '@fortawesome/free-solid-svg-icons'

class Applications extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        filteredApplications: [],
        user_last_name: ""
    };

    handleChange(event) {
        this.setState({examName:event.target.value});
    }

    handleSubmit(event) {
        axios.get('http://localhost/public/api/application/getByName/'+this.state.examName).then(response => {
            if (response.status === 200){
                this.setState({filteredApplications:response.data.data});
            }
        }).catch(error => {

        });
        event.preventDefault();
    }

    componentDidMount() {

        axios.get('http://localhost/public/api/application/getAll').then(response => {
            if (response.status === 200){
                this.setState({filteredApplications:response.data.data});
            }
        })
    }

    render() {

        return (

            <div className="container text-center">
                <h1 className="my-5">Oto lista zgłoszeń na badania naszego laboratorium</h1>
                <p className="lead mb-5">
                    Jeśli szukasz zgłoszeń konkretnego użytkownika możesz skorzystac z wyszukiwarki
                </p>
                <form className="form-inline mr-auto mb-5">
                    <div className="container text-center">
                        <input className="form-control mr-sm-2" type="text" onChange={this.handleChange} placeholder="Wpisz tutaj nazwisko użytkownika..."/>
                        <button id="applications_search_btn" className="btn btn-primary btn-rounded btn-lg my-0"
                                type="button" onClick={this.handleSubmit}>Wyszukaj
                        </button>
                    </div>
                </form>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1">
                            <b>Id zgłoszenia</b>
                        </div>
                        <div className="col">
                            <b>Data zgłoszenia</b>
                        </div>
                        <div className="col">
                            <b>Imie i nazwisko</b>
                        </div>
                        <div className="col">
                            <b>Pesel</b>
                        </div>
                        <div className="col-md-3">
                            <b>Nazwa badania</b>
                        </div>
                        <div className="col">
                            <b>Zgłoszenie dodane przez</b>
                        </div>
                        <div className="col-md-2">
                            <b>Edycja</b>
                        </div>
                    </div>
                    { this.state.filteredApplications.map((applications, index) =>
                        <div className={"row my-2 parzyste" + index%2} key={applications.id}>

                            <div className="col-md-1">
                                {applications.id}
                            </div>
                            <div className="col">
                                {applications.created_at.toString()}
                            </div>
                            <div className="col">
                                {applications.patient.first_name+" "+applications.patient.last_name}
                            </div>
                            <div className="col">
                                {applications.patient.pesel}
                            </div>
                            <div className="col-md-3">
                                {applications.examination.name}
                            </div>
                            <div className="col">
                                {applications.applier.first_name+" "+applications.applier.last_name}
                            </div>
                            <div className="col-md-2">
                                <button className="btn"><FontAwesomeIcon icon={faTrash} /></button>
                                <button className="btn"><FontAwesomeIcon icon={faEnvelope} /></button>
                                <button className="btn"><FontAwesomeIcon icon={faEdit} /></button>
                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default Applications;