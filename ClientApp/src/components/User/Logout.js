import React, { Component } from 'react';
import { Redirect } from 'react-router';

export default class LogOut extends Component {
    state = {
        redirect: false,
    };

    componentDidMount() {
        localStorage.clear();
        this.props.updateLoggedOutStatus(localStorage.getItem("user"));
        this.props.updateLoggedOutId(localStorage.getItem("id"));
        this.setState({ redirect: true });
    }

    render() {
        return this.state.redirect ?
            <Redirect to={'/login'} /> :
            null;
    }
}