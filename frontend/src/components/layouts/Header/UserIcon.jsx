import React, { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import './UserIcon.css';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../../redux/actions/userAction';
import { toast } from 'react-toastify';
import {isMobile } from 'react-device-detect';


const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'fixed',
    top: '3%',
    right: theme.spacing(2),
    zIndex: 1,
}));

const DimmedOverlay = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
});

const RedDot = styled('span')({
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'tomato',
});

export default function PlaygroundSpeedDial({ user }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {cartItems} = useSelector(state => state.cart);

    const [open, setOpen] = useState(false);

    const actions = [
        { icon: <PersonIcon />, name: 'Profile' },
        { icon: <><ShoppingCartIcon /> {cartItems.length > 0 && <RedDot/>} </>, name: `Cart(${cartItems.length})` },
        { icon: <ListAltIcon />, name: 'Orders' },
        { icon: <LogoutIcon />, name: 'Logout' },
    ];

    if (user?.role === 'admin') {
        actions.unshift({ icon: <DashboardIcon />, name: 'Dashboard' });
    }


    function handleClick(e, name) {
        e.preventDefault();
        setOpen(false);

        switch (name) {
            case 'Profile':
                navigate('/profile');
                break;
            case 'Orders':
                navigate('/orders/me');
                break;
            case 'Logout':
                dispatch(logout());
                toast.success('Logout successfully');
                break;
            case 'Dashboard':
                navigate('/admin/dashboard');
                break;
            case `Cart(${cartItems.length})`:
                navigate('/cart');
                break;
        }
    }

    return (
        <Fragment>
            {open && <DimmedOverlay onClick={() => setOpen(false)} />}
            <StyledSpeedDial
                ariaLabel="SpeedDial playground example"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                icon={
                    user.avatar.url ? (
                        <img src={user.avatar.url} alt={user.name} className="speedDialIcon"
                             style={{
                                 borderRadius: "50%",
                                 width: "50px",
                                 height: "50px",
                                    objectFit: "cover"
                        }}
                        />
                    ) : (
                        <AccountBoxIcon />
                    )
                }
                direction="down"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(e) => {
                            handleClick(e, action.name);
                        }}
                        tooltipOpen={isMobile ? true : false}
                    />
                ))}
            </StyledSpeedDial>
        </Fragment>
    );
}
