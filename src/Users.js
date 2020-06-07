import React from 'react';
import axios from "axios";
import './Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEnvelope, faTrash  } from '@fortawesome/free-solid-svg-icons'
import Auth from "./Auth";


class Users extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = {
        filteredUsers: [],
        user_last_name: ""
    };

    handleChange(event) {
        this.setState({user_last_name:event.target.value});
    }

    handleSubmit(event) {
        let session = new Auth();
        axios.get('http://localhost/public/api/user/getByName/'+this.state.user_last_name,{
                headers: {
                    Authorization: "Bearer "+session.getAuthToken()
                }
            }
        ).then(response => {
            if (response.status === 200){
                this.setState({filteredUsers:response.data.data});
            }
        }).
        catch(error => {

        });
        event.preventDefault();
    }

    handleDelete(user) {
        let session = new Auth();
        axios.delete('http://localhost/public/api/user/delete/'+user,{
                headers: {
                    Authorization: "Bearer "+session.getAuthToken()
                }
            }
        ).then(response => {
            console.log("Użytkownik usunięty");
            window.location.reload(false);
        }).catch(error => {
            console.log("Error "+error);
        });
    }

    componentDidMount() {

        let session = new Auth();
        axios.get('http://localhost/public/api/user/getAll',{
            headers: {
                Authorization: "Bearer "+session.getAuthToken()
            }
        }).then(response => {
            if (response.status === 200){
                this.setState({filteredUsers:response.data.data});
            }
        })
    }

    render() {

        return (

            <div className="container text-center">
                <h1 className="my-5">Oto lista użytkowników naszego laboratorium</h1>
                <p className="lead mb-5">
                    Jeśli szukasz konkretnego użytkownika możesz skorzystac z wyszukiwarki
                </p>
                <form className="form-inline mr-auto mb-5">
                    <div className="container text-center">
                        <input className="form-control mr-sm-2" type="text" onChange={this.handleChange} placeholder="Wpisz tutaj nazwisko użytkownika..."/>
                        <button id="user_search_btn" className="btn btn-primary btn-rounded btn-lg my-0"
                                type="button" onClick={this.handleSubmit}>Wyszukaj
                        </button>
                    </div>
                </form>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <b>Imie i nazwisko</b>
                        </div>
                        <div className="col-md-3">
                            <b>Adres email</b>
                        </div>
                        <div className="col">
                            <b>Pesel</b>
                        </div>
                        <div className="col">
                            <b>Płeć</b>
                        </div>
                        <div className="col">
                            <b>Rola</b>
                        </div>
                        <div className="col">
                            <b>Edycja</b>
                        </div>

                    </div>
                        { this.state.filteredUsers.map((user, index) =>

                            <div className={"row my-2 parzyste" + index%2} key={user.id}>

                                <div className="col">
                                    {user.first_name+" "+user.last_name}
                                </div>
                                <div className="col-md-3" >
                                    {user.email}
                                </div>
                                <div className="col">
                                    {user.pesel}
                                </div>
                                <div className="col">
                                    {user.gender}
                                </div>
                                <div className="col">
                                    {user.role}
                                </div>
                                <div className="col">
                                    <button className="btn" key={user.id} onClick={() => this.handleDelete(user.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                    <a href={"mailto:"+user.email}><button className="btn"><FontAwesomeIcon icon={faEnvelope} /></button></a>
                                    <button className="btn"><FontAwesomeIcon icon={faEdit} /></button>
                                </div>
                            </div>)}
                </div>
            </div>
        );
    }
}

export default Users;