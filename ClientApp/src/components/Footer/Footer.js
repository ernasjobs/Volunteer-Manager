import React,{ Component }  from "react";
import "./Footer.css";
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '100%',
 
};
const desktopMap = {
  position: "relative", width: "29.5vw", height: "45vh", left: "-104%" 
}
const mobileMap = {
   position: "relative", width: "82vw", height: "40vh", right: "5.5%"  
}
export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render () {
    const initialCenter = {lat:52.56557510 ,lng:-0.31596920 }
    const className1 = isMobile ? mobileMap : desktopMap;
    return (
    <div className="main-footer">
      <div className="container">
        <div className="row ">
          {/* Column1 */}
          <div className="col-sm-12  col-md-5">
            <h4>Peterborough Sailability</h4>
            <ul className="list-unstyled">
            <li> <a className="links" href=" tel:+447948262919"> <i className="fa fa-phone fa-2x"> </i>  077948262919</a> </li>
            <br/>
            <li><a className="links" href = " mailto: p.sail@hotmail.co.uk"> <i className="fa fa-envelope fa-2x "> </i>  p.sail@hotmail.co.uk</a> </li>
            <br/>
            <li> <i className="fa fa-map-marker fa-2x "></i>  Address: Lakeside at Nene Park, PE2 5RU </li>
            <br/>
            <li><a className="links" target="_blank" href = "https://www.facebook.com/groups/1480146312219876/about/"> <i className="fa fa-facebook fa-2x"> </i>  Visit our Facebook Page</a> </li>

            </ul>
          </div>
          {/* Column2 */}
          <div className="col-sm-12 col-md-5">
            <h4>Links</h4>
            <ul className="list-unstyled">
              <li> <Link className="links" to='/'>Homepage</Link></li>
              <li> <Link className="links" to='/register'>Register</Link></li>
              <li> <Link className="links" to='/login'>Login</Link></li>
              <li> <Link className="links" to='/verifyuser'>Reset Password</Link></li>
              <li> <Link className="links" to='/display-events'>Join Event</Link></li>
              {localStorage.getItem("id") && localStorage.getItem("role") === 'Admin' && <div>
                <li> <Link className="links" to='/create-event'>Create Event</Link></li>
              <li> <Link className="links" to='/events'>Manage Events</Link></li>
              <li> <Link className="links" to='/volunteers'>Volunteers</Link></li>
              </div>
                }
            </ul>
          </div>
          {/* Column3 */}
          <div className="col-sm-12  col-md-2" >
            <h5>Where are we?</h5>
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
          </div>
        </div>
        <hr className="hr1" />
        <div className="row">
            <div className="col">
            <p className="text-center">
            &copy;{new Date().getFullYear()} Peterborough Sailability
          </p>
            </div>
        </div>
      </div>
    </div> )
  };
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB4YZrp7SHZzKWqo4qAiFxLlX5SKXBaS28'
})(Footer);
