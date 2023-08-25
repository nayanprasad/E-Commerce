import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import MetaData from "../MetaDate"
import { useSelector, useDispatch } from "react-redux";
import {getMyOrders} from "../../redux/actions/orderAction";
import Loader from "../Loader/Loader";
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
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
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
          <Link to={`/order/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    dispatch(getMyOrders());
  }, [dispatch, alert, error]);


  return (
    <Fragment>
      <MetaData title={`${user?.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
