import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FacebookLogin from 'react-facebook-login';
import Contestants from './components/contestants';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoaded: false,
      userID: '',
      name: '',
      email: '',
      picture: '',
      apiData: ''
    }
  }

  onLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
  }

  responseFacebook = response => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.id,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
      apiData: ''
    });
  };

  render() {
    let LoggedInContent;

    if (this.state.isLoggedIn) {
      LoggedInContent = (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h3 className="App-intro">Pick your favorite!</h3>
          </header>
          <div className="userInfo">
            <p>Welcome: {this.state.name}</p>
            <button onClick={this.onLogout}>Log Out</button>
          </div>
          <Contestants />
        </div>
      );
    } else {
      LoggedInContent = (
        <div className="App">
          <header className="App-header">
            <h3 className="App-intro">Log-in to pick your favorite!</h3>
            <FacebookLogin
              appId="1974744725950695"
              autoLoad={true}
              fields={"name,email,picture"}
              callback={this.responseFacebook}
            />
          </header>
        </div>
      );
    }
    
    return (
      <div>{LoggedInContent}</div>
    )
  }
}
