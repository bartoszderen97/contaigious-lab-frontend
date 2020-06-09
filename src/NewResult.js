import React from 'react';
import Auth from "./Auth";
import * as axios from "axios";

class NewResult  extends React.Component {

    constructor() {
        super();

        this.state = {
            illness_presence: "",
            unit_name: "",
            result_value: "",
            result_lowest_norm: "",
            result_highest_norm: "",
            added_by: "",
            application_id: "",
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
        this.setState({added_by:session.getUserId()});
        if (handle == 0)
            this.setState({application_id:""});
        else
            this.setState({application_id:handle});

    }

    handleSubmit(event) {
        let session = new Auth();
        const { illness_presence, unit_name, result_value,
            result_lowest_norm, result_highest_norm,
            added_by, application_id } = this.state;

        axios.post(
            "http://localhost/public/api/result/create",
            {

                illness_presence: illness_presence,
                unit_name: unit_name,
                result_value: result_value,
                result_lowest_norm: result_lowest_norm,
                result_highest_norm: result_highest_norm,
                added_by: added_by,
                application_id: application_id
            },{headers: {
                    Authorization: "Bearer "+session.getAuthToken()
                }}
        ).then(response => {
            if(response.data.status === 200){
                this.props.history.push('/results');
            }
            else {
                this.setState({
                    message: response.data.message
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
                    <h3>Formularz dodawania nowego wyniku</h3>

                    {this.state.message &&
                    <p className={"mb-0 in-valid"}>{this.state.message}</p>
                    }
                    <div className="form-group">
                        <label>
                            <span>Wynik ostateczny</span>
                        </label>
                        <input className="form-control" type="text" name="illness_presence" onChange={this.handleChange} value={this.state.illness_presence} placeholder="Wpisz tutaj 0 jeśli negatywny lub 1 jeśli pozytywny ..." required/>

                        {this.state.error.illness_presence &&
                        <p className={"mb-0 in-valid"}>{this.state.error.illness_presence[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Nazwa jednostki</span>
                        </label>
                        <input className="form-control" type="text" name="unit_name" onChange={this.handleChange} value={this.state.unit_name} placeholder="Wpisz tutaj g/mol , mm/Hg lub % ..."/>

                        {this.state.error.unit_name &&
                        <p className={"mb-0 in-valid"}>{this.state.error.unit_name[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Dolna granica</span>
                        </label>
                        <input className="form-control" type="text" name="result_lowest_norm" onChange={this.handleChange} value={this.state.result_lowest_norm} placeholder="Wpisz tutaj dolna granice ..."/>

                        {this.state.error.result_lowest_norm &&
                        <p className={"mb-0 in-valid"}>{this.state.error.result_lowest_norm[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Wartosc wyniku</span>
                        </label>
                        <input className="form-control" type="text" name="result_value" onChange={this.handleChange} value={this.state.result_value} placeholder="Wpisz tutaj wartosc wyniku ..."/>

                        {this.state.error.result_value &&
                        <p className={"mb-0 in-valid"}>{this.state.error.result_value[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Gorna granica</span>
                        </label>
                        <input className="form-control" type="text" name="result_highest_norm" onChange={this.handleChange} value={this.state.result_highest_norm} placeholder="Wpisz gorna granice ..."/>

                        {this.state.error.result_highest_norm &&
                        <p className={"mb-0 in-valid"}>{this.state.error.result_highest_norm[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Id zgłoszenia</span>
                        </label>
                        <input className="form-control" type="text" name="application_id" onChange={this.handleChange} value={this.state.application_id} placeholder="Wpisz tutaj id zgłoszenia ..." required/>

                        {this.state.error.application_id &&
                        <p className={"mb-0 in-valid"}>{this.state.error.application_id[0]}</p>
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

export default NewResult;