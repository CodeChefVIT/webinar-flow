import React from 'react';


var k=0;
export default class Free extends React.Component{
    constructor(props){
        super(props)


    }

    render(){
       console.log('rendered')
        if(k%2==0) {

          console.log("hrer")
            this.props.func(this.props.key);
            console.log(this.props.key)

        }
        k+=1;
        return null




    }




}