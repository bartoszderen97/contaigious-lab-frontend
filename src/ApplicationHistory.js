import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faInfo, faTrash} from "@fortawesome/free-solid-svg-icons";
import Auth from "./Auth";
import axios from "axios";

class ApplicationHistory  extends React.Component {

    constructor() {
        super();

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
        axios.get('http://localhost/public/api/application/getAllUser' ,{
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
                <h2> Historia zgłoszeń na badania zalogowanego użytkownika </h2>
                <div className="container my-5">
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
                                <button className="btn"><FontAwesomeIcon icon={faInfo} /></button>
                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default ApplicationHistory;