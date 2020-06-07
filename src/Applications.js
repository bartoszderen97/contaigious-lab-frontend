import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEnvelope, faTrash  } from '@fortawesome/free-solid-svg-icons'
import Auth from "./Auth";

class Applications extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        filteredApplications: [],
        id_application: ""
    };

    handleChange(event) {
        this.setState({id_application:event.target.value});
    }

    handleSubmit(event) {
        let session = new Auth();
        axios.get('http://localhost/public/api/application/getSingle/'+this.state.id_application,{
            headers: {
                Authorization: "Bearer "+session.getAuthToken()
            }
        }).then(response => {
            if (response.status === 200){
                this.setState({filteredApplications:response.data.data});
            }
        }).catch(error => {

        });
        event.preventDefault();
    }

    handleDelete(idApplication) {
        let session = new Auth();
        axios.delete('http://localhost/public/api/application/delete/'+idApplication,{
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
        axios.get('http://localhost/public/api/application/getAll' ,{
            headers: {
                Authorization: "Bearer "+session.getAuthToken()
            }
        }).then(response => {
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
                    Jeśli szukasz zgłoszeń konkretnego zgłoszenia możesz skorzystac z wyszukiwarki
                </p>
                <form className="form-inline mr-auto mb-5">
                    <div className="container text-center">
                        <input className="form-control mr-sm-2" type="text" onChange={this.handleChange} placeholder="Wpisz tutaj id zgłoszenia..."/>
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
                    { this.state.filteredApplications.map((application, index) =>

                        <div className={"row my-2 parzyste" + index%2} key={application.id}>
                            <div className="col-md-1">
                                {application.id}
                            </div>
                            <div className="col">
                                {application.created_at.toString()}
                            </div>
                            <div className="col">
                                {application.patient.first_name+" "+application.patient.last_name}
                            </div>
                            <div className="col">
                                {application.patient.pesel}
                            </div>
                            <div className="col-md-3">
                                {application.examination.name}
                            </div>
                            <div className="col">
                                {application.applier.first_name+" "+application.applier.last_name}
                            </div>
                            <div className="col-md-2">
                                <button className="btn"  key={application.id} onClick={() => this.handleDelete(application.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                <a href={"mailto:"+application.patient.email}><button className="btn"><FontAwesomeIcon icon={faEnvelope} /></button></a>
                                <button className="btn"><FontAwesomeIcon icon={faEdit} /></button>
                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default Applications;