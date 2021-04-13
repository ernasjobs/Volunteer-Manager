import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import TextBox from '../../TextBox/TextBox';
import DropDownBox from '../../DropDown/DropDownBox';
import RadioButton from '../../RadioButton/RadioButton';
import TextArea from '../../TextArea/TextArea';
import PSButton from '../../Button/PSButton';
import './CompleteUserInfo.css';
const isCorrectPostcodeRegx =  /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/;
const isCorrectMobileNumberRegx = /^\(?[+. ]?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;
const initialState = {
    email: '',
    firstName: '',
    activiationCode: '',
    lastName: '',
    address1: '',
    address2: '',
    postcode: '',
    mobileNumber: '+44',
    roles: [],
    role: '',
    noKinFullName: '',
    noKinMobileNumber: '+44',
    noKinRelationship: '',
    medicalConditions: '',
    address1Error: '',
    address2Error: '',
    postcodeError: '',
    correctPostcode: false,
    correctNumber: false,
    correctNumber1: false,
    mobileNumberError: '',
    roleError: '',
    noKinFullNameError: '',
    noKinMobileNumberError: '',
    noKinRelationshipError: '',
    medicalConditionsError: '',
    status: 'Activating',
    userCompletion: false, 
    errorMessage: ''
   
}
class CompleteUserInfo extends Component {
    constructor(props) {
        super(props);
        // allows us to use this method into our HTML code
        this.onChangeAddress1 = this.onChangeAddress1.bind(this);
        this.onChangeAddress2 = this.onChangeAddress2.bind(this);
        this.onChangePostcode = this.onChangePostcode.bind(this);
        this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeNoKinFullName = this.onChangeNoKinFullName.bind(this);
        this.onChangeNoKinMobileNumber = this.onChangeNoKinMobileNumber.bind(this);
        this.onChangeNoKinRelationship = this.onChangeNoKinRelationship.bind(this);
        this.onChangeMedicalConditions = this.onChangeMedicalConditions.bind(this);
        this.onCompleteUserInfoCancel = this.onCompleteUserInfoCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
           
        
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
                activationCode: response.activationCode
            })
        })
        axios.get("/api/Roles/GetRoles").
        then(response => {
            console.log(response.data);
            this.setState({ roles: response.data });
        })
        .catch(error => console.log(error.response));
    }
    onChangeAddress1(e) {
        this.setState({
            address1: e.target.value
        });
    }
    onChangeAddress2(e) {
        this.setState({
            address2: e.target.value
        });
    }
    onChangePostcode(e) {
        this.setState({
            postcode: e.target.value,
            correctPostcode: isCorrectPostcodeRegx.test(e.target.value) ? true: false
        });
    }
    onChangeMobileNumber(e) {
        this.setState({
            mobileNumber: e.target.value, 
            correctNumber: isCorrectMobileNumberRegx.test(e.target.value)? true: false
            
        });
    }
    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    onChangeNoKinFullName(e) {
        this.setState({
            noKinFullName: e.target.value
        });
    }
    onChangeNoKinMobileNumber(e) {
        this.setState({
            noKinMobileNumber: e.target.value, 
            correctNumber1: isCorrectMobileNumberRegx.test(e.target.value)? true: false
        });
    }
    onChangeNoKinRelationship(e) {
        this.setState({
            noKinRelationship: e.target.value
        });
    }
    onChangeMedicalConditions(e) {
        this.setState({
            medicalConditions: e.target.value
        });
    }
    onCompleteUserInfoCancel(e) {
        const { history } = this.props;
        history.push('/volunteers');
    }
    validate = () => {
        let address1Error = '';
        let address2Error = '';
        let postcodeError = '';
        let mobileNumberError = '';
        let roleError = '';
        let noKinFullNameError = '';
        let noKinMobileNumberError = '';
        let noKinRelationshipError = '';
        let medicalConditionsError = '';
        let offenceError = '';

        if (!this.state.address1) {
            address1Error = 'Address 1 can not be blank!';
        }
        if (!this.state.address2) {
            address2Error = 'Address 2 can not be blank!';
        }
        if (!this.state.correctPostcode) {
            postcodeError = 'Incorrect postcode provided!';
        }
       
        if (!this.state.correctNumber) {
            mobileNumberError = 'Invalid mobile number provided!';
        }
        if (!this.state.role) {
            roleError = 'Please select desired role!';
        }
        if (!this.state.noKinFullName) {
            noKinFullNameError = 'Next of kin name can not be blank!';
        }
        
        if (!this.state.correctNumber1) {
            noKinMobileNumberError = 'Next of kin mobile number can not be blank!';
        }
        if (!this.state.noKinRelationship) {
            noKinRelationshipError = 'Next of kin relationship can not be blank!';
        }
        if (!this.state.medicalConditions) {
            medicalConditionsError = 'Please specify medical conditions!';
        }
       
        if (address1Error || address2Error || postcodeError || mobileNumberError  || noKinFullNameError || noKinMobileNumberError || noKinRelationshipError || medicalConditionsError) {
            this.setState({ address1Error, address2Error,postcodeError, mobileNumberError, noKinFullNameError, noKinMobileNumberError, noKinRelationshipError,medicalConditionsError});
            return false;
        }
        return true;
    };
    onSubmit(e) {
        const isValid = this.validate();
        if(isValid)
        {
                e.preventDefault();
                const { id } = this.props.match.params;
                let userObject1 = {

                    firstName: this.state.firstName,
                    email: this.state.email,
                    address1: this.state.address1,
                    address2: this.state.address2,
                    postcode: this.state.postcode,
                    mobileNumber: this.state.mobileNumber,
                    role: this.state.role,
                    nextofKinFullName: this.state.noKinFullName,
                    nextofKinMobileNumber: this.state.noKinMobileNumber,
                    nextofKinRelationship: this.state.noKinRelationship,
                    medicalConditions: this.state.medicalConditions,
                    status: this.state.status,
                    activationCode: this.state.activationCode
                   
                }
                console.log(userObject1);
                axios.put("api/Users/CompleteUserInfo/" + id, userObject1).then(result => {
                    this.setState({userCompletion:true, errorMessage: 'Volunteer Information Completed Succesfully!'})
                });
        }
        else
        {
            this.setState({userCompletion:false, errorMessage: 'Incomplete Form!'})
        }
        
    }
    render() {
       
        return (
            <Container className="es-form-container">
                <div className="es-form-background">
                    <h3 className="form-title">Complete Volunteer Information</h3>
                    <h5 className="form-title">Volunteer Name: {this.state.firstName} {this.state.lastName}</h5>
                    <h5 className="form-title1">{this.state.errorMessage} </h5>
                    {this.state.userCompletion ? 
                        <div>
                         <span className="CompleteUserInfo">
                        <PSButton  to='/volunteers'  className="smallbutton-red" buttonText="Go Back" />
                    </span>
                         </div> : 
                         <div>
                    <br/>
                    <span className="ess-form-left">
                        <TextBox
                            type="text" required title="Address 1" value={this.state.address1}
                            onChange={this.onChangeAddress1} placeholder="First Line of Address" />
                            <span className="form-title1">{this.state.address1Error}</span>
                        <TextBox
                            type="text" required title="Address 2" value={this.state.address2}
                            onChange={this.onChangeAddress2} placeholder="Second Line of Address" />
                             <span className="form-title1">{this.state.address2Error}</span>
                        <TextBox
                            type="text" required title="Postcode" value={this.state.postcode}
                            onChange={this.onChangePostcode} placeholder="Postcode" />
                             <span className="form-title1">{this.state.postcodeError}</span>
                        <TextBox
                            type="text" required title="Mobile Number" value={this.state.mobileNumber}
                            onChange={this.onChangeMobileNumber} placeholder="Mobile Number" />
                             <span className="form-title1">{this.state.mobileNumberError}</span>
                        <DropDownBox title="Assign Role" placeholder="Please Select Role" options={this.state.roles} value={this.state.role}
                            idKey="roleName" nameKey="roleName" onChange={this.onChangeRole} id="DesiredRole" />
                            <span className="form-title1">{this.state.roleError}</span>
                    </span>
                    <span className="ess-form-right">
                        <TextBox
                            type="text" required title="Next of kin fullname" value={this.state.noKinFullName}
                            onChange={this.onChangeNoKinFullName} placeholder="Enter next of kin fullname" />
                             <span className="form-title1">{this.state.noKinFullNameError}</span>
                        <TextBox
                            type="text" required title="Next of kin number" value={this.state.noKinMobileNumber}
                            onChange={this.onChangeNoKinMobileNumber} placeholder="Enter next of kin mobile number" />
                             <span className="form-title1">{this.state.noKinMobileNumberError}</span>
                             <TextBox
                            type="text" required title="Next of kin relationship" value={this.state.noKinRelationship}
                            onChange={this.onChangeNoKinRelationship} placeholder="Enter next of kin relationship" />
                             <span className="form-title1">{this.state.noKinRelationshipError}</span>
                        <TextArea
                                    title="Medical Contraints"
                                    placeholder="Enter Medical Contraints"
                                    rows="3"
                                    cols="25"
                                    value={this.state.medicalConditions}
                                    onChange={this.onChangeMedicalConditions}
                                />
                        <span className="form-title1">{this.state.medicalConditionsError}</span>
                    
                    </span>
                    <span className="CompleteUserInfo">
                        <PSButton onClick={this.onCompleteUserInfoCancel} to="/volunteers" className="smallbutton" buttonText="Cancel" />
                        <PSButton onClick={this.onSubmit}  to='#'  className="smallbutton-red" buttonText="Submit" />
                    </span>
                    </div> }
                </div>
              
            </Container>
        );
    }
}
export default CompleteUserInfo;