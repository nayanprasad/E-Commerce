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

const Products = () => {

    const {keyword} = useParams();

    const dispatch = useDispatch();

    const {loading, error, products, productCount, resultPerPage} = useSelector(state => state.productList);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (e, val) => {
        setCurrentPage(val);
    }

    useEffect(() => {
        dispatch(listProducts(keyword, currentPage));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, keyword, currentPage]);


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
