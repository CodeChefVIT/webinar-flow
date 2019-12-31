import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MaterialTable from 'material-table';
import {Paper} from "@material-ui/core";
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container'
import makeStyles from "@material-ui/core/styles/makeStyles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Snack from "./snack";
var querystring = require('querystring');









class Editable extends React.Component {

    constructor(props) {


        super(props);

        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Date', field: 'eventDate'},
                { title: 'Tutor', field: 'tutor', },
                {title:'FormLink', field:'typeform',},

                {title:'Time', field:'startTime'}

            ],
            data: [

            ],
            edit:false,
        }
    }

    componentDidMount() {
        axios({
            url: 'https://webinar-flow-test.herokuapp.com/home',
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            console.log(response.data.webinars);


            this.setState({data:response.data.webinars});
            } )

    }

    render() {



        return (<Paper elevation={7} >
            <MaterialTable
                title=""


                columns={this.state.columns}
                data={this.state.data}












                editable={{
                    onRowUpdate : (newData, oldData) =>
                    new Promise((resolve, reject) => {

                    setTimeout(() => {
                {
                    axios.put(`https://webinar-flow-test.herokuapp.com/home/${oldData._id}/edit`,querystring.stringify({name:newData.name}),{headers: {
                            'Authorization': 'Bearer ' + this.props.token,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        }}).then((res) =>
                    {
                        if(res.data.edit&&res.data.formUpdate) {
                            const data = this.state.data;
                            const index = oldData.tableData.id;
                            data[index] = newData;
                            console.log(res)
                            this.setState({data:data, edit:true})
                            resolve()
                        }
                        else{resolve()}
                    })
                }

                }, 1000)
                }),



                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {   axios.delete(`https://webinar-flow-test.herokuapp.com/home/${oldData._id}/delete`,{headers: {
                                        'Authorization': 'Bearer ' + this.props.token
                                    }}).then((res) => {
                                        console.log(res);
                                    let data = this.state.data;
                                    const index = oldData.tableData.id;
                                    data.splice(index, 1);
                                    console.log(data)

                                    this.setState({ data});
                                    resolve()

                                }
                            )}

                            }, 1000)
                        }),
                }}
            /></Paper>
        )
    }
}





export default Editable;