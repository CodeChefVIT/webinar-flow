import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './bootstrap.min.css'


class List extends React.Component{
constructor(props){
    super(props);
    this.get();



}

k=0;
    state = {
        data:[]

    };// const headers = {
   //  'Authorization':'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvZGVjaGVmQWRtaW4iLCJpYXQiOjE1NzA5Mzc1NzksImV4cCI6MTU3MTAyMzk3OX0.BAnKILazNQ-TF3q1FiMTSMvkI55oijGdZPSADYKBGSA"
   // };
   // axios.get('https://webinar-flow-test.herokuapp.com/home',{headers:{"Authorization":'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvZGVjaGVmQWRtaW4iLCJpYXQiOjE1NzA5Mzc1NzksImV4cCI6MTU3MTAyMzk3OX0.BAnKILazNQ-TF3q1FiMTSMvkI55oijGdZPSADYKBGSA"}}).then((res)=> {console.log(res)});

   get(){ axios({
        url: 'https://webinar-flow-test.herokuapp.com/home',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvZGVjaGVmQWRtaW4iLCJpYXQiOjE1NzA5Mzc1NzksImV4cCI6MTU3MTAyMzk3OX0.BAnKILazNQ-TF3q1FiMTSMvkI55oijGdZPSADYKBGSA",
            'Content-Type': 'application/json'
        }
    }).then((response) => {
    console.log(response.data);
    this.k=1;
    this.setState({data:response.data.webinars})

}).catch(err => {
    console.log(err);
});

   }



    render(){
    console.log(this.state.data[0]);

    if(this.k==1){
        return(
    <div className="card" >
        <div className="card-header">
            Featured
        </div>
        <ul className="list-group list-group-flush">

                   <li className="list-group-item">{this.state.data[0].name}</li>







        </ul>
    </div>)}
   else{return <h2>loading...</h2>}}

}







export default List;