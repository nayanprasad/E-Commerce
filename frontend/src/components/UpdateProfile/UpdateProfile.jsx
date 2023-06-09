import React, {Fragment, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './UpdateProfile.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import {useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify"
import Loader from "../Loader/Loader";
import {updateProfile} from "../../redux/actions/userAction";
import {UPDATE_PROFILE_RESET} from "../../redux/constants/userConstant";

const LoginSignup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user)
    const {loading, error, isUpdated}  = useSelector(state => state.updateProfile)

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: ""
    });


    useEffect(() => {

        if(user) {
            setUserData({
                name: user.name,
                email: user.email,
                avatar: user.avatar.url
            })
        }

        if(error) {
            toast.error(error);
        }

        if(isUpdated) {
            toast.success("Profile Updated Successfully");
            user.name = userData.name;   // This is done so that the updated the state
            user.email = userData.email;
            user.avatar.url = userData.avatar;
            navigate("/profile")
            dispatch({type: UPDATE_PROFILE_RESET})
        }

    }, [dispatch, error, isUpdated])



    const handleImageChange = (event) => {
        const image = event.target.files?.[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setUserData({
                ...userData,
                avatar: reader.result
            })
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(userData)
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("avatar", userData.avatar);

        dispatch(updateProfile(formData))

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
                        <div className="title login">Update Profile</div>
                    </div>
                    <div className="form-container">
                        <div className="form-inner">
                            <form className="signup" onSubmit={handleSubmit}>
                                <div className="field flex">
                                    <BadgeIcon />
                                    <input type="text" placeholder="Name" name="name" value={userData.name}
                                           onChange={(e) => setUserData({
                                               ...userData,
                                               [e.target.name]: e.target.value
                                           })}/>
                                </div>
                                <div className="field flex">
                                    <EmailIcon />
                                    <input type="text" placeholder="Email Address" name="email"
                                           value={userData.email} onChange={handleRegisterEmailChange}/>
                                </div>
                                <div className="field flex FileSelector">
                                    {userData.avatar ? (
                                        <img className="avatar" src={userData.avatar} alt="Uploaded Avatar" />
                                    ) : (
                                        <AccountCircleIcon fontSize="large" />
                                    )}
                                    <input type="file" accept="image/*" name="avatar"  onChange={handleImageChange}/>
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
