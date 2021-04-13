import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextBox from '../../TextBox/TextBox';
import PSButton from '../../Button/PSButton';
import {isMobile} from 'react-device-detect';
import './Login.css';
const initialState = {
            email: '',
            password: '',
            invalidLogin: false,
            errorMessage: '',
            user: null,
            emailError: '',
            passwordError: ''
}
class Login extends Component {
    constructor(props) {
        super(props);
        // allows us to use this method into our HTML code
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    validate = () => {
        let emailError = '';
        let passwordError = '';
        if (!this.state.email.includes('@'))
        {
            emailError = 'Invalid Email!';
        }
        if(!this.state.password)
        {
            passwordError = 'Password can not be blank!';
        }
        if (emailError || passwordError)
        {
            this.setState({emailError, passwordError});
            return false;
        }
        return true;
    };
    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid)
        {
            const { history } = this.props;
            let userObject = {
    
                email: this.state.email,
                password: this.state.password
            }
            axios.post("api/Users/Login", userObject,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(result => {
                console.log(userObject);
                if (result.status == 200) {
    
    
                    const response = result.data;
                    if(response.emailVerified === true && response.status === "Active" )
                    {
                        localStorage.setItem('user', response.firstName);
                        this.props.updateLoggedInStatus(localStorage.getItem("user"));
                        localStorage.setItem('id', response.id);
                        localStorage.setItem('role', response.role);
                        this.props.updateLoggedInId(localStorage.getItem("id"));
                        console.log(response);
                        history.push('/display-events');
                    }
                    else
                    {
                        this.setState({
                            invalidLogin: true,
                            email: '',
                            password: '',
                            errorMessage: 'Onboarding in process!'
                        });
                    }
                   
                }
                else {
                    this.setState({
                        invalidLogin: true,
                        email: '',
                        password: '',
                        errorMessage: 'Invalid Username or Password!'
                    });
                }
            })
              // clear form
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
                    <div className="LoginScreen">
                        <h2>Login</h2>  
                    </div>
                    </Col>
                </Row>
                <Row>
                   <Col>
                   <div className="LoginScreen">
                   { this.state.invalidLogin &&
                    <p>{this.state.errorMessage}</p>}
                    </div>
                   </Col>         
                </Row>
                <Row>
                        <Col>
                        <div className="LoginScreen">
                            <TextBox
                             type="text"  title="Email" value={this.state.email}
                             onChange={this.onChangeEmail} placeholder="Enter Your Email"/> 
                             
                        </div>
                        <div className="LoginScreen">
                             <h3>{this.state.emailError}</h3>
                             <br/>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="LoginScreen">
                            <TextBox  title="Password" type="password" value={this.state.password}
                            onChange={this.onChangePassword} placeholder="Enter Your Password"/>   
                        </div>
                        <div className="LoginScreen">
                             <h3>{this.state.passwordError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Link className="forgotten-password" to='/verifyuser'>Forgotten your password?</Link>
                    <div className="LoginScreen">
                        <PSButton onClick={this.onSubmit}  className="smallbutton" buttonText="Login" />
                    </div>
                    <Row>
                        <Col>
                        <br/>
                        <Link className="register-now" to='/register'>Not a member? Register now</Link>
                        </Col>
                    </Row>
                    
                </form>
            </Container>
        );
    }
}
export default Login;