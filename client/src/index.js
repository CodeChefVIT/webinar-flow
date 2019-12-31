import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Loginpage from './loginpage'

import Delete from './delete';
import TextFields from './textfield'
import * as serviceWorker from './serviceWorker';
import List from './adminlist'

import User from './user'
import Admin from './admin'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const routing = (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Router>
        <div style={{height:"100%"}}>
            <Route exact path="/" component={User} />
            <Route path="/admin" component={Admin} />

        </div>
    </Router>
    </MuiPickersUtilsProvider>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
