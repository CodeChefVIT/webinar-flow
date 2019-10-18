import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css'
import Axios from 'axios';


function del(props) {

    console.log(props)
    Axios.get(`https://webinar-flow-test.herokuapp.com/home/${props.id}/delete`,{headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvZGVjaGVmQWRtaW4iLCJpYXQiOjE1NzA5Mzc1NzksImV4cCI6MTU3MTAyMzk3OX0.BAnKILazNQ-TF3q1FiMTSMvkI55oijGdZPSADYKBGSA",
        }}).then((res) => console.log(res));
}
const Delete = (props) =>{
    return(  <button onClick={del}
    type = "button"
    className = "btn btn-outline-primary" > Primary < /button>)
}




export default Delete;





