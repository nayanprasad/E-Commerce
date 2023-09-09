import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import MetaData from "../../MetaDate";
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminDashboard } from "../../../redux/actions/userAction";
import { CategoryScale, Chart } from "chart.js/auto";
Chart.register(CategoryScale);

const Dashboard = () => {

    const dispatch = useDispatch();

    const { dashboard } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getAdminDashboard());
        window.scrollTo ({
            top: 0,
            behavior: "smooth"
        });
    }, [dispatch]);

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, dashboard?.totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["InStock", "Out of Stock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [dashboard?.inStock, dashboard?.outOfStock],
            },
        ],
    };

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />

            <div className="sidebar">
                <Sidebar />
            </div>


            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{dashboard?.totalAmount.toFixed(2)}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{dashboard?.products}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{dashboard?.orders}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{dashboard?.users}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
