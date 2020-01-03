
import React, { Fragment, useState } from "react";
import { TimePicker, KeyboardTimePicker } from "@material-ui/pickers";



export default function TimePick(props){
    const [selectedDate, handleDateChange] = useState("2018-01-01T00:00:00.000Z");


    return( <TimePicker
        variant="inline"
        onAccept={()=>{
            props.change(selectedDate)


        }}
        value={selectedDate}
        onChange={handleDateChange}
    />)






}