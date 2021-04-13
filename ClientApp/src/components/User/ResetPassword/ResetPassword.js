import React, {Component } from 'react';
import axios from 'axios';
import './ResetPassword.css';
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from 'react-bootstrap';
import TextBox from '../../TextBox/TextBox';
import PSButton from '../../Button/PSButton';
const initialState = {
    password: '',
    user: null,
    passwordError: ''
}
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        // allows us to use this method into our HTML code
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id);
        axios.get("api/Users/SingleUser/" + id).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                id : response.id,
                
            })
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    validate = () => {
        let passwordError = '';
        
        if(!this.state.password)
        {
            passwordError = 'Password can not be blank!';
        }
        if ( passwordError)
        {
            this.setState({passwordError});
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
                
                password: this.state.password
            }
            console.log(this.state.id);
            axios.put("api/Users/ResetPassword/"+this.state.id, userObject).then(result => {
                console.log(userObject);
                if (result.status == 200) {
                  
                    const response = result.data;
                    console.log(response);
                    localStorage.clear();
                    history.push('/login');
                }
                else {
                    this.setState({
                        email: '',
                        password: '',
                        errorMessage: 'Database Error'
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
                            <div className="ResetPassScreen">
                                <h2>Reset Password</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="ResetPassScreen">
                                <TextBox
                                    type="password" required title="Password" value={this.state.password}
                                    onChange={this.onChangePassword} placeholder="Enter Your New Password" />
                            </div>
                            <div className="ResetPassScreen">
                             <h3>{this.state.passwordError}</h3>
                            </div>
                        </Col>
                    </Row>
                    <div className="ResetPassScreen">
                        <PSButton onClick={this.onSubmit} className="smallbutton" buttonText="Reset" />
                    </div>
                </form>
            </Container>
        );
    }
}
export default ResetPassword;