import React from 'react';
import Media from 'react-media';
import * as firebase from 'firebase';
import config from './config';

import Navbar from './components/Navbar';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import ProfilePage from './components/ProfilePage';
import HomePage from './components/HomePage';
import OurCommunityPage from './components/OurCommunityPage';
import LilOnesPage from './components/LilOnesPage';
import TweetsPage from './components/TweetsPage';

import fontawesome from '@fortawesome/fontawesome'
import { faCheck, faExclamationCircle, faPencilAlt, faPlus } from '@fortawesome/fontawesome-free-solid'

import './App.css';

fontawesome.library.add(faCheck, faExclamationCircle, faPencilAlt, faPlus);
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      usermode: 'visitor',
      username: '',
      currentPage: 'Home',
      openLoginModal: false,
      openSignUpModal: false,
      mobileUI: false
    }

    this.setUser = this.setUser.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.setPage = this.setPage.bind(this);

    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
  }

  setUser(username) {
    this.setState({
      usermode: 'registered',
      username: username
    })
  }
  resetUser() {
    this.setState({
      username: ''
    })
  }
  setPage(page) {
    this.setState({
      currentPage: page
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
  componentDidMount() {
    var username = localStorage.getItem('doggositeuser');
    if (username) {
      this.setUser(username)
    }
  }
  render() {
    // console.log(this.state.username)
    var currentPage;
    switch (this.state.currentPage) {
      case "Home":
        currentPage = <HomePage />
        break;
      case "Our Community":
        currentPage = <OurCommunityPage />
        break;
      case "Lil Ones":
        currentPage = <LilOnesPage />
        break;
      case "Tweets":
        currentPage = <TweetsPage />
        break;
      case "Profile":
        currentPage =
          <ProfilePage
            firebase={firebase}
            isProfileOwner={true}
            profileOwner={this.state.username}
            currentUser={this.state.username}
          />
        break;
      default:
        currentPage = <HomePage />
        break;
    }
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
        <div className="header">
          <Navbar
            username={this.state.username}
            openLoginModal={this.openLoginModal}
            openSignUpModal={this.openSignUpModal}
            resetUser={this.resetUser}
            mobileUI={this.state.mobileUI}
            setPage={this.setPage}
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
        </div>
        <div className="content">
          {
            // <ProfilePage
            //   isProfileOwner={true}
            //   profileOwner={this.state.user}
            //   currentUser={this.state.user}
            // />
            currentPage
          }
        </div>
      </div>);
  };
}

export default App;
