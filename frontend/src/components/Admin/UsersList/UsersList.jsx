import React, {Fragment, useEffect} from "react";
import "./UsersList.css";
import Sidebar from "../Sidebar/Sidebar";
import MetaData from "../../MetaDate"
import {useSelector, useDispatch} from "react-redux";
import {getAdminUsers, adminDeleteUser} from "../../../redux/actions/userAction";
import {ADMIN_USER_DELETE_RESET} from "../../../redux/constants/userConstant"
import Loader from "../../Loader/Loader";
import {DataGrid} from '@mui/x-data-grid';
import {toast} from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Typography} from "@mui/material";


const MyOrders = () => {

    const dispatch = useDispatch();

    const {loading, error, users} = useSelector(state => state.adminUsers);
    const {user} = useSelector(state => state.user)
    const {loading: deleteLoading, error: deleteError, isDeleted} = useSelector(state => state.adminUserDelete)

    const columns = [
        {field: "id", headerName: "Order ID", minWidth: 250, flex: 1},
        {field: "email", headerName: "Email", minWidth: 250, flex: 1},
        {field: "name", headerName: "Name", minWidth: 180, flex: 1},
        {field: "date", headerName: "Joined On", minWidth: 120, flex: 0.5, type: "date"},
        {
            field: "role",
            headerName: "Role",
            minWidth: 100,
            flex: 0.5,
            cellClassName: (params) => {
                return params.value !== "admin"
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
                    <>
                        <EditIcon color={"primary"}/>
                        <DeleteIcon className={"redColor"} onClick={() => dispatch(adminDeleteUser(params.id))}/>
                    </>
                );
            },
        },
    ];

    const rows = [];

    users &&
    users.forEach((item, index) => {
        rows.push({
            id: item._id,
            email: item.email,
            name: item.name,
            date: new Date(item.createdAt),
            role: item.role,
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
            dispatch({
                type: ADMIN_USER_DELETE_RESET
            })
            toast.success("User deleted successfully")
        }
        dispatch(getAdminUsers());
    }, [dispatch, alert, error, isDeleted]);


    return (
        <Fragment>

            <MetaData title={`${user?.name} - Orders`}/>


            {loading || deleteLoading ? (
                <Loader/>
            ) : (
                <div className="adminUsersPage">


                    <div className="sidebar">
                        <Sidebar/>
                    </div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="adminUsersTable"
                        autoHeight
                    />
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;
