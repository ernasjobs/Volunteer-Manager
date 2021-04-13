import React, { Component } from 'react';
import axios from 'axios';
import './ActivateAccount.css';
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from 'react-bootstrap';
import PSButton from '../../Button/PSButton';
class ActivateAccount extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            
            user: null, 
            emailVerified: false,
            id: null,
            status: 'Active'
        }
    }
    
    componentDidMount() {
        const { token } = this.props.match.params;
        axios.get("api/Users/NewUser/" + token).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                id : response.id,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                password: response.password,
                emailVerified: response.emailVerified
            })
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        let userObject = {

            emailVerified: true, 
            status: this.state.status
        }
        axios.put("api/Users/ActivateUser/" + this.state.id, userObject).then(result => {
            history.push('/login');
        })
    }
    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="VerifyScreen">
                                <h2>Activate Account</h2>
                            </div>
                        </Col>
                    </Row>
                    <div className="VerifyScreen">
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Activate" />
                    </div>
                </form>
            </Container>
        );
    }
}
export default ActivateAccount;