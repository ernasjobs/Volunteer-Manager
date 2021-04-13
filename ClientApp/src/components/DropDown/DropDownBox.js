import React from 'react'
import './DropDownBox.css'
import {isMobile} from 'react-device-detect';

const DropDownBox = ({ title, size,idKey,nameKey, placeholder, type, onChange,...props}) => {
    const className = isMobile ? "MobileDropdown" : "Dropdown";
  
  return (
    <div className={`${className ? "MobileDropdown" : "Dropdown"}`} >
    <label id="selectRoleLabel">{title}</label>
    <br/>
  <select 
    onChange={onChange}>
    <option   value="" className="text-hide" >{placeholder}</option>
      {props.options.map(value => (
        <option key={value[idKey]} value={value[nameKey]}>{value[nameKey]}</option>
      ))}
  </select>
  </div>
  );
}
export default DropDownBox;

