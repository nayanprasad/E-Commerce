import React, {Fragment, useEffect, useState} from "react";
import "./EditUser.css";
import {useDispatch, useSelector} from "react-redux";
import {adminGetUserDetails, adminUpdateUser, clearErrors} from "../../../redux/actions/userAction";
import {ADMIN_USER_DETAILS_RESET, ADMIN_USER_UPDATE_RESET} from "../../../redux/constants/userConstant";
import {useNavigate, useParams} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../Loader/Loader";
import CategoryIcon from '@mui/icons-material/Category';
import {toast} from "react-toastify";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const EditProduct = () => {

    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading, error, user} = useSelector(state => state.adminUserDetails);
    const {loading: updateLoading, error: updateError, isUpdated} = useSelector(state => state.adminUserUpdate);

    const [image, setImage] = useState("")
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        role: "",
        avatar: ""
    })


    useEffect(() => {
        dispatch(adminGetUserDetails(id));
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            toast.error(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Updated successfully")
            navigate("/admin/users");
            dispatch({type: ADMIN_USER_DETAILS_RESET})
            dispatch({type: ADMIN_USER_UPDATE_RESET})
        }
    }, [error, updateError, id, dispatch, isUpdated]);


    useEffect(() => {
        setUserData(user);
    }, [user]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (event) => {
        const image = event.target.files?.[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setImage(reader.result)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userData)
        console.log(image)
        const formData = new FormData();
        formData.set("name", userData.name);
        formData.set("email", userData.email);
        formData.set("role", userData.role);
        if (image) {
            formData.set("avatar", image);
        }

        dispatch(adminUpdateUser(id, formData));
    }

    return (
        <Fragment>

            {loading || updateLoading && <Loader/>}

            <div className="createContainer">

                <div className="sidebarCreate">
                    <Sidebar/>
                </div>

                <div className="wrapperContainer" style={{display: loading ? "none" : ""}}>
                    <div className="wrapper">
                        <div className="title-text">
                            <div className="title login">Update Profile</div>
                        </div>
                        <div className="form-container">
                            <div className="form-inner">
                                <form className="signup" onSubmit={handleSubmit}>
                                    <div className="field flex">
                                        <BadgeIcon/>
                                        <input type="text" placeholder="Name" name="name" value={userData.name}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <EmailIcon/>
                                        <input type="text" placeholder="Email Address" name="email"
                                               value={userData.email} onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <CategoryIcon/>
                                        <select className={userData.role === "" ? "grayColor" : "blackColor"}
                                                name="role" id="role" onChange={handleChange}>
                                            <option value="" disabled={true}>Select Role</option>
                                            <option value="admin" selected={userData.role === "admin"}>Admin</option>
                                            <option value="user" selected={userData.role === "user"}>User</option>
                                        </select>
                                    </div>
                                    <div className="field flex FileSelector">
                                        {userData?.avatar ? (
                                            image ?
                                                <img className="avatar" src={image} alt="avatar"/>
                                                :
                                                <img className="avatar" src={userData.avatar.url} alt="Avatar"/>
                                        ) : (
                                            <AccountCircleIcon fontSize="large"/>
                                        )}
                                        <input type="file" accept="image/*" name="avatar" onChange={handleImageChange}/>
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
            </div>
        </Fragment>
    );
};

export default EditProduct;
