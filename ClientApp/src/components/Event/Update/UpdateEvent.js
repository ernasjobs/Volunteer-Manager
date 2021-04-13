import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TextBox from '../../TextBox/TextBox';
import PSButton from '../../Button/PSButton';
import DropDownBox from '../../DropDown/DropDownBox';
import TextArea from '../../TextArea/TextArea';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import { isMobile } from 'react-device-detect';
import './UpdateEvent.css';
class UpdateEvent extends Component {
    constructor(props) {
        super(props);
        // allows us to use this method into our HTML code
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onChangeEventStartDateTime = this.onChangeEventStartDateTime.bind(this);
        this.onChangeEventEndDateTime = this.onChangeEventEndDateTime.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeEventStatus = this.onChangeEventStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            eventName: '',
            eventDescription: '',
            eventStartDateTime: moment(),
            eventEndDateTime: moment(),
            categories: [],
            category: '',
            eventstatuses: [],
            status: '',
            eventNameError: '',
            eventDescriptionError: '',
            categoryError: '',
            statusError: '',
            header: '',
            content: ''

        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Events/SingleEvent/" + id).then(event => {
            const response = event.data;
            console.log(response);
            this.setState({
                eventName: response.eventName,
                eventDescription: response.eventDescription,
                eventStartDateTime: moment(response.eventStartDateTime),
                eventEndDateTime: moment(response.eventEndDateTime),
                category: response.eventCategory,
                status: response.eventStatus
            })
        })

        axios.get("/api/Categories/GetCategories").
        then(category => {
            console.log(category.data);
            this.setState({ categories: category.data});
            
        })

        .catch(error => console.log(error.response));
        axios.get("/api/EventStatus/GetEventsStatuses").
        then(status => {
            console.log(status.data);
            this.setState({ eventstatuses: status.data });
        })
        .catch(error => console.log(error.response));


    }
    onChangeEventName(e) {
        this.setState({
            eventName: e.target.value
        });
    }
    onChangeEventDescription(e) {
        this.setState({
            eventDescription: e.target.value
        });
    }
    onChangeEventStartDateTime = (eventStartDateTime) => {
        this.setState({
            eventStartDateTime
        });
    }
    onChangeEventEndDateTime = (eventEndDateTime) => {
        this.setState({
            eventEndDateTime
        });
    }
    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }
    onChangeEventStatus(e) {
        this.setState({
            status: e.target.value
        });
    }
    validate = () => {
        let eventNameError = '';
        let eventDescriptionError = '';
        let categoryError = '';
        let statusError = '';

        if (!this.state.eventName)
        {
            eventNameError = "Event title can't be blank!";
        }
        if(!this.state.eventDescription)
        {
            eventDescriptionError = "Event Description can't be blank!";
        }
        if (!this.state.category)
        {
            categoryError = 'Select Category!';
        }
        if(!this.state.status)
        {
            statusError = 'Select Event Status!';
        }
        if (eventNameError || eventDescriptionError || categoryError || statusError)
        {
            this.setState({eventNameError, eventDescriptionError, categoryError, statusError});
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
            let eventObject = {

                eventName: this.state.eventName,
                eventDescription: this.state.eventDescription,
                eventStartDateTime: this.state.eventStartDateTime,
                eventEndDateTime: this.state.eventEndDateTime,
                eventCategory : this.state.category, 
                eventStatus : this.state.status,

            }
            console.log(eventObject);
            axios.put("api/Events/UpdateEvent/" + id, eventObject).then(result => {
                history.push('/events');
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
        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
        };
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                                <h2>Update Event</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                            <h3>{this.state.header}</h3>  
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                            <h3>{this.state.content}</h3>  
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                                <TextBox
                                    type="text" required title="Title" value={this.state.eventName}
                                    onChange={this.onChangeEventName} placeholder="Enter Event Title" />
                            </div>
                            <div className="UpdateEventScreen">
                             <h3>{this.state.eventNameError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                                <TextArea
                                    title="Description"
                                    placeholder="Enter Event Description"
                                    rows="3"
                                    cols="25"
                                    value={this.state.eventDescription}
                                    onChange={this.onChangeEventDescription}
                                />
                            </div>
                            <div className="UpdateEventScreen">
                             <h3>{this.state.eventDescriptionError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                                <DatetimePickerTrigger
                                    shortcuts={shortcuts}
                                    moment={this.state.eventStartDateTime}
                                    onChange={this.onChangeEventStartDateTime}
                                    minDate = {new moment()}>
                                        <TextBox
                                        type="text" required title=" Start DateTime"
                                        value={this.state.eventStartDateTime.format('DD-MM-YYYY HH:mm')}
                                        onChange={this.onChangeEventStartDateTime}
                                    />
                                </DatetimePickerTrigger>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                                <DatetimePickerTrigger
                                    shortcuts={shortcuts}
                                    moment={this.state.eventEndDateTime}
                                    onChange={this.onChangeEventEndDateTime}
                                    minDate = {new moment()}>
                                        <TextBox
                                        type="text" required title=" End DateTime"
                                        value={this.state.eventEndDateTime.format('DD-MM-YYYY HH:mm')}
                                        onChange={this.onChangeEventEndDateTime}
                                    />
                                </DatetimePickerTrigger>
                                
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                                <DropDownBox title="Update Category" placeholder={this.state.category}

                                    idKey="categoryName" nameKey="categoryName" options={this.state.categories} value={this.state.category}
                                    onChange={this.onChangeCategory} id="DesiredCategory" />
                            </div>
                            <div className="UpdateEventScreen">
                             <h3>{this.state.categoryError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="UpdateEventScreen">
                                <DropDownBox title="Update Status" placeholder= {this.state.status}
                                    idKey="eventStatusName" nameKey="eventStatusName" options={this.state.eventstatuses} value={this.state.status}
                                    onChange={this.onChangeEventStatus} id="DesiredStatus" />
                            </div>
                            <div className="UpdateEventScreen">
                             <h3>{this.state.statusError}</h3>
                        </div>
                        </Col>
                    </Row>
                    <div className="UpdateUserScreen">
                        <PSButton onClick={this.onUpdateCancel} to="/events" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Update" />
                    </div>
                </form>
            </Container>
        );
    }
}
export default UpdateEvent;