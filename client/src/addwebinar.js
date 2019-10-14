import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';





class AddWebinar extends React.Component {

    state = {
        name: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        tutor: '',
        description: '',
        videoLink:''


    };

    post() {
        axios.post('https://webinar-flow-test.herokuapp.com/home/newWebinar', {
            name: this.state.name,
            eventDate: this.state.eventDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            tutor: this.state.tutor,
            description: this.state.description,
            videoLink:this.state.videoLink

        },{headers: {
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvZGVjaGVmQWRtaW4iLCJpYXQiOjE1NzA5Mzc1NzksImV4cCI6MTU3MTAyMzk3OX0.BAnKILazNQ-TF3q1FiMTSMvkI55oijGdZPSADYKBGSA",
            }
        })
            .then(function (response) {
                console.log(response);
                console.log('here');
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    handleChange = arg=>(e) => {
        console.log(arg);
        this.setState({[arg]: e.target.value});
        console.log(this.state)
    };
    render() {
        return (
            <form onSubmit={this.post}>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Example label</label>
                    <input type="text" onChange={this.handleChange('name')} className="form-control" id="formGroupExampleInput" placeholder="Example input"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Another label</label>
                    <input type="text" className="form-control" onChange={this.handleChange('eventDate')} id="formGroupExampleInput2" placeholder="Another input"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


    )}}

 export default AddWebinar;




























