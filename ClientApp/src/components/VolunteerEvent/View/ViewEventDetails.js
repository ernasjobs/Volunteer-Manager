import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllEventDetails } from '../../../actions/eventDetailsActions';
import './ViewEventDetails.css';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import PSButton from '../../Button/PSButton';
export class ViewEventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDetails: [],
            orgEventDetails: [],
            loading: true,
            failed: false,
            error: '',
            username: '',
            eventName: '',
            eventStartDateTime: '',
            eventEndDateTime: '',
            category: '',
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: 0  ,
            id: null

        }
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    }
    loadMoreData() {
		const data = this.state.orgEventDetails;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			eventDetails:slice
        })}
        
    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get("api/Events/SingleEvent/" + id).then(user => {
            const response = user.data;
            console.log(response);
            this.setState({
                id: response.id,
                eventName: response.eventName,
                eventStartDateTime: response.eventStartDateTime,
                eventEndDateTime: response.eventEndDateTime,
                category: response.eventCategory
            })
        });
        this.props.getAllEventDetails(id);
        this.setState({ username: localStorage.getItem("user") });

    }
    componentDidUpdate(prevProps) {
        if (prevProps.eventDetails.data !== this.props.eventDetails.data) {
            var data = this.props.eventDetails.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgEventDetails: this.props.eventDetails.data,
                eventDetails : slice,
        })
    }}

    renderAllVolunteersTable(eventDetails) {

        return (
            <div className="container">
                <table className="rwd-table">
                    <tbody>
                        <tr>

                            <th>Id </th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Role</th>
                            <th>Note</th>
                        </tr>
                        {
                            eventDetails.map(event => (
                                <tr key={[event.id, '-', event.volunteerId].join()}>
                                    <td data-th="Id">{event.volunteerId}</td>
                                    <td data-th="Full Name">{event.firstName} {event.lastName}</td>
                                    <td data-th="Email" >{event.email}</td>
                                    <td data-th="Phone Number" >{event.mobileNumber}</td>
                                    <td data-th="Role" >{event.role}</td>
                                    <td data-th="Note">{event.volunteerEventNote}</td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>

        )
    }

    render() {
        const className = isMobile ? "MobileContainerStyle" : "ContainerStyle";
        let content = this.props.eventDetails.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
                this.state.eventDetails.length && this.renderAllVolunteersTable(this.state.eventDetails)
            );
        return (
            <div>
            <Container  className={className}>
                 <div className="ViewEventDetails">
                 <h3>Event Details</h3>
                    {this.props.loggedInStatus ? (<p>Welcome: {this.props.loggedInStatus} </p>) : null}
                </div>
                <div className="ViewEventDetails">

                    <h5> Title: <span>{this.state.eventName}</span></h5>
                </div>
                <div className="ViewEventDetails">
                    <h5> DateTime : <span>{new Date(this.state.eventStartDateTime).toLocaleDateString()} --- {new Date(this.state.eventStartDateTime).toLocaleTimeString([], { timeStyle: 'short' })} 
                    - {new Date(this.state.eventEndDateTime).toLocaleTimeString([], { timeStyle: 'short' })}</span></h5>
                </div>
                <div className="ViewEventDetails">
                    <h5>Category: <span>{this.state.category}</span></h5>
                </div>
                <div className="ViewEventDetails">
                    <h5>SignUps: <span>{this.state.eventDetails.length}</span></h5>
                </div>
                <div className="ViewEventDetails">
                <PSButton  to={'/complete-event/' + this.state.id} className="smallbutton" buttonText="Complete" />
                <PSButton  to={'/cancel-event/' + this.state.id} className="smallbutton-red" buttonText="Cancel" />
                </div>
            </Container>
             <div className="events-div">
             {content}
             </div>
             <div className="events-div">
             <PSButton onClick={this.onCancel} to="/events" className="smallbutton" buttonText="Back" />
             </div>
             </div>
        );
    }
}

const mapStateToProps = ({ eventDetails }) => ({
    eventDetails
});

export default connect(mapStateToProps, { getAllEventDetails })(ViewEventDetails);
