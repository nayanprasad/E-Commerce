import React, {Fragment, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {listProducts, clearErrors} from "../../redux/actions/productAction";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.css";

const Products = () => {

    const {keyword} = useParams();

    const dispatch = useDispatch();

    const {loading, error, products, productCount} = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts(keyword));

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, keyword]);


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

        </Fragment>
    );
};

export default Products;
