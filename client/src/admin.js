import React from 'react';
import ReactDOM from 'react-dom';
import List from './adminlist';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Delete from './delete';
import decode from 'jwt-decode';
import SimpleCard from "./card";
import Sign from './pablo-sign-in.png';
import Snack from './snack.js';
import { makeStyles } from '@material-ui/core/styles';
import {ReactComponent as Login} from './support-notes-colour.svg'
import './bootstrap.min.css'
import Toolbar from '@material-ui/core/Toolbar';
import Grow from '@material-ui/core/Grow';
import Drawers from './admindrawer'
import {ReactComponent as Image} from './undraw_programmer_imem.svg'
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import '@material/react-button/dist/button.css';
import Button from '@material-ui/core/Button';
import asm from './asm.png'
import TemporaryDrawer from "./drawer";
import Editable from './table'
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import CircularDeterminate from "./loader";

import Form from "./form";
import TextField from '@material-ui/core/TextField'
import Picker from "./picker";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CardContent from "@material-ui/core/CardContent";
import FinalTable from "./finaltable";
import FinalForm from "./finalform";
var querystring = require('querystring');


const theme = createMuiTheme();
class Admin extends React.Component{




    // = 8 * 2

    constructor(props){
        super(props);
        this.post = this.post.bind(this);
        this.logout = this.logout.bind(this);
        this.formtoggle = this.formtoggle.bind(this);
        this.lister=this.lister.bind(this)
        this.state={
            login:false,
            token:'',
            loading:false,
            failure:false,
            form:false,
        };

    }




    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        this.setState({login:false,token:''})

    }
    lister(){
        this.setState({login:true,form:false})




    }
    formtoggle(){
        this.setState({login:true,form:true})
    }

    componentDidMount() {
        if((localStorage.getItem('id_token')&&!this.isTokenExpired(localStorage.getItem('id_token')))){
            this.setState({login:true, form:false})
            console.log('nope')

        }
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            console.log(decoded.exp);
            console.log(Date.now()/1000);
            if (decoded.exp < Date.now() / 1000) {// Checking if token is expired. N

                return true;
            }
            else
                return false;

        }
        catch (err) {
            return false;
        }
    }

   post(pass){
        console.log(pass);
        this.setState({loading:true});
       axios.post('https://webinar-flow-test.herokuapp.com/', querystring.stringify({password:pass}) ,{ headers: {
    'Content-Type': 'application/x-www-form-urlencoded',}}





).then((res)=> {
           console.log(res);
           if (res.data.success) {
               localStorage.setItem('id_token', res.data.token);
               this.setState({login: true, token: res.data.token, loading: false})
           }
           if (!res.data.success) {
               this.setState({login: false, loading: false, failure: true})
           }
       })}





    render() {
        if(this.state.login && this.state.form){
           return(<React.Fragment>
             ><FinalForm token={this.state.token}/>
               <TemporaryDrawer prop={this.logout} prop3={this.lister}/>
               </React.Fragment>


           )




        }
        if(this.state.login){
            return (<div style={{height:"100%", width:"100%",
                        }} >



                        <TemporaryDrawer  prop={this.logout} prop2={this.formtoggle} />

                    <FinalTable token={this.state.token}/>
                </div>



        )
        }

        if(this.state.loading){return <div className={'flex-container2'}><CircularDeterminate color={"#536dfe"}/></div>}
        if(this.state.failure){return(<div className={'flex-container2'}>
                <SimpleCard className={'flex-item1'} func={this.post} ></SimpleCard> <Snack message={'incorrect password'}/></div>




            )}
        else{return(
            <div className={'flex-container2'}>

                <SimpleCard  func={this.post} ></SimpleCard> </div> )
       }

    }

}
export default Admin;
