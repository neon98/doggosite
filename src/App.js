import React from 'react';
import Media from 'react-media';
import * as firebase from 'firebase';

import config from './config';

import Navbar from './components/Navbar';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';

import './App.css';


firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      openLoginModal: false,
      openSignUpModal: false,
      mobileUI: false
    }
    this.setUser = this.setUser.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }
  resetUser() {
    this.setState({
      user: {}
    })
  }
  openLoginModal() {
    this.setState({
      openLoginModal: true
    })
  }
  closeLoginModal() {
    this.setState({
      openLoginModal: false
    })
  }
  openSignUpModal() {
    this.setState({
      openSignUpModal: true
    })
  }
  closeSignUpModal() {
    this.setState({
      openSignUpModal: false
    })
  }
  render() {
    return (
      <div>
        <Media
          query="(max-width: 650px)"
          onChange={
            matches =>
              matches
                ? this.setState({ mobileUI: true })
                : this.setState({ mobileUI: false })
          }
        />
        <Navbar
          user={this.state.user}
          openLoginModal={this.openLoginModal}
          openSignUpModal={this.openSignUpModal}
          resetUser={this.resetUser}
          mobileUI={this.state.mobileUI}
        />
        <LogInForm
          firebase={firebase}
          setUser={this.setUser}
          open={this.state.openLoginModal}
          close={this.closeLoginModal} 
          mobileUI={this.state.mobileUI}
          />
        <SignUpForm
          firebase={firebase}
          setUser={this.setUser}
          open={this.state.openSignUpModal}
          close={this.closeSignUpModal}
          mobileUI={this.state.mobileUI}
        />
      </div>);
  };
}

export default App;
