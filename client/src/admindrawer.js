import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from "@material-ui/core/Button";




export default class Drawers extends React.Component {
constructor(props) {
super(props);

    this.toggleDrawer = this.toggleDrawer.bind(this);

}
    state = {
        open: false,
    };

    toggleDrawer = (val) => {


        this.setState({open: val});
    };

    render() {
        return (<div>
            <Button onClick={() => {
                this.toggleDrawer(true)

            }} style={{color: "red"}}>DRAW</Button>
            <Drawer anchor="right" open={this.state.open} style={{width: "10%"}} onClose={this.toggleDrawer(false)}>
            </Drawer>
        </div>)


    }












}


