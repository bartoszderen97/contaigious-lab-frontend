import React from 'react';
import facebook from './icons/facebook.svg';
import twitter from './icons/twitter.svg';
import googleplus from './icons/google-plus.svg';
import youtube from './icons/youtube.svg';
import instagram from './icons/instagram.svg';
import linkedin from './icons/linkedin.svg';
import './Footer.css';


class Footer  extends React.Component {
    render() {
        return (
            <footer>
                    <div className="mb-1 text-center">
                        
                        <a href="https://www.facebook.com" target="_blank"><img className="footer-icon" src={facebook}/> </a>
                        <a href="https://www.instagram.com" target="_blank"><img className="footer-icon" src={instagram}/> </a>
                        <a href="https://www.twitter.com" target="_blank"><img className="footer-icon" src={twitter}/> </a>
                        <a href="https://www.facebook.com" target="_blank"><img className="footer-icon" src={googleplus}/> </a>
                        <a href="https://www.linkedin.com" target="_blank"><img className="footer-icon" src={linkedin}/> </a>
                        <a href="https://www.youtube.com" target="_blank"><img className="footer-icon" src={youtube}/> </a>

                    </div>

                <div className="footer-copyright text-center py-3">© 2020 Copyright: Contaigious lab</div>

            </footer>
        );
    }
}

export default Footer;