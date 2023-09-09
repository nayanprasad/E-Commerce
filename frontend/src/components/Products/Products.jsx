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
import MetaDate from "../MetaDate";




const categories = [
    "All",
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

    const {loading, error, products, productCount, resultPerPage, filteredProductsCount} = useSelector(state => state.productList);

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState();

    const [isPriceAccordionExpanded, setIsPriceAccordionExpanded] = useState(false);
    const [isCategoryAccordionExpanded, setIsCategoryAccordionExpanded] = useState(false);
    const  [isRatingAccordionExpanded, setIsRatingAccordionExpanded] = useState(false);

    const handlePriceAccordionChange = (_, expanded) => {
        setIsPriceAccordionExpanded(expanded);
    }
    const handleCategoryAccordionChange = (_, expanded) => {
        setIsCategoryAccordionExpanded(expanded);
    };

    const handleRatingAccordionChange = (_, expanded) => {
        setIsRatingAccordionExpanded(expanded);
    }


    useEffect(() => {
        if(category === "All") {
            setCategory("");
        }
        dispatch(listProducts(keyword, currentPage, price, category, ratings, 6));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        window.scrollTo ({
            top: 0,
            behavior: "smooth"
        });

    }, [dispatch, keyword, currentPage, price, category, ratings]);


    if (loading)
        return <Loader/>

    return (
        <Fragment>

            <MetaDate title={"Products --Ecommerce"} />

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
                            <Typography>PRICE</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Slider
                                size="small"
                                value={price}
                                onChange={(e, val) => setPrice(val)}
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
                            <Typography>CATEGORY</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                    {categories.map((cat) => (
                                            <li className="categoryItem" style={cat === category ? {color: "blue"} : {}} onClick={() => setCategory(cat)}>{cat}</li>
                                        )
                                    )}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={isRatingAccordionExpanded} onChange={handleRatingAccordionChange}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>RATINGS</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Slider
                                size="small"
                                value={ratings}
                                aria-label="Small"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                                onChange={(e, val) => setRatings(val)}
                            />
                        </AccordionDetails>
                    </Accordion>

                </div>

                {filteredProductsCount ?
                    (<div className="products">
                        { products.map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>)
                    : (
                        <div className="noProducts">
                            <h2>No Products Found</h2>
                        </div>
                    )}
            </div>


            <div className="pagination">
                {filteredProductsCount > 0 &&
                    <Pagination
                        count={resultPerPage < filteredProductsCount ? Math.ceil(filteredProductsCount / resultPerPage) : 1}
                        variant="outlined"
                        shape="rounded"
                        color="standard"
                        size="medium"
                        defaultPage={currentPage}
                        onChange={(e, val) => setCurrentPage(val)}
                    />}
            </div>

        </Fragment>
    );
};

export default Products;
