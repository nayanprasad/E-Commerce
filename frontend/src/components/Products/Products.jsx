import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {listProducts, clearErrors} from "../../redux/actions/productAction";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.css";
import {PaginationItem} from '@mui/material';
import {Pagination} from '@mui/material';
import { Slider } from '@mui/material';

const Products = () => {

    const {keyword} = useParams();

    const dispatch = useDispatch();

    const {loading, error, products, productCount, resultPerPage} = useSelector(state => state.productList);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 1000]);

    const handlePageChange = (e, val) => {
        setCurrentPage(val);
    }

    const filterByPrice = (e, val) => {
        setPrice(val);
    }

    useEffect(() => {
        dispatch(listProducts(keyword, currentPage, price));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, keyword, currentPage, price]);


    if (loading)
        return <Loader/>

    return (
        <Fragment>
            <h2 className="productHeading">Products</h2>

            {products ?
                (<div className="productContainer">
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>)
                : (
                    <div className="noProduct">
                        <h2>No Products Found</h2>
                    </div>
                )}

            <Slider
                value={price}
                onChange={filterByPrice}
                valueLabelDisplay="auto"
                min={0}
                max={25000}
                aria-labelledby="range-slider"
                disableSwap
            />

            <div className="pagination">
                <Pagination
                    count={resultPerPage < productCount ? Math.ceil(productCount / resultPerPage) : 1}
                    variant="outlined"
                    shape="rounded"
                    color="standard"
                    size="medium"
                    defaultPage={currentPage}
                    onChange={handlePageChange}
                />
            </div>

        </Fragment>
    );
};

export default Products;