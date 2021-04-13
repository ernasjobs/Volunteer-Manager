import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllEvents } from '../../../actions/eventActions';
import PSButton from '../../Button/PSButton';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Events.css';
export class Events extends Component {
    constructor(props) {
        super(props);
        this.onUserUpdate = this.onUserUpdate.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.onClickCancelledEvents = this.onClickCancelledEvents.bind(this);
        this.onClickCompletedEvents = this.onClickCompletedEvents.bind(this);
        this.onClickInProgressEvent = this.onClickInProgressEvent.bind(this);
        this.onClickReleasedEvents = this.onClickReleasedEvents.bind(this);
        this.state = {
            events: [],
            orgevents: [],
            loading: true,
            failed: false,
            error: '',
            username: '',
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: 0
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
		const data = this.state.orgevents;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			events:slice
		})
	
    }
    onClickReleasedEvents(e)
    {
        this.props.getAllEvents("Released");
    }
    onClickInProgressEvent (e)
    {
     
        this.props.getAllEvents("In Progress");

    }
    onClickCompletedEvents (e)
    {
     
        this.props.getAllEvents("Completed");

    }
    onClickCancelledEvents (e)
    {
     
        this.props.getAllEvents("Cancelled");
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
                this.props.getAllEvents("Released");
                this.setState({ username: localStorage.getItem("user") });
            }
           
        }
        
        

    }
    componentDidUpdate(prevProps) {
        if (prevProps.events.data !== this.props.events.data) {
            var data = this.props.events.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgevents: this.props.events.data,
                events : slice,
               
            })
        }
    }
    onUserUpdate(id) {
        const { history } = this.props;
        history.push('/updateuser/' + id);
    }
    onUserDelete(id) {
        const { history } = this.props;
        history.push('/deleteuser/' + id);
    }

    renderAllEventsTable(events) {
        return (
            <div className="container">
                <table className="rwd-table">
                    <tbody>
                        <tr>

                            <th>Title</th>
                            <th>Date</th>
                            <th>Time</th>
                           
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            events.map(event => (
                                <tr key={event.id}>
                                    <td data-th="Title"><Link to={'/view-event-details/' + event.id}>{event.eventName}</Link></td>
                                    <td data-th="Date" >{new Date(event.eventStartDateTime).toLocaleDateString()}</td>
                                    <td data-th="Time">{new Date(event.eventStartDateTime).toLocaleTimeString([], { timeStyle: 'short' })} - {new Date(event.eventEndDateTime).toLocaleTimeString([], { timeStyle: 'short' })} </td>
                                    <td data-th="Status">{event.eventStatus}</td>
                                    <td data-th="Action">
                                        <div className="form-group">
                                            <PSButton to={'/update-event/' + event.id} className="smallbutton" buttonText="Update" />
                                            <PSButton to={'/delete-event/' + event.id} className="smallbutton-red" buttonText="Delete" />
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
        let content = this.props.events.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
                this.state.events.length && this.renderAllEventsTable(this.state.events)
            );
        return (
            <div className="events-div">
                <h3>Events Management</h3>
                { this.props.loggedInStatus ? (<p>Welcome: {this.props.loggedInStatus} </p>) : null}
                <br/>
                <div className="btn-group" role="group">
                <PSButton onClick= {this.onClickReleasedEvents} to="/events"  className="btn btn-outline-primary" buttonText="Released" /> 
                <PSButton onClick= {this.onClickInProgressEvent} to="/events"  className="btn btn-outline-info" buttonText="In Progress" /> 
                <PSButton onClick= {this.onClickCompletedEvents} to="/events"  className="btn btn-outline-success" buttonText="Completed" /> 
                <PSButton onClick= {this.onClickCancelledEvents} to="/events"  className="btn btn-outline-danger" buttonText="Cancelled" /> 
                </div>
                <br/>
                <br/>
                {content}
            </div>
        );
    }
}

const mapStateToProps = ({ events }) => ({
    events
});

export default connect(mapStateToProps, { getAllEvents })(Events);
