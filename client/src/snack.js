import React from 'react';
import ReactDOM from 'react-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

export default function Snack(props){
    const [open, setOpen] = React.useState(true);

const handleClose = (e, reason) => {
    if(reason === 'clickaway'){return}

    setOpen(false)

    };
return ( <Snackbar
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
    }}
    open={open}
    autoHideDuration={2000}
    onClose={handleClose}
    ContentProps={{
        'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{props.message}</span>}
    action={
        <Button key="undo" color="secondary" size="small" onClick={handleClose}>
            UNDO
        </Button>



        }   />)}