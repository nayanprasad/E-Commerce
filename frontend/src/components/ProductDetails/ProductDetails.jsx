import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import {useSelector, useDispatch} from "react-redux";
import {getProductDetails} from "../../redux/actions/productAction";

const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    console.log(product);

    return (
        <div className="productDetails">
            {/*<Carousel>*/}

            {/*</Carousel>*/}
            {product.name}s

        </div>
    );
};

export default ProductDetails;
