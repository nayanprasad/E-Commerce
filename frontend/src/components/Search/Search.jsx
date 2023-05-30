import React, {Fragment, useState} from 'react';
import "./Search.css";

const Search = () => {

    const [keyword, setKeyword] = useState("");

    const handleChange = (e) => {
        setKeyword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(keyword);
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
