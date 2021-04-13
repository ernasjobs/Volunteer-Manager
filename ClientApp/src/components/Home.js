import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
import  {getAllFaqs}  from '../actions/faqActions';
import PSButton from './Button/PSButton';
import { isMobile } from 'react-device-detect';
import Faq from 'react-faq-component';
export class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {faqs : []}
    }
    componentDidMount() {
        this.props.getAllFaqs();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.faqs.data != this.props.faqs.data) {
            this.setState({ faqs: this.props.faqs.data });
            console.log(this.props.faqs.data)
        }
    }

    render() {
        const data = {
            title: "Frequently asked questions",
            rows: this.props.faqs.data
          }
        const classImageName = isMobile ? "MobileImageStyle" : "pslogo";
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className={"col-sm-12 " + classImageName}>
                            <img src={require('../homepageimage1.JPG')} alt="Peterborough" className="img-fluid"></img>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="join-us">
                                <h5>
                                    As our popularity increases we constantly need more people to make things work. <br />
                    We are looking for volunteers  both male and female of any age and from all walks <br /> of life who would
                    like to give up a little of their time on a Tuesday or Thursday <br /> during our sailing season, April to October.
                    </h5>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="container py-2">
                    <h3 className="font-weight-light text-center text-muted py-3">Your <span className="text-primary">Peterborough Sailability</span> volunteer journey</h3>
                    <div className="row no-gutters">
                        <div className="col-sm py-2">
                            <div className="card border-primary shadow">
                                <div className="card-body">
                                    <h4 className="card-title text-primary">Become a Volunteer</h4>
                                    <p>Our volunteer ‘On Boarding’ process ensures you find out whether our organisation and the roles we have to offer are of sufficient 
                                        interest to you and you can give up some of your personal time. At the same time Sailability needs to be sure that you are genuinely interested, have appropriate motivation for the right reasons, receptive to training and development, 
                                        able to operate safely without constant supervision and will not pose a risk to the organisation or its users.</p>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-sm-1 text-center flex-column d-none d-sm-flex">
                            <div className="row h-100">
                                <div className="col border-right">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                            <div className="row h-50">
                                <div className="col">&nbsp;</div>
                                <div className="col">&nbsp;</div>
                            </div>
                        </div>
                        <div className="col-sm py-2">
                            <div className="card border-primary shadow">
                                <div className="card-body">
                                    <div className="float-right"> <PSButton to='/register' className="smallbutton" buttonText="Register" /></div>
                                    <h4 className="card-title  text-primary">Register</h4>
                                    <p className="card-text">Would you like to register with us? If the answer is yes,  then click on the register button to get started. </p>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <div className="card border-primary shadow">
                                <div className="card-body">
                                    <h4 className="card-title  text-primary">Welcome Events</h4>
                                    <p className="card-text">Welcome Event Details to be added here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                <Faq data={data}
                styles={{
                    titleTextColor: "#0170d1",
                    rowTitleColor: "#0170d1",
                    rowContentColor: "black",

                }}
                />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ faqs }) => ({
    faqs
});

export default connect(mapStateToProps, { getAllFaqs })(Home);
