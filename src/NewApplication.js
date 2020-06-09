import React from 'react';
import Auth from "./Auth";
import * as axios from "axios";

class NewApplication  extends React.Component {

    constructor() {
        super();

        this.state = {
            id_patient: "",
            id_examination: "",
            applied_by: "",
            message: "",
            error: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {

        const { handle } = this.props.match.params;
        let session = new Auth();
        if(session.getUserRole() === "client") {
            this.setState({id_patient:session.getUserId()});
            this.setState({applied_by:session.getUserId()});
            this.setState({id_examination:handle});

            const {id_patient,applied_by, id_examination}=this.state;
            axios.post(
                "http://localhost/public/api/application/create",
                {
                    patient_id: id_patient,
                    examination_id: id_examination,
                    applied_by_id: applied_by
                },{headers: {
                        Authorization: "Bearer "+session.getAuthToken()
                    }}
            ).then(response => {
                if(response.data.status === 200){
                    this.props.history.push('/applications-history');
                    window.location.reload(false);
                }

            }).catch(error => {

            });
        }
        else {
            this.setState({applied_by:session.getUserId()});

        }
        if (handle == 0)
            this.setState({id_examination:""});
        else
            this.setState({id_examination:handle});
    }

    handleSubmit(event) {
        let session = new Auth();
        const { id_patient, id_examination, applied_by } = this.state;
        console.log("ok");
        axios.post(
            "http://localhost/public/api/application/create",
            {
                patient_id: id_patient,
                examination_id: id_examination,
                applied_by_id: applied_by
            },{headers: {
                    Authorization: "Bearer "+session.getAuthToken()
                }}
        ).then(response => {
            if(response.data.status === 200){
                if(session.getUserRole()=="client")
                this.props.history.push('/application-history');
                else this.props.history.push('/applications');
            }
            else {
                this.setState({
                    message: response.data.message
                });
            }
        }).catch(error => {
            if (error.response.data.message){
                this.setState({
                    message: error.response.data.message
                });

            }
            else {
                this.setState({
                    error: error.response.data.errors
                });
            }

        });
        event.preventDefault();
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h3>Formularz dodawania nowego zgłoszenia</h3>

                    {this.state.message &&
                    <p className={"mb-0 in-valid"}>{this.state.message}</p>}

                        <div className="form-group">
                        <label>
                            <span>Id pacjenta</span>
                        </label>
                        <input className="form-control" type="text" name="id_patient" onChange={this.handleChange} value={this.state.id_patient} placeholder="Wpisz tutaj id pacjenta ..."/>

                        {this.state.error.patient_id &&
                            <p className={"mb-0 in-valid"}>{this.state.error.patient_id[0]}</p>
                            }
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Id badania</span>
                        </label>
                        <input className="form-control" type="text" name="id_examination" onChange={this.handleChange} value={this.state.id_examination} placeholder="Wpisz tutaj id badania ..."/>

                        {this.state.error.examination_id&&
                        <p className={"mb-0 in-valid"}>{this.state.error.examination_id[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary">Zapisz</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewApplication;