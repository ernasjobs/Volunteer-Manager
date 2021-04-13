import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PSButton from '../Button/PSButton';
import './Modal.css';
import {isMobile} from 'react-device-detect';
const Modal = ({id, btnText, btnClass, btnId, ...props}) => {
    const className = isMobile ? "main-modal-mobile" : "main-modal";
    const[show, setShow] = useState(false);

    if(!show) {
        return(
            <PSButton to="none" id={btnId} className={btnClass} buttonText={btnText}
                            onClick={()=>setShow(true)}
                        />
        );
    } else {
        
        return (
            <>
            <PSButton to="none" id={btnId} className={btnClass} buttonText={btnText}
                            onClick={()=>setShow(true)}
                        />
            <div 
             className={className}
            id={id}>
                <span className="close" onClick={() => setShow(false)}>X</span>
                <div className="main-modal-content">
                    {props.children}
                </div>
            </div>
            <div className="modal-overlay" onClick={() => setShow(false)}></div>
            </>
        );   
    }
}

Modal.propTypes = {
    id: PropTypes.string,
    btnText: PropTypes.string,
    btnClass: PropTypes.string,
    btnId: PropTypes.string
};

Modal.defaultProps = {
    id: null,
    btnText: '',
    btnClass: 'mediumbutton',
    btnId: null
};

/* EXAMPLE USE 

<Modal id="hello" btnText="This is a modal button">
    <div>
        <h2>This is a modal</h2>
        <p>Example modal</p>
    </div>
</Modal>

*/

export default Modal;