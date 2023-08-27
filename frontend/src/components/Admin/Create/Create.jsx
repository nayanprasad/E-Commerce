import React, {Fragment, useState} from "react";
import "./Create.css"
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";
import {useDispatch, useSelector} from "react-redux";
// import {saveShippingDetails} from "../../redux/actions/cartAction";
import {Country, State, City} from "country-state-city";
import {useNavigate} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AbcIcon from '@mui/icons-material/Abc';
const Shipping = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const {shippingDetails} = useSelector(state => state.cart)

    const [data, setData] = useState({
        name: "",
        price: null,
        description: "",
        category: "",
        stock: null,
    })

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
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // dispatch(saveShippingDetails(data));
        // navigate("/order/confirm")
    }


    return (
        <Fragment>
            <div className="createContainer">


                <div className="sidebarCreate">
                    <Sidebar/>
                </div>

                <div className="wrapperContainer">
                    <div className="wrapper">
                        <div className="title-text">
                            <div className="title login">Product details</div>
                        </div>
                        <div className="form-container">
                            <div className="form-inner">
                                <form className="signup" onSubmit={handleSubmit}>
                                    <div className="field flex">
                                        <AbcIcon/>
                                        <input type="text" placeholder="Name" name="name" value={data.name}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <CurrencyRupeeIcon/>
                                        <input type="number" placeholder="Price" name="price"
                                               value={data.price} onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <DescriptionIcon/>
                                        <input type="text" placeholder="description" name="description"
                                               value={data.description} onChange={handleChange}/>
                                    </div>
                                    <div className="field flex">
                                        <CategoryIcon/>
                                        <select className={data.category === "" ? "grayColor" : "blackColor" } name="category" id="category" onChange={handleChange}>
                                            <option selected value="">Category</option>
                                            {categories.map((category, i) => (
                                                <option key={i} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="field flex">
                                        <Inventory2Icon/>
                                        <input type="number" placeholder="Stock" name="Stock"
                                               value={data.stock} onChange={handleChange}/>
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

export default Shipping;
