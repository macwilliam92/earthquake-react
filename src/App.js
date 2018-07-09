// src/App.js

import React, { Component } from 'react';
import Home from './pages/home';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if(!isAuthenticated()) this.login();

    return (
      <Home auth={this.props.auth} history={this.props.history}/>
    );
  }
}

export default App;