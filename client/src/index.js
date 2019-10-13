import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Loginpage from './loginpage'
import AddWebinar from './addwebinar'
import Delete from './delete';
import TextFields from './textfield'
import * as serviceWorker from './serviceWorker';
import List from './adminlist'
ReactDOM.render( <div>
<List />
    {/*<button onClick={this.handleDelete}>Delete Webinar</button>*/}
<AddWebinar/>
<TextFields /></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
