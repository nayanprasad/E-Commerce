import React, {Fragment, useEffect, useState} from "react";
import "./EditProduct.css";
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

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const handleChange = (e) => {
        product[e.target.name] = e.target.value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        console.log(product)
        const formData = new FormData();
        formData.set("name", product.name);
        formData.set("price", product.price);
        formData.set("description", product.description);
        formData.set("category", product.category);
        formData.set("stock", product.stock);
        images.forEach(image => {
            formData.append("images", image)
        })

        dispatch(updateProduct(id, formData));
    }


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)

        files.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    // setImagesPreview(oldArray => [...oldArray, reader.result])
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
            // navigate("/admin/products");
            dispatch({type: ADMIN_NEW_PRODUCT_EDIT_RESET})
        }
    }, [error, productDetailsError, isUpdated, id, dispatch]);

    return (
        <Fragment>

            {loading || productDetailsLoading && <Loader/>}


            <div className="createContainer">

                <div className="sidebarCreate">
                    <Sidebar/>
                </div>

                <div className="wrapperContainer">
                    <div className="wrapper">
                        <div className="title-text">
                            <div className="title login">Edit Product details</div>
                        </div>
                        <div className="form-container">
                            <div className="form-inner">
                                <form className="signup" onSubmit={handleSubmit}>
                                    <div className="field flex">
                                        <AbcIcon/>
                                        <input type="text" placeholder="Name" name="name" value={product.name}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <CurrencyRupeeIcon/>
                                        <input type="number" placeholder="Price" name="price"
                                               value={product.price} onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <DescriptionIcon/>
                                        <input type="text" placeholder="description" name="description"
                                               value={product.description} onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <CategoryIcon/>
                                        <select className={product.category === "" ? "grayColor" : "blackColor"}
                                                name="category" id="category" onChange={handleChange}>
                                            <option selected value="">Category</option>
                                            {categories.map((category, i) => (
                                                <option key={i} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="field flex">
                                        <Inventory2Icon/>
                                        <input type="number" placeholder="Stock" name="stock"
                                               value={product.stock} onChange={handleChange}/>
                                    </div>

                                    <div className="field flex FileSelector">
                                        <AddPhotoAlternateIcon fontSize="large"/>
                                        <input multiple type="file" accept="image/*" name="avatar"
                                               onChange={handleImageChange}/>
                                    </div>

                                    <div className="imagePreview">
                                        {images.map((image, index) => (
                                            <div className="previewImageContainer">
                                                <img key={index} src={image} alt="Product Preview"/>
                                                <Tooltip title="Remove Image">
                                                    <ClearIcon fontSize={"large"} onClick={() => {
                                                        setImages(images.filter((img, i) => i !== index))
                                                    }}/>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="field btn">
                                        <div className="btn-layer"></div>
                                        <input type="submit" value="Create"/>
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
