import React from 'react';
import PSLogo  from './logo.svg';
import QueensLogo from './queens-award.jpg';
import './Logo.css';
import {isMobile} from 'react-device-detect';

const Logo = () => {

    const className = isMobile ? "MobilePSLogo" : "PSLogo";

    return (
        <header>   
               <img  src={PSLogo} className="test21" alt="Peterborough Sailability official logo" />
               <img  src={QueensLogo} className="test1" alt="Peterborough Sailability official logo" /> 
        </header>
    )
}

export default Logo;