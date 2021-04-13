import React, { Component } from 'react';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { Container, Row, Col } from 'react-bootstrap';
import './ViewEvent.css';
import PSButton from '../../Button/PSButton';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
const mapStyles = {
    width: '100%',
    height: '100%',
   
};

const desktopMap = {
    position: "relative", width: "29.5vw", height: "45vh", left: "-4%" 
}
const mobileMap = {
     position: "relative", width: "82vw", height: "40vh", right: "5.5%"  
}
export class ViewEvent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            eventName: '',
            eventDescription: '',
            eventAddress2: '',
            eventPostcode: '',
            latitude: null,
            longitude: null,
            eventStartDateTime: '',
            eventEndDateTime: '',
            category: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Events/SingleEvent/" + id).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                eventName: response.eventName,
                eventDescription: response.eventDescription,
                eventAddress2: response.eventAddress2,
                eventPostcode: response.eventPostcode,
                eventStartDateTime: response.eventStartDateTime,
                eventEndDateTime: response.eventEndDateTime,
                category: response.eventCategory,
                latitude : response.latitude,
                longitude: response.longitude
            })
            this.forceUpdate();
           
        })
    }
    render() {
        const initialCenter = {lat: this.state.latitude,lng: this.state.longitude}
        console.log(initialCenter);
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        const className1 = isMobile ? mobileMap : desktopMap;
        return (
            
            <Container className={className} >
                <Row>
                    <Col>
                        <div className="ViewEventScreen">
                            <h2> Event Details</h2>
                        </div>
                        <div className="ViewEventScreen">

                            <h5>Event Title: <span>{this.state.eventName}</span></h5>
                        </div>
                        <div className="ViewEventScreen">
                            <h5>Description: <span>{this.state.eventDescription}</span></h5>
                        </div>
                        <div className="ViewEventScreen">
                            <h5>Date: <span>{new Date(this.state.eventStartDateTime).toLocaleDateString()}</span></h5>
                        </div>
                        <div className="ViewEventScreen">
                            <h5>Time: <span>{new Date(this.state.eventStartDateTime).toLocaleTimeString([], { timeStyle: 'short' })} - {new Date(this.state.eventEndDateTime).toLocaleTimeString([], { timeStyle: 'short' })}</span></h5>
                        </div>
                        <div className="ViewEventScreen">
                            <h5>Location: <span>{this.state.eventAddress2}, {this.state.eventPostcode}</span></h5>
                        </div>
                        <div className="ViewEventScreen">
                            <PSButton onClick={this.onCancel} to="/display-events" className="smallbutton" buttonText="Back" />
                        </div>
                        <br/>
                        <div style={className1}>
                            <Map 
                                key={new Date().getTime()}
                                google={this.props.google}
                                zoom={15}
                                style={mapStyles}
                                initialCenter= {initialCenter}

                            ><Marker
                                    onClick={this.onMarkerClick}
                                    name={'Peterborough Sailability'}
                                />
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                >
                                    <div>
                                        <h4>{this.state.selectedPlace.name}</h4>
                                    </div>
                                </InfoWindow>
                            </Map>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyB4YZrp7SHZzKWqo4qAiFxLlX5SKXBaS28'
})(ViewEvent);
