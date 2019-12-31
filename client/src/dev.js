import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import one from './avatar1.jpg';
import two from './avatar2.jpg'
import three from './cobain.jpg';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {Typography} from "@material-ui/core";
export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
     const theme = createMuiTheme();
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
               DEV TEAM
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Avatar alt="Remy Sharp" src={two} style={{marginRight:theme.spacing(2)}}/><Typography variant={'h7'}>Navyaa Sharma</Typography></MenuItem>
                <MenuItem onClick={handleClose}><Avatar alt="Remy Sharp" src={three} style={{marginRight:theme.spacing(2)}}/><Typography variant={'h7'}>Kunal Chaudhary</Typography></MenuItem>
                <MenuItem onClick={handleClose}><Avatar alt="Remy Sharp" src={one} style={{marginRight:theme.spacing(2)}}/><Typography variant={'h7'}>Subhra Palidhi</Typography></MenuItem>
            </Menu>
        </div>
    )}