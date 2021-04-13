import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand,DropdownMenu,DropdownItem, DropdownToggle, UncontrolledDropdown, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Logo from './Logo/Logo';
export class NavMenu extends Component {
  static displayName = NavMenu.name;
  constructor (props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
    this.handleLogout = this.handleLogout.bind(this);
   
  }
  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  handleLogout(e)
  {
    localStorage.clear(); 
  }
  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 test2" light>
          <Container>
          <NavbarBrand className="logoText" tag={Link} to="/">Peterborough Sailability</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem className="color-navitem">
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                {this.props.loggedInStatus && localStorage.getItem("role") === 'Admin' && <div>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-dark">
               Events
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavLink tag={Link} className="text-dark1" to="/create-event">Create Event</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <NavLink tag={Link} className="text-dark1" to="/events"> Manage Events</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <NavLink tag={Link} className="text-dark1" to="/display-events">Join Event</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </div> }
            {!this.props.loggedInStatus &&
             <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/display-events">Join Event</NavLink>
              </NavItem>}
            {this.props.loggedInStatus &&  <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/volunteers">Volunteers</NavLink>
                </NavItem>}
                {
                  this.props.loggedInStatus ? (
                    <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/logout">Logout</NavLink>
                </NavItem> 
                  ) : (
                    <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem> 
                  )
                }
                
              </ul>
            </Collapse>
          </Container>
        </Navbar>
        <div className="test">
         <Link  to="/"><Logo/></Link>
        </div>
      </header>
    );
  }
}
