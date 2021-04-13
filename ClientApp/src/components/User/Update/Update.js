import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TextBox from '../../TextBox/TextBox';
import PSButton from '../../Button/PSButton';
import { isMobile } from 'react-device-detect';
import './Update.css';
class Update extends Component {
    constructor(props) {
        super(props);
        // allows us to use this method into our HTML code
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            header: '',
            content: ''
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Users/SingleUser/" + id).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                password: response.password,
            })
        })
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
            password: e.target.value
        });
    }
    onUpdateCancel(e) {
        const { history } = this.props;
        history.push('/volunteers');
    }
    validate = () => {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let passwordError = '';

        if (!this.state.firstName)
        {
            firstNameError = "First Name can't be blank!";
        }
        if(!this.state.lastName)
        {
            lastNameError = "Last Name can't be blank!";
        }
        if (!this.state.email.includes('@'))
        {
            emailError = 'Invalid Email!';
        }
        if(!this.state.password)
        {
            passwordError = 'Password can not be blank!';
        }
        if (emailError || passwordError || firstNameError || lastNameError)
        {
            this.setState({emailError, passwordError, firstNameError, lastNameError});
            return false;
        }
        return true;
    };
    onSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        const isValid = this.validate();
        if (isValid)
        {
           
            const { id } = this.props.match.params;
            let userObject = {

                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            axios.put("api/Users/UpdateUser/" + id, userObject).then(result => {
                history.push('/volunteers');
            })
        }
        else
        {
            this.setState({
                header: 'Form inputs are not valid.',
                content: 'Please check input fields', 
            });
            history.push('#')
        }

    }
    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="UpdateUserScreen">
                                <h2>Update Volunteer</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateUserScreen">
                            <h3>{this.state.header}</h3>  
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateUserScreen">
                            <h3>{this.state.content}</h3>  
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateUserScreen">
                                <TextBox
                                    type="text" required title="First Name" value={this.state.firstName}
                                    onChange={this.onChangeFirstName} />
                            </div>
                            <div className="UpdateUserScreen">
                             <h3>{this.state.firstNameError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateUserScreen">
                                <TextBox
                                    type="text" required title="Last Name" value={this.state.lastName}
                                    onChange={this.onChangeLastName}  />
                            </div>
                            <div className="UpdateUserScreen">
                             <h3>{this.state.lastNameError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateUserScreen">
                                <TextBox
                                    type="text" required title="Email" value={this.state.email}
                                      onChange={this.onChangeEmail}  />
                            </div>
                            <div className="UpdateUserScreen">
                             <h3>{this.state.emailError}</h3>
                        </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateUserScreen">
                                <TextBox required title="Password" type="password" value={this.state.password}
                                  onChange={this.onChangePassword} />
                            </div>
                            <div className="UpdateUserScreen">
                             <h3>{this.state.passwordError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <div className="UpdateUserScreen">
                        <PSButton onClick={this.onUpdateCancel} to="/volunteers" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Update" />
                    </div>
                </form>
            </Container>
        );
    }
}
export default Update;