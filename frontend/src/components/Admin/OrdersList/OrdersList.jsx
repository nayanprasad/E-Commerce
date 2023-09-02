import React, {Fragment, useEffect} from "react";
import "./OrdersList.css";
import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../../MetaDate"
import {useSelector, useDispatch} from "react-redux";
import {getAdminOrders, adminDeleteOrder} from "../../../redux/actions/orderAction";
import {ADMIN_ORDER_DELETE_RESET} from "../../../redux/constants/orderConstants"
import Loader from "../../Loader/Loader";
import {DataGrid} from '@mui/x-data-grid';
import {toast} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MyOrders = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {loading, error, orders} = useSelector(state => state.adminOrders);
    const {loading: deleteLoading, error: deleteError, isDeleted} = useSelector(state => state.adminOrderDelete)
    const {user} = useSelector(state => state.user)

    const columns = [
        {field: "id", headerName: "Order ID", minWidth: 300, flex: 1},
        {field: "date", headerName: "Date", minWidth: 150, flex: 0.5, type: "date"},
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.value === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 120,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 200,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon color={"primary"} onClick={() => navigate(`/admin/order/${params.id}/edit`)}/>
                        <DeleteIcon className={"redColor"} onClick={() => dispatch(adminDeleteOrder(params.id))}/>
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
    orders.forEach((item, index) => {
        rows.push({
            id: item._id,
            date: new Date(item.createdAt),
            status: item.orderStatus,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
        });
    });

    useEffect(() => {
        if (error) {
            toast.error(error)
        }if (deleteError) {
            toast.error(deleteError)
        }if (isDeleted) {
            dispatch({
                type: ADMIN_ORDER_DELETE_RESET
            })
            toast.warning("Order deleted successfully")
        }
        dispatch(getAdminOrders());
    }, [dispatch, alert, error, isDeleted]);


    return (
        <Fragment>

            <MetaData title={`${user?.name} - Orders`}/>


            {loading ? (
                <Loader/>
            ) : (
                <div className="adminOrdersPage">


                    <div className="sidebar">
                        <Sidebar/>
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="adminOrdersTable"
                        autoHeight
                    />
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;
