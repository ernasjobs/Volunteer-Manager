import React, { Component } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from 'react-bootstrap';
import PSButton from '../../Button/PSButton';
import './DeleteVolunteerEvent.css';
import moment from 'moment';
class DeleteVolunteerEvent extends Component {
    constructor(props) {

        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirmation = this.onConfirmation.bind(this);
        this.state = {
            eventName: '',
            eventStartDateTime: '',
            eventName: '',
            eventStartDateTime: moment(),
            
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
        let leaveEventObject = 
        {
            id: parseInt(id),
            volunteerId: parseInt(localStorage.getItem("id")),
            eventName: this.state.eventName,
            eventStartDateTime : this.state.eventStartDateTime,
        };
        console.log(leaveEventObject);
        axios.delete("api/VolunteerEvent/LeaveEvent", {data:leaveEventObject}).then(result =>
            history.push('/display-events'));
    }

    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                 <Row>
                        <Col>
                            <div className="DeleteVolunteerEvent">
                                <h4>Leave Event </h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="DeleteVolunteerEvent">
                            <p>Do you want to leave <span>{this.state.eventName} event on {new Date(this.state.eventStartDateTime).toLocaleDateString()} at {new Date(this.state.eventStartDateTime).toLocaleTimeString([], { timeStyle: 'short' })} ?</span></p>
                            </div>
                        </Col>
                    </Row>
                    <div className="DeleteVolunteerEvent">
                        <PSButton to="/display-events" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onConfirmation} className="smallbutton-red" buttonText="Leave" />
                    </div>
            </Container>
        )
    }
}
export default DeleteVolunteerEvent;