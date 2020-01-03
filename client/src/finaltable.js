import React from 'react';
import ReactDOM from 'react-dom';
import Editable from "./table";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {


        [theme.breakpoints.only('lg')]:{marginLeft: theme.spacing(5),
        marginRight:theme.spacing(5)},
        marginTop:theme.spacing(10),


        [theme.breakpoints.up('lg')]: {

            marginLeft:theme.spacing(48),
            marginTop:theme.spacing(14),



        },
    },
}));

export default function FinalTable(props){

    const classes = useStyles();


    return (<Container className={classes.root} maxWidth={'md'}><Editable token={props.token}/></Container>)



}