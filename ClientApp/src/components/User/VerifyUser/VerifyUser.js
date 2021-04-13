import React, { Component } from 'react';
import axios from 'axios';
import './VerifyUser.css';
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from 'react-bootstrap';
import TextBox from '../../TextBox/TextBox';
import PSButton from '../../Button/PSButton';
const initialState = {
             email: '',
            invalidAccount: false,
            errorMessage: '',
            emailError: '',
            user: null,
            diplayForm: true
}
class VerifyUser extends Component {
    constructor(props) {
        super(props);
        // allows us to use this method into our HTML code
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    validate = () => {
        let emailError = '';
        if (!this.state.email.includes('@'))
        {
            emailError = 'Invalid Email!';
        }
        
        if (emailError)
        {
            this.setState({emailError});
            return false;
        }
        return true;
    };
    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        const { history } = this.props;
        if(isValid)
        {
            let userObject = {

                email: this.state.email,
                password: ""
            }
            axios.post("api/Users/Verify", userObject,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(result => {
                console.log(userObject);
                if (result.status == 200) {
    
                    const response = result.data;
                    if(response.emailVerified == true)
                    {
                   /* localStorage.setItem('user', response.firstName);
                    localStorage.setItem('userId', response.id); */
                    console.log(response);
                    this.setState({
                        invalidAccount: true,
                        email: '',
                        errorMessage: 'Please check your email to reset your password!',
                        diplayForm: false
                    });
                    }
                   
                }
                else {
                    this.setState({
                        invalidAccount: true,
                        email: '',
                        password: '',
                        errorMessage: 'Email Does Not Exist!', 
                        diplayForm: true
                    });
                }
            });
            this.setState(initialState);
        }   
    }
    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="VerifyScreen">
                                <h2>Reset Account</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="VerifyScreen">
                                {this.state.invalidAccount &&
                                    <p>{this.state.errorMessage}</p>}
                            </div>
                        </Col>
                    </Row>
                    { this.state.diplayForm && 
                    <div>
                    <Row>
                        <Col>
                            <div className="VerifyScreen">
                                <TextBox
                                    type="text" required title="Email" value={this.state.email}
                                    onChange={this.onChangeEmail} placeholder="Enter Your Email" />
                            </div>
                            <div className="VerifyScreen">
                             <h3>{this.state.emailError}</h3>
                             <br/> 
                        </div>
                        </Col>
                    </Row>
                    <div className="VerifyScreen">
                        <PSButton onClick={this.onUpdateCancel} to="/login" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Check" />
                    </div>
                    </div>
                    }
                    {
                        !this.state.diplayForm &&
                        <div className="VerifyScreen">
                        <PSButton onClick={this.onUpdateCancel} to="/login" className="smallbutton-red" buttonText="Check" />
                        </div>
                    }
                </form>
                <br/>
                <br/>
            </Container>
        );
    }
}
export default VerifyUser;