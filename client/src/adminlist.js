import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './bootstrap.min.css'




class List extends React.Component{

    state = {
        data:[''],
        loading:true,
        token:''
    };
lister() {
    this.state.data.forEach((data, index) => {return <li>{data[index].name}</li>})



}
componentDidMount() {  axios({
    url: 'https://webinar-flow-test.herokuapp.com/home',
    method: 'get',
    headers: {
        'Authorization': 'Bearer ' + `${this.props.token}`,
        'Content-Type': 'application/json'
    }
}).then((response) => {
    console.log(response)
    console.log(response.data.webinars)

    this.setState({data: response.data.webinars,loading:false,token:response.config.headers.Authorization}
   )

})};













    render(){
if(this.state.loading){return  <h1>loadiig..</h1> }


else{

        return(
    <div style={{width:"100%"}} className="card" >


    </div>)



    }}

}







export default List;