import React, {Fragment, useEffect} from "react";
import "./ProductsList.css";
import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../../MetaDate"
import {useSelector, useDispatch} from "react-redux";
import {getAdminPruducts, adminDeleteProduct} from "../../../redux/actions/productAction";
import {ADMIN_PRODUCT_DELETE_RESET} from "../../../redux/constants/productConstant"
import Loader from "../../Loader/Loader";
import {DataGrid} from '@mui/x-data-grid';
import {toast} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MyOrders = () => {

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const {loading, error, products} = useSelector(state => state.adminProducts);
        const {loading: deleleLoading, error: deleteError, isDeleted} = useSelector(state => state.adminProductDelete);
        const {user} = useSelector(state => state.user)

        const columns = [
            {field: "id", headerName: "Order ID", minWidth: 300, flex: 1},
            {field: "name", headerName: "Name", minWidth: 270, flex: 0.5},
            {field: "date", headerName: "Date", minWidth: 150, flex: 0.5, type: "date"},
            {field: "price", headerName: "Price", minWidth: 150, flex: 0.5, type: "number"},
            {
                field: "stock",
                headerName: "Stock",
                type: "number",
                minWidth: 100,
                flex: 0.3,
                cellClassName: (params) => {
                    if (params.value === 0)
                        return "redColor";
                    if(params.value < 10)
                        return "orangeColor";
                    else
                        return "greenColor";
                }
            },

            {
                field: "actions",
                flex: 0.3,
                headerName: "Actions",
                minWidth: 100,
                type: "number",
                sortable: false,
                renderCell: (params) => {
                    return (
                        <>
                            <EditIcon color={"primary"} onClick={() => navigate(`/admin/product/${params.id}/edit`)}/>
                            <DeleteIcon className={"redColor"} onClick={() => dispatch(adminDeleteProduct(params.id))}/>
                        </>
                    );
                },
            },
        ];
        const rows = [];

        products &&
        products.forEach((item, index) => {
            rows.push({
                id: item._id,
                name: item.name,
                date: new Date(item.createdAt),
                price: item.price,
                stock: item.stock,
            });
        });

        useEffect(() => {
            if (error) {
                toast.error(error)
            }
            if (deleteError) {
                toast.error(deleteError)
            }
            if (isDeleted) {
                toast.warning("Product deleted successfully")
                dispatch({type: ADMIN_PRODUCT_DELETE_RESET});
            }
            dispatch(getAdminPruducts());
        }, [dispatch, alert, error, isDeleted]);


        return (
            <Fragment>

                <MetaData title={`${user?.name} - Orders`}/>


                {loading || deleleLoading ? (
                    <Loader/>
                ) : (
                    <div className="adminProductsPage">


                        <div className="sidebar">
                            <Sidebar/>
                        </div>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="adminProductsTable"
                            autoHeight
                        />
                    </div>
                )}
            </Fragment>
        );
    }
;

export default MyOrders;
