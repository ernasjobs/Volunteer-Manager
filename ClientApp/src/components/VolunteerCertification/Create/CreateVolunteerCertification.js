import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TextArea from '../../TextArea/TextArea';
import TextBox from '../../TextBox/TextBox';
import PSButton from '../../Button/PSButton';
import { isMobile } from 'react-device-detect';
import './CreateVolunteerCertification.css';
import DropDownBox from '../../DropDown/DropDownBox';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import 'rc-datetime-picker/dist/picker.css';
import moment from 'moment';
const initialState = {

    certifications: [],
    certificationName: '',
    certificationNameError: '',
    certificationNameError: '',
    certificationDate: moment(),
    certificationDateError: '',
    certificationNote: '',
    certificationNoteError: '',
    volunteerId: null,
    volunteerName: '',
    messageHeader: '',
    messageContent: '',
    certificationAdded: false

}
class CreateVolunteerCertification extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCertificationNote = this.onChangeCertificationNote.bind(this);
        this.onChangeCertificationDate = this.onChangeCertificationDate.bind(this);
        this.onChangeCertification = this.onChangeCertification.bind(this);
        this.onClickNew = this.onClickNew.bind(this);
    }
    onChangeCertificationNote(e) {
        this.setState({
            certificationNote: e.target.value
        });
    }
    onChangeCertificationDate = (certificationDate) => {
        this.setState({
            certificationDate
        });
    }
    onChangeCertification(e) {
        this.setState({
            certificationName: e.target.value
        });
    }
    onClickNew()
    {
        this.forceUpdate();
        this.setState({
            certificationAdded: false,
            messageHeader: '',
            messageContent: '',
        })
        this.componentDidMount();
    }

    componentDidMount() {
        axios.get("/api/Certifications/GetCertifications").
            then(response => {
                console.log(response.data);
                this.setState({ certifications: response.data });
            })
            .catch(error => console.log(error.response));

        console.log(this.props.match.params.id);
        axios.get("api/Users/SingleUser/" + this.props.match.params.id).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                volunteerId: response.id,
                volunteerName: response.firstName + " " + response.lastName

            })
        })
    }
    validate = () => {
        let certificationNameError = '';

        if (!this.state.certificationName) {
            certificationNameError = 'Please select certification type!';
        }

        if (certificationNameError) {
            this.setState({ certificationNameError });
            return false;
        }
        return true;
    };

    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let volunteerCertificationObject = {

                volunteerId: parseInt(this.state.volunteerId),
                certificationName: this.state.certificationName,
                certificationDate: this.state.certificationDate,
                certificationNote: this.state.certificationNote
            }
            console.log(volunteerCertificationObject);
            axios.post("api/VolunteerCertification/AddVolunteerCertification", volunteerCertificationObject).then(result => {
                console.log(result);
                if (result.status == 204) {
                    this.setState({
                        messageHeader: 'Volunteer already has this certification',
                        messageContent: '',
                        certificationAdded: false
                    });
                    this.componentDidMount();
                }
                else {
                    this.setState({
                        messageHeader: 'Certification added succesfully.',
                        messageContent: 'Click new to add another certification.',
                        certificationAdded: true
                    });
                    this.componentDidMount();
                }
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
                            <div className="CreateVolunteerCertification">
                                <h2>Add Certification</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateVolunteerCertification">
                                <h6>Volunteer Name: {this.state.volunteerName}</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateVolunteerCertification">
                                <h6>{this.state.messageHeader}</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="CreateVolunteerCertification">
                                <h6>{this.state.messageContent}</h6>
                            </div>
                        </Col>
                    </Row>
                    { this.state.certificationAdded ?
                        <div>
                            <Row>
                                <Col>
                                    <div className="CreateVolunteerCertification">
                                        <PSButton onClick={this.onUpdateCancel} to="/volunteers" className="smallbutton-red" buttonText="Go back" />
                                        <PSButton onClick={this.onClickNew} to="#" className="smallbutton" buttonText="New" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        :
                        <div>
                            <Row>
                                <Col>
                                    <div className="CreateVolunteerCertification">
                                        <DropDownBox title="Certification Name" placeholder="Please Select Certification"
                                            idKey="certificationName" nameKey="certificationName" options={this.state.certifications} value={this.state.certificationName}
                                            onChange={this.onChangeCertification} id="CertificationId" />
                                    </div>
                                    <div className="CreateVolunteerCertification">
                                        <h3>{this.state.certificationNameError}</h3>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="CreateVolunteerCertification">
                                        <DatetimePickerTrigger
                                            shortcuts={shortcuts}
                                            moment={this.state.certificationDate}
                                            onChange={this.onChangeCertificationDate}
                                            minDate={new moment()}>
                                            <TextBox
                                                type="text" required title="Date Acchieved"
                                                value={this.state.certificationDate.format('DD-MM-YYYY HH:mm')}
                                                onChange={this.onChangeCertificationDate}
                                            />
                                        </DatetimePickerTrigger>

                                    </div>
                                    <div className="CreateVolunteerCertification">
                                        <h3>{this.state.certificationDateError}</h3>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="CreateVolunteerCertification">
                                        <TextArea
                                            title="Certification Note"
                                            placeholder="Enter Certification Note"
                                            rows="3"
                                            cols="25"
                                            value={this.state.certificationNote}
                                            onChange={this.onChangeCertificationNote}
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="CreateVolunteerCertification">
                                <PSButton to="/volunteers" className="smallbutton" buttonText="Cancel" />
                                <PSButton onClick={this.onSubmit} className="smallbutton-red" buttonText="Add" />

                            </div>
                        </div>}
                </form>
            </Container>
        );
    }
}
export default CreateVolunteerCertification;