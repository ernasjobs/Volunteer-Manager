import React from 'react';
import './DateTimePicker.css'
import DateTimePicker from 'react-datetime-picker';
import { isMobile } from 'react-device-detect';

const DateTimePickerElement = ({ value, name, title, required, onChange, ...props }) => {
    const className = isMobile ? "mobiledatetimepicker" : "datetimepicker";

    return (
        <div className={`${className ? "mobiledatetimepicker" : "datetimepicker"}`}>
            <label >{title}</label>
            <DateTimePicker
                format ="dd-MM-y hh:mm a"
                required = "true"
                value={value}
                closeWidgets = "true"
                showLeadingZeros = "false"
                onChange={onChange}
                minDate = {new Date()}
            />

        </div>
    );
};


/* Example Use

<DateTimePickerElement
                tile = "Select Start Date and Time"
                required
                value={value}
                onChange={onChange}
            />

*/

export default DateTimePickerElement;
