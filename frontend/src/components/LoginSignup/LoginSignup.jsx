import React, {Fragment, useEffect} from 'react';
import './LoginSignup.css';

const LoginSignup = () => {

    useEffect(() => {
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        const loginBtn = document.querySelector("label.login");
        const signupBtn = document.querySelector("label.signup");
        const signupLink = document.querySelector("form .signup-link a");

        const handleSignupBtnClick = () => {
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        };

        const handleLoginBtnClick = () => {
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        };

        const handleSignupLinkClick = (event) => {
            signupBtn.click();
            event.preventDefault();
        };

        signupBtn.addEventListener("click", handleSignupBtnClick);
        loginBtn.addEventListener("click", handleLoginBtnClick);
        signupLink.addEventListener("click", handleSignupLinkClick);

        // Clean up event listeners on component unmount
        return () => {
            signupBtn.removeEventListener("click", handleSignupBtnClick);
            loginBtn.removeEventListener("click", handleLoginBtnClick);
            signupLink.removeEventListener("click", handleSignupLinkClick);
        };
    }, []);

    return (
        <Fragment>
            <div className="wrapperContainer">


            <div className="wrapper">
                <div className="title-text">
                    <div className="title login">Login Form</div>
                    <div className="title signup">Signup Form</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" defaultChecked />
                        <input type="radio" name="slide" id="signup" />
                        <label htmlFor="login" className="slide login">Login</label>
                        <label htmlFor="signup" className="slide signup">Signup</label>
                        <div className="slider-tab"></div>
                    </div>
                    <div className="form-inner">
                        <form action="#" className="login">
                            <div className="field">
                                <input type="text" placeholder="Email Address" required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" required />
                            </div>
                            <div className="pass-link"><a href="#">Forgot password?</a></div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Login" />
                            </div>
                            <div className="signup-link">Not a member? <a href="">Signup now</a></div>
                        </form>
                        <form action="#" className="signup">
                            <div className="field">
                                <input type="text" placeholder="Email Address" required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Password" required />
                            </div>
                            <div className="field">
                                <input type="password" placeholder="Confirm password" required />
                            </div>
                            <div className="field btn">
                                <div className="btn-layer"></div>
                                <input type="submit" value="Signup" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    );
};

export default LoginSignup;
