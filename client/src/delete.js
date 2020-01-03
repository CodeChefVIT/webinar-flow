import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css'
import Axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

function Del(props) {

    console.log(props)
    Axios.delete('https://webinar-flow-test.herokuapp.com/home/' + props.id + '/delete',{headers: {
            'Authorization': 'Bearer ' + props.token
        }}).then((res) => console.log(res));
}
export default function Delete(props) {
    return(  < IconButton onClick={() => Del(props)} ><DeleteIcon/>< /IconButton> );


}









