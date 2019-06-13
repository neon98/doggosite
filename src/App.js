import React from 'react';
import Media from 'react-media';
import * as firebase from 'firebase';
import config from './config';

import Navbar from './components/Navbar';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
// import BreedCard from './components/BreedCard';
import OurCommunityPage from './components/OurCommunityPage';

import fontawesome from '@fortawesome/fontawesome'
import { faCheck, faExclamationCircle } from '@fortawesome/fontawesome-free-solid'

import './App.css';

fontawesome.library.add(faCheck, faExclamationCircle);
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      openLoginModal: false,
      openSignUpModal: false,
      mobileUI: false,
      currentPage: 'Home'
    }
    this.setUser = this.setUser.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.setPage = this.setPage.bind(this);
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
  render() {
    // var currentPage;
    // switch (this.state.currentPage) {
    //   case "Home":
    //     currentPage = <p>Hello from Home!</p>
    //     break;
    //   case "Our Community":
    //     currentPage = <p>Hello from Our Community!</p>
    //     break;
    //   case "Lil Ones":
    //     currentPage = <p>Hello from Lil Ones!</p>
    //     break;
    //   case "Tweets":
    //     currentPage = <p>Hello from Tweets!</p>
    //     break;
    //   default:
    //     currentPage = <p>Hello from Home!</p>
    //     break;
    // }
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
            user={this.state.user}
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
          <OurCommunityPage/>
        </div>
      </div>);
  };
}

export default App;
