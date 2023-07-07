import React, {Fragment, useState} from 'react';
import "./Shipping.css"
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import Stepper from "./Stepper";
import StepperComponent from "./Stepper";

const Shipping = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: ""
    });


    return (
        <Fragment>
            
            <StepperComponent activeStep={1}/>

            <div className="wrapperContainer" >
                <div className="wrapper">
                    <div className="title-text">
                        <div className="title login">Shipping details</div>
                    </div>
                    <div className="form-container">
                        <div className="form-inner">
                            <form className="signup" >
                                <div className="field flex">
                                    <HomeIcon/>
                                    <input type="text" placeholder="Address" name="name" value={userData.name}
                                           onChange={(e) => setUserData({
                                               ...userData,
                                               [e.target.name]: e.target.value
                                           })}/>
                                </div>
                                <div className="field flex">
                                    <LocationCityIcon/>
                                    <input type="text" placeholder="City" name="email"
                                           value={userData.email} />
                                </div>
                                <div className="field flex">
                                    <PlaceIcon/>
                                    <input type="text" placeholder="Pin code" name="email"
                                           value={userData.email} />
                                </div>
                                <div className="field flex">
                                    <PhoneIcon/>
                                    <input type="text" placeholder="Phone" name="email"
                                           value={userData.email} />
                                </div>
                                <div className="field flex">
                                    <PublicIcon/>
                                    <select name="country" id="country" >
                                        <option disabled selected value="" >Country</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                </div>
                                <div className="field flex">
                                    <LanguageIcon/>
                                    <select name="state" id="state">
                                        <option  selected disabled value="">State</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
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

export default Shipping;
