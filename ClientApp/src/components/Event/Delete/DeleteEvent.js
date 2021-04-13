import React, { Component } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from 'react-bootstrap';
import PSButton from '../../Button/PSButton';
import './DeleteEvent.css';

class DeleteEvent extends Component {
    constructor(props) {

        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);
        this.state = {
            eventName: '',
            eventStartDateTime: '',
            
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Events/SingleEvent/" + id).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                eventName: response.eventName,
                eventStartDateTime: response.eventStartDateTime,
            })
        })
    }
    onCancel(e) {
        const { history } = this.props;
        history.push('/events')
    }
    onConfirmation(e) {
        const { id } = this.props.match.params;
        const { history } = this.props;
        axios.delete("api/Events/DeleteEvent/"+ id).then(result =>
            history.push('/events'));
    }

    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                 <Row>
                        <Col>
                            <div className="DeleteEventScreen">
                                <h4>Delete Event Confirmation</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="DeleteEventScreen">
                            <p>Do you want to delete <span>{this.state.eventName} on {new Date(this.state.eventStartDateTime).toLocaleDateString()} {new Date(this.state.eventStartDateTime).toLocaleTimeString()} ?</span></p>
                            </div>
                        </Col>
                    </Row>
                    <div className="DeleteEventScreen">
                        <PSButton onClick={this.onCancel} to="/events" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onConfirmation} className="smallbutton-red" buttonText="Confirm" />
                    </div>
            </Container>
        )
    }
}
export default DeleteEvent;