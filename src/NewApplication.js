import React from 'react';
import Auth from "./Auth";
import * as axios from "axios";

class NewApplication  extends React.Component {

    constructor() {
        super();

        this.state = {
            id_patient: "",
            id_examination: "",
            applied_by: ""
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

            axios.post(
                "http://localhost/public/api/application/create",
                {
                    patient_id: this.state.id_patient,
                    examination_id: this.state.id_examination,
                    applied_by_id: this.state.applied_by
                },{headers: {
                        Authorization: "Bearer "+session.getAuthToken()
                    }}
            ).then(response => {
                if(response.data.status === 200){
                    this.props.history.push('/applications-history');
                    window.location.reload(false);
                }
                else {
                    this.setState({
                        error: response.data.errors
                    });
                }
            }).catch(error => {
                this.setState({
                    error: error.response.data.errors
                });
            });
        }
        else {
            this.setState({applied_by:session.getUserId()});
            if (handle == 0)
                this.setState({id_examination:""});
            else
                this.setState({id_examination:handle});
        }
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
                this.props.history.push('/applications');
            }
            else {
                this.setState({
                    error: response.data.errors
                });
            }
        }).catch(error => {
            this.setState({
                error: error.response.data.errors
            });
        });
        event.preventDefault();
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h3>Formularz dodawania nowego zgłoszenia</h3>
                    <div className="form-group">
                        <label>
                            <span>Id pacjenta</span>
                        </label>
                        <input className="form-control" type="text" name="id_patient" onChange={this.handleChange} value={this.state.id_patient} placeholder="Wpisz tutaj id pacjenta ..." required/>

                    </div>
                    <div className="form-group">
                        <label>
                            <span>Id badania</span>
                        </label>
                        <input className="form-control" type="text" name="id_examination" onChange={this.handleChange} value={this.state.id_examination} placeholder="Wpisz tutaj id badania ..." required/>
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