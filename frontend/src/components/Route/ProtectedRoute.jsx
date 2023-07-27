import React, {Fragment} from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({element: element, ...rest}) => {

    const {isAuthenticated, loading, user} = useSelector(state => state.user);

    if(!loading) {
        return (
            <Fragment>
                {isAuthenticated === true ? <Outlet/> : <Navigate to="/login" />}
            </Fragment>
        );
    }
};

export default ProtectedRoute;
