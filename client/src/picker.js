import React, { Fragment, useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import Free from "./free";



export default function Picker(props) {

    const [selectedDate, handleDateChange] = useState(new Date());
 return( <React.Fragment> <DatePicker

        value={selectedDate}
        onChange={
            handleDateChange

        }
        onAccept={() =>{
        props.change(selectedDate.toDateString())
        }}
        animateYearScrolling
        variant ="inline"
    /></React.Fragment> )


}