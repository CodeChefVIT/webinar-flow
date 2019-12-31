import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";
import {KeyboardDatePicker} from '@material-ui/pickers'
import { DatePicker } from "@material-ui/pickers";
import Picker from './picker'
import TimePick from "./timepick";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";


class Form extends React.Component {
constructor(props) {
    super(props);
    this.post = this.post.bind(this);
    this.state = {
        name: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        tutor: '',
        description: '',
        videoLink: ''


    };
}
    post(e) {
        e.preventDefault();
        axios.post('https://webinar-flow-test.herokuapp.com/home/newWebinar', {
            name: this.state.name,
            eventDate: this.state.eventDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            tutor: this.state.tutor,
            description: this.state.description,
            videoLink:this.state.videoLink

        },{headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
            .then( (res) =>{console.log(res)}
            )
            .catch(function (error) {
                console.log(error);
            });


    }
    handleChange = arg=>(e) => {
        console.log(arg);
        this.setState({[arg]: e.target.value});
        console.log(this.state)
    };
   dateChange = (e)=>{

       this.setState({eventDate:e})


   }
   timeChange = (e)=>{
       this.setState({startTime:e})

   }
   theme=createMuiTheme()
    render() {
        return (



<Paper elevation={7} style={{padding:"30px", width:"100%", marginTop:this.theme.spacing(10)}}>
  <TextField style={{width:"100%", marginBottom:"10px"}} placeholder="Name" variant="outlined" onChange={this.handleChange(['name'])}></TextField><br/>


<div style={{display:"flex", justifyContent:"space-around"}} >
    <Picker change={this.dateChange} style={{marginRight:"10px", marginBottom:"10px", marginTop:"10px"}}/>
    <TimePick change={this.timeChange} style={{margin:"10px"}}/></div>
    <TextField variant="outlined" placeholder="Tutor" style={{width:"100%", marginTop:"10px", marginBottom:"10px"}} onChange={this.handleChange(['tutor'])} ></TextField>
    <br/>
    <TextField onChange={this.handleChange(['description'])}
                multiline
               rows="4"
               variant="outlined" placeholder="Description" style={{width:"100%", marginTop:"10px", marginBottom:"10px"}}></TextField><br/>

    <Button variant={'contained'} onClick={this.post} style={{backgroundColor:"#3e64ff",color:"#ecfcff", width:"100%", marginTop:"10px"}}>Create Typeform</Button>

</Paper>




    )}}

 export default Form;




























