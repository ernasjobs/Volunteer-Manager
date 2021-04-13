import React, { Component } from 'react';
import './AccessForbidden.css';
import PSButton from './Button/PSButton';
import { isMobile } from 'react-device-detect';
export class AccessForbidden extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const classImageName = isMobile ? "MobileImageStyle" : "forbiddenimage";
        const classImageName1 = isMobile ? "MobileImageStyle" : "btn";
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className={"col-sm-12 " + classImageName}>
                            <img src={require('../403-forbidden.jpg')} alt="Peterborough" className="img-fluid"></img>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="access-forbidden">
                                <h3>
                                    THE SERVER UNDERSTOOD THE REQUEST BUT REFUSES TO AUTHORISE IT. 
                                </h3>
                                <h5>
                                You do not have permission to view this page!
                                </h5>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={"col-sm-12 " + classImageName1}>
                        <PSButton  to="/" className="mediumbutton" buttonText="Visit Homepage" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccessForbidden;
