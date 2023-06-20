import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './UpdatePassword.css';
import LockIcon from '@mui/icons-material/Lock';
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify"
import Loader from "../Loader/Loader";

const LoginSignup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading, error, isUpdated} = useSelector(state => state.updateProfile)

    const [userData, setUserData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });


    useEffect(() => {



    }, [])



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userData)

    }

    const handleRegisterEmailChange = async (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Fragment>
            {loading && <Loader/>}
            <div className="wrapperContainer" style={{display: loading ? "none" : ""}}>
                <div className="wrapper">
                    <div className="title-text">
                        <div className="title login">Change Password</div>
                    </div>
                    <div className="form-container">
                        <div className="form-inner">
                            <form className="signup" onSubmit={handleSubmit}>
                                <div className="field flex">
                                    <LockIcon/>
                                    <input type="password" placeholder="Old password" name="oldPassword" value={userData.oldPassword}
                                           onChange={(e) => setUserData({
                                               ...userData,
                                               [e.target.name]: e.target.value
                                           })}/>
                                </div>
                                <div className="field flex">
                                    <LockIcon/>
                                    <input type="password" placeholder="New Password" name="newPassword"
                                           value={userData.newPassword} onChange={handleRegisterEmailChange}/>
                                </div>
                                <div className="field flex">
                                    <LockIcon/>
                                    <input type="password" placeholder="Confirm Password" name="confirmPassword"
                                           value={userData.confirmPassword} onChange={handleRegisterEmailChange}/>
                                </div>
                                <div className="field btn">
                                    <div className="btn-layer"></div>
                                    <input type="submit" value="SAVE"/>
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
