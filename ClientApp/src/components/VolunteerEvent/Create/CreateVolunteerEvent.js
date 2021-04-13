import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TextArea from '../../TextArea/TextArea';
import PSButton from '../../Button/PSButton';
import { isMobile } from 'react-device-detect';
import './CreateVolunteerEvent.css';
import moment from 'moment';
const initialState = {
    eventId: '',
    volunteerEventAttended: false,
    volunteerEventNote: '',
    eventName: '',
    eventStartDateTime: moment(),

}
class CreateVolunteerEvent extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChangeVolunteerEventNote = this.onChangeVolunteerEventNote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);    
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get("api/Events/SingleEvent/" + this.props.match.params.id).then(event => {
            const response = event.data;
            console.log(response);
            this.setState({
                eventName: response.eventName,
                eventStartDateTime: moment(response.eventStartDateTime),
                eventId: response.id,
            })
        })
    }
    onChangeVolunteerEventNote(e) {
        this.setState({
            volunteerEventNote: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
            const { history } = this.props;
            let volunteerEventObject = {
    
                id: parseInt(this.state.eventId),
                eventName: this.state.eventName,
                eventStartDateTime : this.state.eventStartDateTime,
                volunteerId: parseInt(localStorage.getItem("id")),
                volunteerEventAttended: this.state.volunteerEventAttended,
                volunteerEventNote: this.state.volunteerEventNote
            }
            console.log(volunteerEventObject);
            axios.post("api/VolunteerEvent/AddVolunteerEvent", volunteerEventObject).then(result => {
                console.log(result);
                history.push('/display-events');
            });
        }
        
    render() {
       
        const className = isMobile ? "MobileEventContainerStyle" : "ContainerEventStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="CreateVolunteerEvent">
                                <h2>Join Event</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateVolunteerEvent">
                                <TextArea
                                    title="Volunteer Event Note"
                                    placeholder="Enter Volunteer Event Note"
                                    rows="3"
                                    cols="25"
                                    value={this.state.volunteerEventNote}
                                    onChange={this.onChangeVolunteerEventNote}
                                />
                            </div>
                        </Col>
                    </Row>
                   
                    <div className="CreateVolunteerEvent">
                         <PSButton to ="/display-events" className="smallbutton" buttonText="Cancel" />        
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Join" />
                       
                    </div>
                </form>
            </Container>
        );
    }
}
export default CreateVolunteerEvent;