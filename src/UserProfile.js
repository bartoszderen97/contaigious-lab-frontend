import React from 'react';
import Auth from "./Auth";
import axios from "axios";

class UserProfile  extends React.Component {

    constructor() {
        super();

        this.state = {
            id_user: "",
            first_name: "",
            last_name: "",
            email: "",
            pesel: "",
            gender: "",
            lang: "",
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
        let session = new Auth();
        const { handle } = this.props.match.params;
        this.setState({id_user:handle});
        axios.get("http://localhost/public/api/user/getSingle/"+handle,{
            headers: {
                Authorization: "Bearer "+session.getAuthToken()
            }
        }).then(response => {
            if(response.data.status === 200){
                this.setState({
                    first_name: response.data.data.first_name,
                    last_name: response.data.data.last_name,
                    email: response.data.data.email,
                    pesel: response.data.data.pesel,
                    gender: response.data.data.gender,
                    lang: response.data.data.lang
                });
                console.log("elo");
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

    handleSubmit(event) {
        let session = new Auth();
        const { id_user, first_name, last_name, email, pesel, gender, lang } = this.state;
        axios.put(
            "http://localhost/public/api/user/update",
            {
                id_user: id_user,
                first_name: first_name,
                last_name: last_name,
                email: email,
                pesel: pesel,
                gender: gender,
                lang: lang
            },{headers: {
                    Authorization: "Bearer "+session.getAuthToken()
                }}
        ).then(response => {
            if(response.data.status === 200){
                this.props.history.push('/logged-in');
            }
            else {
                this.setState({
                    error: response.data.message
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
                    <h3>Dane użytkownika</h3>

                    <div className="form-group">
                        <label htmlFor="username" className="text-info">Imie:</label><br/>
                        <input type="text" name="first_name" id="first_name" className="form-control"
                               value={this.state.first_name} onChange={this.handleChange}/>
                        {this.state.error.first_name &&
                        <p className="mb-0 in-valid">{this.state.error.first_name[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="text-info">Nazwisko:</label><br/>
                        <input type="text" name="last_name" id="last_name" className="form-control"
                               value={this.state.last_name} onChange={this.handleChange}/>
                        {this.state.error.last_name &&
                        <p className="mb-0 in-valid">{this.state.error.last_name[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="text-info">E-mail:</label><br/>
                        <input type="text" name="email" id="username" className="form-control"
                               value={this.state.email} onChange={this.handleChange}/>
                        {this.state.error.email &&
                        <p className={"mb-0 in-valid"}>{this.state.error.email[0]}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="text-info">PESEL:</label><br/>
                        <input type="text" name="pesel" id="pesel" className="form-control"
                               value={this.state.pesel} onChange={this.handleChange}/>
                        {this.state.error.pesel &&
                        <p className="mb-0 in-valid">{this.state.error.pesel[0]}</p>
                        }
                    </div>
                    <div className="form-group d-block">
                        <label htmlFor="password" className="text-info">Plec (M - mezczyzne, F - kobieta, O - inna):</label><br/>
                        {this.state.error.gender &&
                        <p className="mb-0 in-valid">{this.state.error.gender[0]}</p>
                        }
                        <input className="mx-3" type="radio" name="gender" id="option1" checked={this.state.gender == "F"}
                               value="F" onClick={this.handleChange} /> Kobieta

                        <input className="mx-3" type="radio" name="gender" id="option2" checked={this.state.gender == "M"}
                               value="M" onClick={this.handleChange} /> Mezczyzna

                        <input className="mx-3" type="radio" name="gender" id="option3" checked={this.state.gender == "O"}
                               value="O" onClick={this.handleChange} /> Inna
                    </div>
                    <div className="form-group d-block">
                        <label htmlFor="password" className="text-info">Jezyk:</label><br/>
                        {this.state.error.lang &&
                        <p className="mb-0 in-valid">{this.state.error.lang[0]}</p>
                        }
                        <input className="mx-3" type="radio" name="lang" id="option1" checked={this.state.lang == "pl"}
                               value="pl" onClick={this.handleChange} /> Polski

                        <input className="mx-3" type="radio" name="lang" id="option2"  checked={this.state.lang == "en"}
                               value="en" onClick={this.handleChange} /> English
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary">Zapisz</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserProfile;