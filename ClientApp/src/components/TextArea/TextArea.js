import React from 'react';
import './TextArea.css'
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';

const TextArea = ({ backgroundColor, value, name, type, title,id, rows, cols, required, placeholder, onChange, ...props }) => {
    const className = isMobile ? "mobiletextareabox" : "textareabox";

    return (
        <div className={`${className ? "mobiletextareabox" : "textareabox"}`}>
            <label htmlFor={id}>{title}</label>
            <textarea
                required
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
            />
        </div>
    );
};

TextArea.propTypes = {
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string
};

TextArea.defaultProps = {

    backgroundColor: null,
    size: 20,
    rows: 6,
    cols: 20,
};

/* Example Use

<TextArea 
    title="Event Description" 
    placeholder="Enter event description" 
    rows="5" 
    cols="30"
    type="text" 
/>

*/

export default TextArea;
