import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TextBox from '../../TextBox/TextBox';
import PSButton from '../../Button/PSButton';
import { isMobile } from 'react-device-detect';
import './SignUp.css';
const isUpperCaseRegx = /[A-Z]/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    minChar: false,
    upperCase: false,
    specialChar: false,
    minChar1: false,
    upperCase1: false,
    specialChar1: false,
    status: 'New',
    modalHeader: '',
    modalContent: '',
    confirmedEmail: false,
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    userCreation: false
}
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            minChar: e.target.value.length >= 8 ? true : false,
            upperCase: isUpperCaseRegx.test(e.target.value) ? true : false,
            specialChar: specialCharacterRegx.test(e.target.value) ? true : false
        });
    }
    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value,
            minChar1: e.target.value.length >= 8 ? true : false,
            upperCase1: isUpperCaseRegx.test(e.target.value) ? true : false,
            specialChar1: specialCharacterRegx.test(e.target.value) ? true : false
        });
    }
    validate = () => {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let passwordError = '';
        let confirmPasswordError = '';
        let roleError = '';
        if (!this.state.firstName) {
            firstNameError = 'First Name can not be blank!';
        }
        if (!this.state.lastName) {
            lastNameError = 'Last Name can not be blank!';
        }
        if (!this.state.email.includes('@')) {
            emailError = 'Invalid Email!';
        }
         console.log(this.state.password)
        console.log(this.state.minChar );
        console.log(this.state.specialChar);
        console.log(this.state.upperCase);
        if (!(this.state.minChar && this.state.specialChar && this.state.upperCase)) {
            passwordError = 'Invalid Password!';
        }
        if (!(this.state.minChar1 && this.state.specialChar1 && this.state.upperCase1)) {
            confirmPasswordError = 'Invalid Password!';
        }
        if (!this.state.role) {
            roleError = 'Please select desired role!';
        }
        if (emailError || passwordError || confirmPasswordError ||  firstNameError || lastNameError)  {
            this.setState({ emailError, passwordError,confirmPasswordError,firstNameError, lastNameError });
            return false;
        }
        return true;
    };
    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid)
        {
            if(this.state.password === this.state.confirmPassword)
            {
                    let userObject = {
            
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password,
                        status: this.state.status,
                        confirmedEmail: this.state.confirmedEmail,
            
                    }
                    axios.post("api/Users/AddUser", userObject).then(result => {
                        console.log(result);
                        if (result.status == 204) {
                            this.setState({
                                modalHeader: 'Account creation failed',
                                modalContent: 'Email already exist',
                                userCreation: false
                            });
                            this.forceUpdate();
                        }
                        else {
                            this.setState({
                                modalHeader: 'Your initial data have been added succesfully.',
                                modalContent: 'We will get in touch shortly.',
                                userCreation:true
                            });
                        }
            
                    });
                    this.setState(initialState);
            }
            else
            {
                this.setState({
                    modalHeader: 'Passwords do not match',
                    modalContent: 'Please enter same value on both fields',
                    passwordError: 'Enter password again',
                    confirmPasswordError: 'Enter confirm password again',
                });
            }
        }
        else
        {
            this.setState({
                modalHeader: 'Form inputs are not valid.',
                modalContent: 'Please check input fields', 
            });
        }
        
    }
    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                                <h2>Register</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                            <h3>{this.state.modalHeader}</h3>  
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                            <h3>{this.state.modalContent}</h3>  
                            </div>
                        </Col>
                    </Row>
                    {this.state.userCreation ? <div>
                        <Row>
                        <Col>
                            <div className="SignUpScreen">
                            <PSButton onClick={this.onUpdateCancel} to="/" className="smallbutton-red" buttonText="Homepage" /> 
                            </div>
                        </Col>
                    </Row>
                         </div> : 
                    <div>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                                <TextBox
                                    type="text" required title="First Name" value={this.state.firstName}
                                    onChange={this.onChangeFirstName} placeholder="Enter Your First Name" />
                            </div>
                            <div className="SignUpScreen">
                             <h3>{this.state.firstNameError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                                <TextBox required title="Last Name" type="text" value={this.state.lastName}
                                    onChange={this.onChangeLastName} placeholder="Enter Your Last Name" />
                            </div>
                            <div className="SignUpScreen">
                             <h3>{this.state.lastNameError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                                <TextBox required title="Email" type="text" value={this.state.email}
                                    onChange={this.onChangeEmail} placeholder="Enter Your Email" />
                            </div>
                            <div className="SignUpScreen">
                             <h3>{this.state.emailError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                                <TextBox required title="Password" type="password" value={this.state.password}
                                    onChange={this.onChangePassword} placeholder="Enter Password" />
                            </div>
                            <div className="SignUpScreen">
                             <h3>{this.state.passwordError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="SignUpScreen">
                                <TextBox required title="Confirm Password" type="password" value={this.state.confirmPassword}
                                    onChange={this.onChangeConfirmPassword} placeholder="Enter Confirm Password" />
                            </div>
                            <div className="SignUpScreen">
                             <h3>{this.state.confirmPasswordError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <div className="SignUpScreen">
                        <PSButton onClick={this.onUpdateCancel} to="/login" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onSubmit}  to='#'  className="smallbutton-red" buttonText="Register" />
                    </div>
                    </div> }
                </form>
            </Container>
        );
    }
}
export default SignUp;