import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllVolunteerEvents } from '../../../actions/volunteerEventActions';
import PSButton from '../../Button/PSButton';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './VolunteerEvents.css';
export class VolunteerEvents extends Component {
    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.onClickUpcomingEvents = this.onClickUpcomingEvents.bind(this);
        this.onClickPastEvents = this.onClickPastEvents.bind(this);
        this.state = {
            volunteerevents: [],
            orgvolunteerevents: [],
            loading: true,
            failed: false,
            error: '',
            username: '',
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: 0,
            pastEvent: false
           
        }
    }
    onClickUpcomingEvents (e)
    {
        
        this.props.getAllVolunteerEvents("upcoming",localStorage.getItem("id"));
        this.setState({pastEvent: false})
    }
    onClickPastEvents (e)
    {
     
        this.props.getAllVolunteerEvents("past",localStorage.getItem("id"));
        this.setState({pastEvent: true})

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
		const data = this.state.orgvolunteerevents;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			volunteerevents:slice
		})
	
    }
    componentDidMount() {
        this.props.getAllVolunteerEvents(this.state.eventFilter,localStorage.getItem("id"));
        this.setState({ username: localStorage.getItem("userFirstName")});
    }
    componentDidUpdate(prevProps) {
        if (prevProps.volunteerevents.data !== this.props.volunteerevents.data) {
            var data = this.props.volunteerevents.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgvolunteerevents: this.props.volunteerevents.data,
                volunteerevents : slice,
               
            })
        }
    }
    renderAllVolunteerEventsTable(volunteerevents) {
        return (
            <div className="container">
                <table className="rwd-table-1">
                    <tbody>
                        <tr>

                            <th>Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                        {
                            volunteerevents.map(event => (
                                <tr key={event.id}>
                                    <td data-th="Title"><Link to={'/view-event/' + event.id}>{event.eventName}</Link></td>
                                    <td data-th="Date" >{new Date(event.eventStartDateTime).toLocaleDateString()}</td>
                                    <td data-th="Time">{new Date(event.eventStartDateTime).toLocaleTimeString([], { timeStyle: 'short' })} - {new Date(event.eventEndDateTime).toLocaleTimeString([], { timeStyle: 'short' })} </td>
                                    <td data-th="Status">{event.eventCategory}</td>
                                    <td data-th="Action">
                                        <div className="form-group">
                                        { this.props.loggedInStatus === null && !this.state.pastEvent ? <PSButton  disabled  className="smallbutton-disabled" buttonText="Locked" />  :
                                          event.volunteerEventAttended === null && this.state.pastEvent ?  <PSButton  disabled  className="smallbutton-disabled" buttonText="Locked" /> :
                                          event.volunteerEventAttended === null ? <PSButton to={'/join-event/' + event.id} className="smallbutton-red" buttonText="Join" /> 
                                                        : this.state.pastEvent ? <PSButton disabled className="smallbutton-disabled" buttonText="Joined" /> : <div className="form-group"><PSButton  disabled  className="smallbutton-disabled" buttonText="Joined" />  <PSButton to={'/leave-event/' + event.id}    className="smallbutton1" buttonText="Cancel" /> </div>}    
                                        </div>
                                    </td>
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
        let content = this.props.volunteerevents.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
                this.state.volunteerevents.length && this.renderAllVolunteerEventsTable(this.state.volunteerevents)
            );
        return (
            <div className="events-div">
                <h3>List of Events</h3>
                <br/>
                <div className="btn-group" role="group">
                <PSButton onClick= {this.onClickUpcomingEvents} to="/display-events"  className="btn btn-outline-primary" buttonText="Upcoming" /> 
                <PSButton onClick= {this.onClickPastEvents} to="/display-events"  className="btn btn-outline-danger" buttonText="Past" /> 
                </div>
                <br/>
                <br/>
                { this.props.loggedInStatus ? (<p>Welcome: {this.props.loggedInStatus} </p>) : 
                <div className="loginButton">  
                    <p>You won't be able to join an event if you are not logged in!</p>
                    <PSButton to="/login" className="smallbutton" buttonText="Login" /> 
                </div>}
                {content}
            </div>
        );
    }
}

const mapStateToProps = ({ volunteerevents }) => ({
    volunteerevents
});

export default connect(mapStateToProps, { getAllVolunteerEvents })(VolunteerEvents);
