import React, {Fragment, useState} from "react";
import "./Shipping.css"
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";
import Stepper from "../Stepper/Stepper";
import {useDispatch, useSelector} from "react-redux";
import {saveShippingDetails} from "../../redux/actions/cartAction";
import { Country, State, City }  from "country-state-city";
import {useNavigate} from "react-router-dom";


const Shipping = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {shippingDetails} = useSelector(state => state.cart)

    const [data, setData] = useState({
        address: shippingDetails.address,
        city: shippingDetails.city,
        pinCode: shippingDetails.pinCode,
        phone: shippingDetails.phone,
        country: shippingDetails.country,
        state: shippingDetails.state
    })

    const [country, setCountry] = useState(Country.getAllCountries())
    const [state, setState] = useState(State.getAllStates())

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        if(e.target.name === "country"){
            const country = Country.getCountryByCode(e.target.value)
            setData({
                ...data,
                country: country.name,
            })
            setState(State.getStatesOfCountry(e.target.value))
        }

        if(e.target.name === "state"){
            setData({
                ...data,
                state: e.target.value,
            })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingDetails(data));
        navigate("/order/confirm")
    }


    return (
        <Fragment>

            <div className="stepperContainer">
                <Stepper activeStep={0}/>
            </div>

            <div className="wrapperContainer">
                <div className="wrapper">
                    <div className="title-text">
                        <div className="title login">Shipping details</div>
                    </div>
                    <div className="form-container">
                        <div className="form-inner">
                            <form className="signup" onSubmit={handleSubmit}>
                                <div className="field flex">
                                    <HomeIcon/>
                                    <input type="text" placeholder="Address" name="address" value={data.address}
                                           onChange={handleChange}/>
                                </div>
                                <div className="field flex">
                                    <LocationCityIcon/>
                                    <input type="text" placeholder="City" name="city"
                                           value={data.city} onChange={handleChange}/>
                                </div>
                                <div className="field flex">
                                    <PlaceIcon/>
                                    <input type="text" placeholder="Pin code" name="pinCode"
                                           value={data.pinCode} onChange={handleChange}/>
                                </div>
                                <div className="field flex">
                                    <PhoneIcon/>
                                    <input type="text" placeholder="Phone" name="phone"
                                           value={data.phone} onChange={handleChange}/>
                                </div>
                                <div className="field flex">
                                    <PublicIcon/>
                                    <select name="country" id="country" onChange={handleChange}>
                                        <option  selected value="">Country</option>
                                        {data.country && <option selected value={data.country}>{data.country}</option>}
                                        {country.map((country, i) => (
                                            <option key={i} value={country.isoCode}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field flex">
                                    <LanguageIcon/>
                                    <select name="state" id="state" onChange={handleChange}>
                                        <option selected value="">State</option>
                                        {data.state && <option selected value={data.state}>{data.state}</option>}
                                        {state.map((state, i) => (
                                            <option key={i} value={state.name}>{state.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="field btn">
                                    <div className="btn-layer"></div>
                                    <input type="submit" value="Confirm Order"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
