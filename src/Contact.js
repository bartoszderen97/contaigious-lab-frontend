import React from 'react';

class Contact  extends React.Component {
    render() {
        return (
            <div className="container">
                <form>
                    <h3>Skontaktuj się z nami!</h3>
                    <div className="form-group">
                        <label>
                            <span>Imię</span>
                        </label>
                        <input className="form-control" type="text" name="name" placeholder="Wpisz tutaj swoje imię ..." required/>

                    </div>
                    <div className="form-group">
                        <label>
                            <span>E-mail</span>
                        </label>
                        <input className="form-control" type="email" name="email" placeholder="Wpisz tutaj swoj adres e-mail ..." required/>
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Telefon</span>
                        </label>
                        <input className="form-control" type="tel" name="phone" pattern="[0-9]{3} [0-9]{3} [0-9]{3}"
                               placeholder="Wpisz tutaj swoj nr telefonu w formacie 666 666 666 ..."/>
                    </div>
                    <div className="form-group">
                        <label>
                            <span>Message</span>
                        </label>
                        <textarea className="form-control" name="message" placeholder="Wpisz tutaj swoja wiadomość ..." required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-outline-primary">Wyslij</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Contact;