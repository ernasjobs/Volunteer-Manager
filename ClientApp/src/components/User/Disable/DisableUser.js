import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PSButton from '../../Button/PSButton';
import { isMobile } from 'react-device-detect';
import './DisableUser.css';
class DisableUser extends Component {
    constructor(props) {
        super(props);
        this.onDisableCancel = this.onDisableCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Users/SingleUser/" + id).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                firstName: response.firstName,
                lastName: response.lastName
               
            })
        })
    }
  
    onDisableCancel(e) {
        const { history } = this.props;
        history.push('/volunteers');
    }
    onSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        let userObject = {

            status: 'Locked'
        }
        console.log(userObject)
        axios.put("api/Users/LockUser/" + id, userObject).then(result => {
            history.push('/volunteers');
        })
    }
    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="DisableUserScreen">
                                <h2>Lock Volunteer</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="DisableUserScreen">
                            <p>Do you want to lock <span>{this.state.firstName} {this.state.lastName} ?</span></p>
                            </div>
                        </Col>
                    </Row>
                    <div className="DisableUserScreen">
                        <PSButton onClick={this.onDisableCancel} to="/volunteers" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Lock User" />
                    </div>
                </form>
            </Container>
        );
    }
}
export default DisableUser;