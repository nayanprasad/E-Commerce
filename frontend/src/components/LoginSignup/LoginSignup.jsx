import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './LoginSignup.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import {useSelector, useDispatch } from "react-redux";
import {login, signup, clearErrors} from "../../redux/actions/userAction";
import {toast} from "react-toastify"
import Loader from "../Loader/Loader";
import axios  from "axios";

const LoginSignup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading, error, user, isAuthenticated}  = useSelector(state => state.user)

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: undefined
    });


    useEffect(() => {

        if(error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if(isAuthenticated) {
            toast.success("Authenticated Successful");
            navigate("/")
        }


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


        return () => {
            signupBtn.removeEventListener("click", handleSignupBtnClick);
            loginBtn.removeEventListener("click", handleLoginBtnClick);
            signupLink.removeEventListener("click", handleSignupLinkClick);
        };
    }, [ error, loading, isAuthenticated]);


    const handleLoginSubmit = (event) => {
        event.preventDefault();

        dispatch(login(loginData.email, loginData.password))

    }

    const handleImageChange = (event) => {
        const image = event.target.files?.[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setSignupData({
                ...signupData,
                avatar: reader.result
            })
        }
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        // console.log(signupData)
        const formData = new FormData();
        formData.append("name", signupData.name);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);
        dispatch(signup(formData))
    }

    const handleRegisterEmailChange = async (event) => {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        });

        // const {data} = await axios.post("http://localhost:3000/api/v1/user/checkEmail", {email: event.target.value})
        // console.log(data)
    }


    return (
        <Fragment>
            {loading && <Loader/>}
            <div className="wrapperContainer">
                <div className="wrapper">
                    <div className="title-text">
                        <div className="title login">Login Form</div>
                        <div className="title signup">Signup Form</div>
                    </div>
                    <div className="form-container">
                        <div className="slide-controls">
                            <input type="radio" name="slide" id="login" defaultChecked/>
                            <input type="radio" name="slide" id="signup"/>
                            <label htmlFor="login" className="slide login">Login</label>
                            <label htmlFor="signup" className="slide signup">Signup</label>
                            <div className="slider-tab"></div>
                        </div>
                        <div className="form-inner">
                            <form className="login" onSubmit={handleLoginSubmit}>
                                <div className="field flex">
                                    <BadgeIcon/>
                                    <input type="text" placeholder="Email Address" name="email" value={loginData.email}
                                           onChange={(e) => setLoginData({
                                               ...loginData,
                                               [e.target.name]: e.target.value
                                           })} required/>
                                </div>
                                <div className="field flex">
                                    <LockIcon/>
                                    <input type="password" placeholder="Password" name="password"
                                           value={loginData.password} onChange={(e) => setLoginData({
                                        ...loginData,
                                        [e.target.name]: e.target.value
                                    })} required/>
                                </div>
                                <div className="pass-link"><a href="#">Forgot password?</a></div>
                                <div className="field btn">
                                    <div className="btn-layer"></div>
                                    <input type="submit" value="Login"/>
                                </div>
                                <div className="signup-link">Not a member? <a href="">Signup now</a></div>
                            </form>
                            <form className="signup" onSubmit={handleSignupSubmit}>
                                <div className="field flex">
                                    <BadgeIcon />
                                    <input type="text" placeholder="Name" required name="name" value={signupData.name}
                                           onChange={(e) => setSignupData({
                                               ...signupData,
                                               [e.target.name]: e.target.value
                                           })}/>
                                </div>
                                <div className="field flex">
                                    <EmailIcon />
                                    <input type="text" placeholder="Email Address" required name="email"
                                           value={signupData.email} onChange={handleRegisterEmailChange}/>
                                </div>
                                <div className="field flex">
                                    <LockIcon />
                                    <input type="password" placeholder="Password" required name="password"
                                           value={signupData.password} onChange={(e) => setSignupData({
                                        ...signupData,
                                        [e.target.name]: e.target.value
                                    })}/>
                                </div>
                                <div className="field flex FileSelector">
                                    {signupData.avatar ? (
                                        <img className="avatar" src={signupData.avatar} alt="Uploaded Avatar" />
                                    ) : (
                                        <AccountCircleIcon fontSize="large" />
                                    )}
                                    <input type="file" accept="image/*" name="avatar"  onChange={handleImageChange}/>
                                </div>
                                <div className="field btn">
                                    <div className="btn-layer"></div>
                                    <input type="submit" value="Signup"/>
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
