import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import {lightBlue, purple} from "@material-ui/core/colors";

const styles = {
    cssLabel: {
        '&$cssFocused': {
            color: purple[500],
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: purple[500],
        },
    },
    cssFocused: {},
    notchedOutline: {},
}
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    notchedOutline: {},
    focused: {
        "& $notchedOutline": {
            borderColor: "#ffffff"
        }
    },
    textField: {


        outlineColor:'#ffffff',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop:theme.spacing(0.5)
    },
    dense: {
        marginTop: theme.spacing(0),
    },
    menu: {
        width: 200,
    },
}));
function final(props,values){
    props.func(values.name)


}

export default function OutlinedTextFields(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: 'kk',

    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        console.log(values.name);
        props.func2({input:event.target.value})
    };





    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.func(values.name);
            console.log('here')


        }} className={classes.container} noValidate autoComplete="off">






            <TextField
                id="outlined-password-input"
                label={props.type}

                onChange={handleChange(['name'])}
                className={classes.textField}
                type={props.type}
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    },
                }}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                    },
                }}
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
            />














        </form>
    );
}