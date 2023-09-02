import React, {Fragment, useEffect, useState} from "react";
import "./EditUser.css";
import {useDispatch, useSelector} from "react-redux";
import {updateProduct, getProductDetails} from "../../../redux/actions/productAction";
import {useNavigate, useParams} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../Loader/Loader";
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AbcIcon from '@mui/icons-material/Abc';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {toast} from "react-toastify";
import {ADMIN_NEW_PRODUCT_EDIT_RESET} from "../../../redux/constants/productConstant";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import RestoreIcon from '@mui/icons-material/Restore';
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const categories = [
    "mobile",
    "laptop",
    "camera",
    "headphone",
    "accessories",
    "speaker",
    "electronics",
];


const EditProduct = () => {

    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {loading, error, isUpdated} = useSelector(state => state.adminProductEdit);
    const {
        product,
        loading: productDetailsLoading,
        error: productDetailsError
    } = useSelector(state => state.productDetails);

    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [deletedImages, setDeletedImages] = useState([])
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: ""
    });

    const handleChange = (e) => {
        product[e.target.name] = e.target.value
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(deletedImages)


        const formData = new FormData();
        formData.set("name", product.name);
        formData.set("price", product.price);
        formData.set("description", product.description);
        formData.set("category", product.category);
        formData.set("stock", product.stock);
        images.forEach(image => {
            formData.append("images", image)
        })
        deletedImages.forEach(image => {
            formData.append("imagesToDelete", image.public_id)
        });

        dispatch(updateProduct(id, formData));
    }


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)

        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }


    useEffect(() => {
        dispatch(getProductDetails(id));

        if (productDetailsError)
            toast.error(productDetailsError);
        if (error)
            toast.error(error)
        if (isUpdated) {
            toast.success("Product Edited successfully")
            navigate("/admin/products");
            dispatch({type: ADMIN_NEW_PRODUCT_EDIT_RESET})
            setDeletedImages([])
            setImages([])
        }
    }, [error, productDetailsError, isUpdated, id, dispatch]);

    return (
        <Fragment>

            {loading || productDetailsLoading && <Loader/>}


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
                                        <BadgeIcon />
                                        <input type="text" placeholder="Name" name="name" value={userData.name}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <EmailIcon />
                                        <input type="text" placeholder="Email Address" name="email"
                                               value={userData.email} onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <CategoryIcon/>
                                        <select className={product.category === "" ? "grayColor" : "blackColor"}
                                                name="category" id="category" onChange={handleChange}>
                                            <option selected value="">Category</option>
                                            {["user", "admin"].map((role, i) => (
                                                <option key={i} value={role}>{role}</option>
                                            ))}
                                        </select>
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
            </div>
        </Fragment>
    );
};

export default EditProduct;
