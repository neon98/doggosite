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
      userID: '',
      currentPage: 'Home',
      openLoginModal: false,
      openSignUpModal: false,
      mobileUI: false
    }

    this.setUserID = this.setUserID.bind(this);
    this.resetUserID = this.resetUserID.bind(this);
    this.setPage = this.setPage.bind(this);

    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
  }
  setUserID(userID) {
    this.setState({
      usermode: 'registered',
      userID: userID
    });
  }
  resetUserID() {
    this.setState({
      usermode: 'visitor',
      userID: ''
    });
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
    var userID = localStorage.getItem('doggositeuser');
    if (userID) {
      this.setUserID(userID)
    }
  }
  render() {
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
            profileOwnerID={this.state.userID}
            currentUserID={this.state.userID}
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
            userID={this.state.userID}
            openLoginModal={this.openLoginModal}
            openSignUpModal={this.openSignUpModal}
            resetUserID={this.resetUserID}
            mobileUI={this.state.mobileUI}
            setPage={this.setPage}
          />
          <LogInForm
            firebase={firebase}
            setUserID={this.setUserID}
            open={this.state.openLoginModal}
            close={this.closeLoginModal}
            mobileUI={this.state.mobileUI}
          />
          <SignUpForm
            firebase={firebase}
            setUserID={this.setUserID}
            open={this.state.openSignUpModal}
            close={this.closeSignUpModal}
            mobileUI={this.state.mobileUI}
          />
        </div>
        <div className="content">
          {
            currentPage
          }
        </div>
      </div>);
  };
}

export default App;
