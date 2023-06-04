import React, {useEffect} from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../assets/images/logo.jpg";
import webfont from "webfontloader"
import "./Header.css"

const Header = () => {


    useEffect(() => {
        const Toggle = document.querySelector('#toggle');
        const overlay = document.querySelector('#overlay');
        const closeIcon = document.querySelector('#close');

        Toggle.addEventListener('click', () => {
            Toggle.classList.add('active');
            overlay.classList.add('open');
        });


        overlay.addEventListener('click', () => {
            Toggle.classList.remove('active');
            overlay.classList.remove('open');
        });


        return () => {
            Toggle.removeEventListener('click', () => {
                Toggle.classList.toggle('active');
                overlay.classList.toggle('open');
            });
            overlay.removeEventListener('click', () => {
                Toggle.classList.remove('active');
                overlay.classList.remove('open');
            });


        };
    }, []);


    return (
        <>
            <div className="button_container" id="toggle">
                <span className="top"></span>
                <span className="middle"></span>
                <span className="bottom"></span>
            </div>

            <div className="overlay" id="overlay" >
                <div id="close" >
                    <span className="top"></span>
                </div>
                <nav>
                    <ul>
                        <li><a >Home</a></li>
                        <li><a >Products</a></li>
                        <li><a >About</a></li>
                        <li><a >Contact</a></li>
                    </ul>
                </nav>
            </div>
        </>

    );
};

export default Header;
