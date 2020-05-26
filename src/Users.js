import React from 'react';
import axios from "axios";

class Users extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        filteredUsers: [],
        user_last_name: ""
    };

    handleChange(event) {
        this.setState({examName:event.target.value});
    }

    handleSubmit(event) {
        axios.
        get('http://localhost/public/api/users/getByName/'+this.state.examName).
        then(response => {
            if (response.status === 200){
                this.setState({filteredUsers:response.data.data});
            }
        }).
        catch(error => {

        });
        event.preventDefault();
    }

    componentDidMount() {

        axios.
        get('http://localhost/public/api/user/getAll').
        then(response => {
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
                        <div className="col">
                            <b>Adres email</b>
                        </div>
                        <div className="col">
                            <b>pesel</b>
                        </div>
                        <div className="col">
                            <b>plec</b>
                        </div>
                        <div className="col">
                            <b>rola</b>
                        </div>
                    </div>
                        { this.state.filteredUsers.map(user =>
                            <div className="row" key={user.id}>

                                <div className="col">
                                    {user.first_name+" "+user.last_name}
                                </div>
                                <div className="col">
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
                            </div>)}
                </div>
            </div>
        );
    }
}

export default Users;