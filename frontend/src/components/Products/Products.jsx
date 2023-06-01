import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {listProducts, clearErrors} from "../../redux/actions/productAction";
import {toast} from "react-toastify";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.css";
import {Pagination, Slider} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const categories = [
    "mobile",
    "laptop",
    "camera",
    "headphone",
    "accessories",
    "speaker",
    "electronics",
];

const Products = () => {

    const {keyword} = useParams();

    const dispatch = useDispatch();

    const {loading, error, products, productCount, resultPerPage} = useSelector(state => state.productList);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000]);
    const [category, setCategory] = useState("");

    const [isPriceAccordionExpanded, setIsPriceAccordionExpanded] = useState(true);
    const [isCategoryAccordionExpanded, setIsCategoryAccordionExpanded] = useState(true);

    const handlePriceAccordionChange = (_, expanded) => {
        setIsPriceAccordionExpanded(expanded);
    }
    const handleCategoryAccordionChange = (_, expanded) => {
        setIsCategoryAccordionExpanded(expanded);
    };

    const handlePageChange = (e, val) => {
        setCurrentPage(val);
    }

    const filterByPrice = (e, val) => {
        setPrice(val);
    }

    useEffect(() => {
        dispatch(listProducts(keyword, currentPage, price, category));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, keyword, currentPage, price, category]);


    if (loading)
        return <Loader/>

    return (
        <Fragment>

            <h2 className="productHeading">Products</h2>

            <div className="productContainer">
                <div className="filter">
                    <h1>Filters</h1>


                    <Accordion expanded={isPriceAccordionExpanded} onChange={handlePriceAccordionChange}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Price</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Slider
                                value={price}
                                onChange={filterByPrice}
                                valueLabelDisplay="auto"
                                min={0}
                                max={25000}
                                aria-labelledby="range-slider"
                                disableSwap
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={isCategoryAccordionExpanded} onChange={handleCategoryAccordionChange}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Category</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                    {categories.map((category) => (
                                            <li className="categoryItem" onClick={() => setCategory(category)}>{category}</li>
                                        )
                                    )}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>

                {products ?
                    (<div className="products">
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>)
                    : (
                        <div className="noProduct">
                            <h2>No Products Found</h2>
                        </div>
                    )}
            </div>


            <div className="pagination">
                {products.length > 0 &&
                    <Pagination
                        count={resultPerPage < productCount ? Math.ceil(productCount / resultPerPage) : 1}
                        variant="outlined"
                        shape="rounded"
                        color="standard"
                        size="medium"
                        defaultPage={currentPage}
                        onChange={handlePageChange}
                    />}
            </div>

        </Fragment>
    );
};

export default Products;
