import React, {Fragment, useRef} from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import MetaDate from "../MetaDate";
import "./Profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const {user, loading, isAuthenticated} = useSelector(state => state.user);

    return (
        <Fragment>
            <MetaDate title={`${user?.name}'s Profile`} />
                <div className="profileContainer">
                    <div className="profile">
                        <h2>My Profile</h2>
                        <div className="profileDetails">
                            <div className="profileDetailsLeft">
                                <img src={user?.avatar.url} alt={user?.name}/>
                                <Link to="/profile/update"><button>Edit Profile</button></Link>
                            </div>
                            <div className="profileDetailsRight">
                                <div>
                                    <h4>Full Name</h4>
                                    <p>{user?.name}</p>
                                </div>
                                <div>
                                    <h4>Email Address</h4>
                                    <p>{user?.email}</p>
                                </div>
                                <div>
                                    <h4>Joined On</h4>
                                    <p>{(String(user?.createdAt).substring(8, 10))}-{(String(user?.createdAt).substring(5, 7))}-{(String(user?.createdAt).substring(0, 4))}</p>

                                </div>
                                <div>
                                   <button onClick={() => navigate("/profile/myorders")}> My Orders</button>
                                    <button onClick={() => navigate("/profile/changePassword")}>Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    );
};

export default Profile;
