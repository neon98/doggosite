import React from 'react';

import paw from '../assets/paw.png'
import home from '../assets/home.png'
import dog from '../assets/dog.png'
// import puppy from '../assets/puppy.png'
import tweet from '../assets/tweet.png'
import puppy from '../assets/puppy2.png'

import '../stylesheets/Navbar.css';


export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.click = this.click.bind(this);
    }

    handleLogIn(event) {
        this.props.openLoginModal();
    }
    handleLogOut(event) {
        this.props.resetUser();
    }
    handleProfile(event) {

    }
    click(str) {
        console.log(str);
    }
    handleSignUp(event) {
        this.props.openSignUpModal();
    }
    isEmptyUserObject(user) {
        return (Object.keys(user).length === 0 && user.constructor === Object);
    }
    render() {

        return (
            <div className={this.props.mobileUI ? "navbar_wrapper reduced_navbar_wrapper" : "navbar_wrapper"}>
                <ul className="navbar">
                    <li className="navbar_brand_icon_wrapper">
                        <img src={paw} alt="paw" className="navbar_brand_icon" />
                    </li>
                    <li>
                        <div className="navbar_item" onClick={() => { this.props.setPage("Home") }}>
                            <img src={home} alt="home" className="navbar_item_icon" />
                            {
                                this.props.mobileUI ? null :
                                    <p className="navbar_item_text">Home</p>
                            }
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item" onClick={() => { this.props.setPage("Our Community") }}>
                            <img src={dog} alt="breeds" className="navbar_item_icon" />
                            {
                                this.props.mobileUI ? null :
                                    <p className="navbar_item_text">Our Community</p>
                            }
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item" onClick={() => { this.props.setPage("Lil Ones") }}>
                            <img src={puppy} alt="puppies" className="navbar_item_icon" />
                            {
                                this.props.mobileUI ? null :
                                    <p className="navbar_item_text">Lil' Ones</p>
                            }
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item" onClick={() => { this.props.setPage("Tweets") }}>
                            <img src={tweet} alt="tweets" className="navbar_item_icon" />
                            {
                                this.props.mobileUI ? null :
                                    <p className="navbar_item_text">Tweets</p>
                            }
                        </div>
                    </li>
                    {
                        !this.isEmptyUserObject(this.props.user) ?
                            <div className="navbar_buttons">
                                <li>
                                    <div className="navbar_item">
                                        <button className="navbar_item_button" style={{ width: 'auto' }}> {this.props.user.username[0]} </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="navbar_item">
                                        <button className="navbar_item_button" onClick={this.handleLogOut}> Log out </button>
                                    </div>
                                </li>
                            </div>
                            :
                            <div className="navbar_buttons">
                                <li>
                                    <div className="navbar_item">
                                        <button className="navbar_item_button" onClick={this.handleLogIn}> Login </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="navbar_item">
                                        <button className="navbar_item_button" onClick={this.handleSignUp}> Sign Up </button>
                                    </div>
                                </li>
                            </div>
                    }
                </ul>
            </div>
        );
    }
}