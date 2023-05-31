import React, {Fragment, useState} from 'react';
import { useNavigate } from "react-router-dom"
import "./Search.css";
import {Route} from "react-router-dom";

const Search = () => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const handleChange = (e) => {
        setKeyword(e.target.value);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
        }else{
            navigate(`/products`);
        }
    }

    return (
        <Fragment>

            <form className="searchBox" onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" value={keyword} placeholder="Search Products" />
                <input type="submit" value="Search"/>
            </form>

        </Fragment>
    );
};

export default Search;
