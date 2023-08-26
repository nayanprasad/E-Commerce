import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {toast} from "react-toastify"

const ProtectedRoute = ({element: element, ...rest}) => {

    const {isAuthenticated, loading, user} = useSelector(state => state.user);

    if(rest.isAdmin === true && user?.role !== "admin") {
        toast.warn("cannot access admin routes")
        return (
            <Fragment>
                {isAuthenticated === true ? <Outlet/> : <Navigate to="/login" />}
            </Fragment>
        );
    }

    if(!loading) {
        return (
            <Fragment>
                {isAuthenticated === true ? <Outlet/> : <Navigate to="/login" />}
            </Fragment>
        );
    }
};

export default ProtectedRoute;
