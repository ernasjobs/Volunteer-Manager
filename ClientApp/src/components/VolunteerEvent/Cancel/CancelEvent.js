import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import PSButton from '../../Button/PSButton';
import { isMobile } from 'react-device-detect';
import './CancelEvent.css';
class CancelEvent extends Component {
    constructor(props) {
        super(props);
        this.onCompleteCancel = this.onCompleteCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: null,
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
                eventStartDateTime: response.eventStartDateTime
            })
        })
    }
  
    onCompleteCancel(e) {
        const { history } = this.props;
        history.push('/events');
    }
    onSubmit(e) {
        e.preventDefault();
        const { history } = this.props;
        const { id } = this.props.match.params;
        let eventObject = {

            eventStatus: 'Cancelled',
            eventDetails : this.state.eventDetails
        }
        console.log(eventObject)
        axios.put("api/Events/UpdateEventStatus/" + id, eventObject).then(result => {
            history.push('/events');
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
                                <h2>Cancel Event</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="DisableUserScreen">
                            <p>Do you want to cancel {this.state.eventName} on {new Date(this.state.eventStartDateTime).toLocaleDateString()} at {new Date(this.state.eventStartDateTime).toLocaleTimeString([], { timeStyle: 'short' })} ?</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="DisableUserScreen">
                        <PSButton onClick={this.onCompleteCancel} to="events" className="smallbutton" buttonText="Back" />
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Yes" />
                    </div>
                </form>
            </Container>
            
        );
    }
}
export default CancelEvent;