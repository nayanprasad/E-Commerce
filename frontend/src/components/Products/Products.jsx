import React, {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {listProducts, clearErrors} from "../../redux/actions/productAction";
import {toast} from "react-toastify";

const Products = () => {

    const dispatch = useDispatch();

    const {loading, error, products, productCount} = useSelector(state => state.productList);

    useEffect(() => {
        dispatch(listProducts);

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error]);



    return (
        <Fragment>
            adsf
        </Fragment>
    );
};

export default Products;
