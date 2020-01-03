import React,{Component} from 'react';

import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import './login.css'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});



class Text extends Component {
    count=0;
    constructor(props){
        super(props);
        this.state = {value: '', save:false};

    }
    Post1(){this.post(this.state.value)}



    post=()=>{if(this.ValidateEmail(this.state.value)===true){
             axios.post(
                'https://webinar-flow-test.herokuapp.com/5d80ffcd9ad65d00043f71cb/webinarRegistration?objID=5da1d1aae7e1f90004606fda',
        {
          email:this.state.value
        }

            ).then((response)=> {

                if(response.data.save){this.setState({save:true})}
            this.count+=1;console.log(response)})


    }};
    ValidateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        alert("You have entered an invalid email address!");
        return (false)
    }

    handleChange = arg=>(e) => {
        console.log(arg);
        this.setState({[arg]: e.target.value});
        console.log(this.state.value)
    };


    onSubmitHandler = (event) => {
        event.preventDefault();
        //this.setState({value: event.target.value});
        console.log(this.state);
        this.post()
    };


    render() {
        const classes=this.props;
        if((this.state.save===false) && (this.count==0)){return (

<div id='apis'>

        <form onSubmit={this.onSubmitHandler}  className={classes.container} noValidate autoComplete="off">




            <div className="form__group">
                <input onChange={this.handleChange('value')} value={this.state.value} type="email" placeholder="Email" className="form__input"/>
            </div>


            <button onClick={this.post} className="btn" type="button">Register</button>

        </form>
</div>
    );}
        else if((this.state.save===false) && (this.count>=1)){return <h1>invalid email</h1>}
        else if(this.state.save===true){return <h1 class="text animated fadeInDown" >Thank you!</h1>}



    }
}



export default Text;