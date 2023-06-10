import React, {Fragment, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useNavigate} from "react-router-dom";
import "./UserIcon.css"
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../../../redux/actions/userAction";
import {toast} from "react-toastify"

const StyledSpeedDial = styled(SpeedDial)(({theme}) => ({
    position: 'fixed',
    top: '3%',
    right: theme.spacing(2),
    zIndex: 1,
}));


export default function PlaygroundSpeedDial({user}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const actions = [
        {icon: <PersonIcon/>, name: 'Profile'},
        {icon: <ListAltIcon/>, name: 'Orders',},
        {icon: <LogoutIcon/>, name: 'Logout',},
    ];

    if (user?.role === 'admin') {
        actions.unshift({icon: <DashboardIcon/>, name: 'Dashboard'});
    }

    //handler function
    function handleClick(e, name) {
        e.preventDefault();
        switch (name) {
            case 'Profile':
                navigate('/profile');
                break;
            case 'Orders':
                navigate('/orders');
                break;
            case 'Logout':
                dispatch(logout())
                toast.success("logout successfully")
                break;
            case 'Dashboard':
                navigate('/admin/dashboard');

                break;
        }
    }

    return (
        <Fragment>
            <StyledSpeedDial
                ariaLabel="SpeedDial playground example"
                hidden={false}
                icon={user ?
                    // <img src={user.avatar.url} alt={user.name} className="speedDialIcon" />
                    <AccountBoxIcon/>
                    : <AccountBoxIcon/>}
                direction="down"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e) => {
                            handleClick(e, action.name)
                        }}
                    />
                ))}
            </StyledSpeedDial>
        </Fragment>
    );
}
