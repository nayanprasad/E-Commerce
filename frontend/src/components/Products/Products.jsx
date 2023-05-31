import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {listProducts, clearErrors} from "../../redux/actions/productAction";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.css";
import { PaginationItem } from '@mui/material';
import { Pagination } from '@mui/material';

const Products = () => {

    const {keyword} = useParams();

    const dispatch = useDispatch();

    const {loading, error, products, productCount} = useSelector(state => state.productList);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (e, val) => {
        setCurrentPage(val);
    }

    useEffect(() => {
        dispatch(listProducts(keyword, currentPage));

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, keyword, currentPage]);


    if(loading)
        return <Loader />

    return (
        <Fragment>
            <h2 className="productHeading">Products</h2>

            <div  className="productContainer">
                {products && products.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>

            <div className="pagination">
                <Pagination
                    count={productCount}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    size="medium"
                    defaultPage={currentPage}
                    onChange={handlePageChange}
                />


            </div>


        </Fragment>
    );
};

export default Products;
