import React from 'react';
import PropTypes from 'prop-types';
import {  Link } from 'react-router-dom';

import './PSButton.css';

export const PSButton = ({ to,onClick, className, buttonText, ...props}) => {
  if(to === undefined)
  {
    to = "/emptyLink"
  } 
  else if(to === "none")
  {
    return(
    <button data-testid="ucpButton"
            type="button"
            onClick ={onClick}
            className={className}
            {...props}>
            {buttonText}​
          </button>
    )
  }  
  return (
       <Link to={to}>
          <button data-testid="ucpButton"
            type="button"
            onClick ={onClick}
            className={className}
            {...props}>
            {buttonText}​
          </button>
      </Link>
  );
};
PSButton.propTypes = {
    /**
   * Is this the principal call to action on the page?
   */
className:PropTypes.string,
/**
   * Optional click handler
   */
onClick:PropTypes.func,
};
PSButton.defaultProps = {
    size:'UCPDefault',
};
export default PSButton

/* Example

<UCPButton to="NAMEOFPAGE" primary=true className="Large" buttonText="Click Here"/> 

*/


