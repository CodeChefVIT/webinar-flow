import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import './login.css'

import {TextareaAutosize} from "@material-ui/core";


class loginpage extends React.Component {

    state={name:'',
    description:'',
    date:''};










    componentDidMount() {
         axios.get('https://webinar-flow-test.herokuapp.com/5d80ffcd9ad65d00043f71cb/webinarRegistration').then((response) => {
            console.log(response.data);
            this.setState({name:response.data.data.name,date:response.data.data.eventDate,description:response.data.data.description,
            })}
        )
    }
    render() {
        return( <div id='bang'>
                <h1 className="text1">{this.state.name}</h1>

          <h1 className="text" >{this.state.date}</h1>
            <h4 className="text">{this.state.description}</h4>

          </div>    )}

}


export default loginpage;