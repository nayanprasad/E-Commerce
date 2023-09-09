import React from 'react';
import playStore from "../../../assets/images/google-play.svg";
import appStore from "../../../assets/images/app-store.svg";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" onClick={() => window.open("https://play.google.com/store/apps")}/>
                <img src={appStore} alt="Appstore" onClick={() => window.open("https://www.apple.com/in/app-store/")}/>
            </div>
            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy;</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com">Instagram</a>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://facebook.com">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;
