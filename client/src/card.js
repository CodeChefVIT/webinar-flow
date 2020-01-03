import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OutlinedTextFields from './input'
const useStyles = makeStyles(theme => ({
    card: {

        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',

    },
    content:{


    },
    login:{marginBottom:theme.spacing('3')},
    img:{marginBottom: theme.spacing(3),
        marginLeft:theme.spacing(4),
        marginRight:theme.spacing(4),
    marginTop: theme.spacing(3)},
    button:{marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop:theme.spacing(0.5)},
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function SimpleCard(props) {
    const [input, changeInput] = useState('abc123');
    const classes = useStyles();


    return (

        <Card elevation={10} className={classes.card} style={{borderRadius:"10px"}}>
            <CardContent className={classes.content}>
                <img  className={classes.img} src="https://img.icons8.com/ultraviolet/80/000000/edit-user-male.png"/>
                <Typography className={classes.login} style={{color:'#536dfe'}} component={'h1'} variant={'h3'}>Log In</Typography>
                <OutlinedTextFields style={{width:"100%", margin:"0px"}} func={props.func} func2={changeInput} type={'username'}/>
                   <OutlinedTextFields style={{width:"100%"}} func={props.func} func2={changeInput} type={'password'}/>
                <Button variant={'contained'} className={classes.button} onClick={() =>{
                    console.log(input)
                    props.func(input.input)}} style={{backgroundColor:"#3e64ff",color:"#ecfcff",width:"93%" }}>LOGIN</Button>
            </CardContent>

        </Card>
    );
}