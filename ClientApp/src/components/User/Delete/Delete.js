import React, { Component } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from 'react-bootstrap';
import PSButton from '../../Button/PSButton';
import './Delete.css';

class Delete1 extends Component {
    constructor(props) {

        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
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
    onCancel(e) {
        const { history } = this.props;
        history.push('/volunteers')
    }
    onConfirmation(e) {
        const { id } = this.props.match.params;
        const { history } = this.props;
        axios.delete("api/Users/DeleteUser/"+ id).then(result =>
            history.push('/volunteers'));
    }

    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                 <Row>
                        <Col>
                            <div className="DeleteUserScreen">
                                <h4>Delete volunteer confirmation</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="DeleteUserScreen">
                            <p>Do you want to delete <span>{this.state.firstName}  {this.state.lastName} ?</span></p>
                            </div>
                        </Col>
                    </Row>
                    <div className="DeleteUserScreen">
                        <PSButton onClick={this.onCancel} to="/volunteers" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onConfirmation} className="smallbutton-red" buttonText="Confirm" />
                    </div>
            </Container>
        )
    }
}
export default Delete1;