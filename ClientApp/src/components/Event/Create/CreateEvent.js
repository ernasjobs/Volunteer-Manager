import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import DropDownBox from '../../DropDown/DropDownBox';
import TextBox from '../../TextBox/TextBox';
import TextArea from '../../TextArea/TextArea';
import PSButton from '../../Button/PSButton';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import './CreateEvent.css';
const initialState = {
    eventName: '',
    eventDescription: '',
    eventNameError: '',
    eventDescriptionError: '',
    eventAddress2: '',
    eventPostcode: '',
    eventPostcodeError: '',
    eventStartDateTime: moment(),
    eventEndDateTime: moment(),
    eventStartDateTimeError: '',
    eventEndDateTimeError: '',
    categories: [],
    category: '',
    categoryError: '',
    status: 'Released',
    correctPostcode: false,
    latitude: null,
    longitude: null

}
const isCorrectPostcodeRegx = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/;
class CreateEvent extends Component {
    constructor(props) {
        super(props);
        // allows us to use this method into our HTML code
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onChangeEventStartDateTime = this.onChangeEventStartDateTime.bind(this);
        this.onChangeEventEndDateTime = this.onChangeEventEndDateTime.bind(this);
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangePostcode = this.onChangePostcode.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
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
    onChangePostcode(e) {
        this.setState({
            eventPostcode: e.target.value,
            correctPostcode: isCorrectPostcodeRegx.test(e.target.value) ? true : false
        });
        

        if (isCorrectPostcodeRegx.test(e.target.value)) {
            if(e.target.value === 'PE2 5RU')
            {
                this.setState({
                    correctPostcode: true,
                    eventAddress2: 'Peterborough',
                    latitude: 52.56557510,
                    longitude: -0.31596920
                });
                console.log('OK!');
            }
            else
            {
                axios.get("https://api.postcodes.io/postcodes/" + e.target.value).then(response1 => {
                    const response = response1.data;
                    this.setState({
                        eventAddress2: response.result.admin_district,
                        latitude: response.result.latitude,
                        longitude: response.result.longitude
                    });
                    console.log(response.result);
                    console.log(this.state.eventAddress2);
                })
                    .catch(error => {
                       
                        this.setState({
                            correctPostcode: false
                        }); console.log(error.response)
                    });
            }

           
        }
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

    componentDidMount() {
        const { history } = this.props;
        if(!localStorage.getItem("user"))
        {
            history.push('/access-forbidden');
        }
        else{
            if (localStorage.getItem("role") !== "Admin")
            {
                history.push('/access-forbidden');
            }
            else
            {
                axios.get("/api/Categories/GetCategories").
                then(response => {
                    console.log(response.data);
                    this.setState({ categories: response.data });
                })
                .catch(error => console.log(error.response));
            }
        }
      
    }
    validate = () => {
        let eventNameError = '';
        let eventDescriptionError = '';
        let eventStartDateTimeError = '';
        let eventEndDateTimeError = '';
        let categoryError = '';
        let postcodeError = '';
        if (!this.state.eventName) {
            eventNameError = 'Event title can not be blank!';
        }
        if (!this.state.eventDescription) {
            eventDescriptionError = 'Event Description can not be blank!';
        }
        if (!this.state.correctPostcode) {
            postcodeError = 'Incorrect postcode provided!';
        }
        if (!this.state.eventStartDateTime) {
            eventStartDateTimeError = 'Event Stat Date & Time can not be blank!';
        }
        if (!this.state.eventEndDateTime) {
            eventEndDateTimeError = 'Event End Date & Time can not be blank!';
        }
        if (!this.state.category) {
            categoryError = 'Please select event category!';
        }

        if (eventNameError || eventDescriptionError || postcodeError || eventStartDateTimeError || eventEndDateTimeError || categoryError) {
            this.setState({ eventNameError, eventDescriptionError, postcodeError, eventStartDateTimeError, eventEndDateTimeError, categoryError });
            return false;
        }
        return true;
    };
    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        const { history } = this.props;
        if (isValid) {

            let eventObject = {

                eventName: this.state.eventName,
                eventDescription: this.state.eventDescription,
                eventStartDateTime: this.state.eventStartDateTime,
                eventEndDateTime: this.state.eventEndDateTime,
                eventStatus: this.state.status,
                eventCategory: this.state.category,
                eventAddress2: this.state.eventAddress2,
                eventPostcode: this.state.eventPostcode,
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }
            console.log(eventObject);
            axios.post("/api/Events/AddEvent", eventObject).then(result => {
                history.push('/events');
            });
            this.setState(initialState);
        }

    }
    render() {
        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
        };

        const className = isMobile ? "MobileEventContainerStyle" : "ContainerEventStyle";
        return (
            <Container className={className} >
                <form>
                    <Row>
                        <Col>
                            <div className="CreateEvents">
                                <h2>Create Event</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateEvents">
                                <TextBox
                                    type="text" required title="Event Title" value={this.state.eventName}
                                    onChange={this.onChangeEventName} placeholder="Enter Event Title" />
                            </div>
                            <div className="CreateEvents">
                                <h3>{this.state.eventNameError}</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateEvents">
                                <TextArea
                                    title="Event Description"
                                    placeholder="Enter Event Description"
                                    rows="3"
                                    cols="25"
                                    value={this.state.eventDescription}
                                    onChange={this.onChangeEventDescription}
                                />
                            </div>
                            <div className="CreateEvents">
                                <h3>{this.state.eventDescriptionError}</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateEvents">
                                <TextBox
                                    type="text" required title="Postcode" value={this.state.postcode}
                                    onChange={this.onChangePostcode} placeholder="Enter Event Postcode" />
                            </div>
                            <div className="CreateEvents">
                                <h3>{this.state.postcodeError}</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateEvents">
                                <DatetimePickerTrigger
                                    shortcuts={shortcuts}
                                    moment={this.state.eventStartDateTime}
                                    onChange={this.onChangeEventStartDateTime}
                                    minDate={new moment()}>
                                    <TextBox
                                        type="text" required title="Event Start Date & Time"
                                        value={this.state.eventStartDateTime.format('DD-MM-YYYY HH:mm')}
                                        onChange={this.onChangeEventStartDateTime}
                                    />
                                </DatetimePickerTrigger>

                            </div>
                            <div className="CreateEvents">
                                <h3>{this.state.eventStartDateTimeError}</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateEvents">
                                <DatetimePickerTrigger
                                    shortcuts={shortcuts}
                                    moment={this.state.eventEndDateTime}
                                    onChange={this.onChangeEventEndDateTime}
                                    minDate={new moment()}>
                                    <TextBox
                                        type="text" required title="Event End Date & Time"
                                        value={this.state.eventEndDateTime.format('DD-MM-YYYY HH:mm')}
                                        onChange={this.onChangeEventEndDateTime}
                                    />
                                </DatetimePickerTrigger>

                            </div>
                            <div className="CreateEvents">
                                <h3>{this.state.eventEndDateTimeError}</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateEvents">
                                <DropDownBox title="Event Category" placeholder="Please Select Cateogry"
                                    idKey="categoryName" nameKey="categoryName" options={this.state.categories} value={this.state.category}
                                    onChange={this.onChangeCategory} id="DesiredCategory" />
                            </div>
                            <div className="CreateEvents">
                                <h3>{this.state.categoryError}</h3>
                            </div>
                        </Col>
                    </Row>
                    <div className="CreateEvents">
                        <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Create" />
                    </div>
                </form>
            </Container>
        );
    }
}
export default CreateEvent;