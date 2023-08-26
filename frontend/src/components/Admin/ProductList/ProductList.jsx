import React, { Fragment, useEffect } from "react";
import "./ProductList.css";
import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../../MetaDate"
import { useSelector, useDispatch } from "react-redux";
import {getMyOrders} from "../../../redux/actions/orderAction";
import Loader from "../../Loader/Loader";
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';
import {toast} from "react-toastify";

const MyOrders = () => {

    const dispatch = useDispatch();

    const {loading, error, orders} = useSelector(state => state.myOrders);
    const {user} = useSelector(state => state.user)

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
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
                return params.value !== 0
                    ? "greenColor"
                    : "redColor";
            },
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
                    <Link to={`/order/${params.id}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    // orders &&
    // orders.forEach((item, index) => {
    //     rows.push({
    //         id: item._id,
    //         date: new Date(item.createdAt),
    //         status: item.orderStatus,
    //         itemsQty: item.orderItems.length,
    //         amount: item.totalPrice,
    //     });
    // });

    // useEffect(() => {
    //     if (error) {
    //         toast.error(error)
    //     }
    //     dispatch(getMyOrders());
    // }, [dispatch, alert, error]);


    return (
        <Fragment>

            <MetaData title={`${user?.name} - Orders`} />

            {loading ? (
                <Loader />
            ) : (
                <div className="adminProductsPage">

                    <div className="sidebar">
                        <Sidebar />
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
};

export default MyOrders;
