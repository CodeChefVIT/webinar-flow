import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
function post(query){

  axios.post('http://localhost:3000/', {
    password: query,
  })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

}

var nope='';
function App() {
  return (
    <div className="App" >

        <form style={{margin:350}} onSubmit={post(document.getElementById("mine"))}><input></input></form>

    </div>
  );
}

export default App;
