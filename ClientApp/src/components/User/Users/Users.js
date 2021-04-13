import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../actions/userActions';
import PSButton from '../../Button/PSButton';
import { Link } from 'react-router-dom';
import './Users.css';
import ReactPaginate from 'react-paginate';
export class Users extends Component {
    constructor(props) {
        super(props);
        this.onUserUpdate = this.onUserUpdate.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.onClickCompletedVolunteerInfo = this.onClickCompletedVolunteerInfo.bind(this);
        this.onClickInProgressVolunteerInfo = this.onClickInProgressVolunteerInfo.bind(this);
        this.onClickLockedVolunteer = this.onClickLockedVolunteer.bind(this);
        this.onClickActivatingVolunteerInfo = this.onClickActivatingVolunteerInfo.bind(this);
        this.state = {
            users: [],
            orgusers: [],
            loading: true,
            failed: false,
            error: '',
            username: '',
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: 0, 
            isInProgress: false       
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
		const data = this.state.orgusers;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			users:slice
		})
	
    }
    onClickCompletedVolunteerInfo (e)
    {
        
        this.props.getAllUsers("Active");
        this.setState({isInProgress: false})
    }
    onClickLockedVolunteer(e)
    {
        this.props.getAllUsers("Locked");
        this.setState({isInProgress: false})
    }
    onClickInProgressVolunteerInfo (e)
    {
     
        this.props.getAllUsers("New");
        this.setState({isInProgress: true})

    }
    onClickActivatingVolunteerInfo (e)
    {
     
        this.props.getAllUsers("Activating");
        this.setState({isInProgress: false})

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
                this.props.getAllUsers("New");
                this.setState({ username: localStorage.getItem("user") });
            }
            
        }
       

    }
    componentDidUpdate(prevProps) {
        if (prevProps.users.data !== this.props.users.data) {
            var data = this.props.users.data;
            var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                orgusers: this.props.users.data,
                users : slice,
               
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

    renderAllUsersTable(users) {
        return (
            <>
                <table className="rwd-table">
                    <tbody>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            users.map(user => (
                                <tr key={user.id}>

                                    <td data-th="Full Name"><Link  to={'/updateuser/' + user.id} >{user.firstName} {user.lastName}</Link></td>
                                    <td data-th="Email">{user.email}</td>
                                    <td data-th="Role">{user.role}</td>
                                    <td data-th="Status">{user.status}</td>
                                    <td data-th="Action">
                                        <div className="form-group">
                                            <PSButton to={'/complete-user-info/' + user.id} className="smallbutton-red" buttonText="Complete" />
                                            <PSButton to={'/attach-certification/' + user.id} className="smallbutton" buttonText="Certification" />
                                            <PSButton to={'/lockuser/' + user.id} className="smallbutton-locked" buttonText="Lock" />
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
            </>
        )
    }

    render() {
        let content = this.props.users.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
                this.state.users.length && this.renderAllUsersTable(this.state.users)
            );
        return (
            <div className="users-div">
                <h3> Volunteers Management</h3>
                { this.props.loggedInStatus ? (<p>Welcome: {this.props.loggedInStatus} </p>) : null}
                <br/>
                <div className="btn-group" role="group">
                <PSButton onClick= {this.onClickInProgressVolunteerInfo} to="/volunteers"  className="btn btn-outline-primary" buttonText="New Users" />
                <PSButton onClick= {this.onClickActivatingVolunteerInfo} to="/volunteers"  className="btn btn-outline-danger" buttonText="Activating" />  
                <PSButton onClick= {this.onClickCompletedVolunteerInfo} to="/volunteers"  className="btn btn-outline-success" buttonText="Active" /> 
                <PSButton onClick= {this.onClickLockedVolunteer} to="/volunteers"  className="btn btn-outline-warning" buttonText="Locked" /> 
                </div>
                <br/>
                <br/>
                {content}
            </div>
        );
    }
}

const mapStateToProps = ({ users }) => ({
    users
});

export default connect(mapStateToProps, { getAllUsers })(Users);
