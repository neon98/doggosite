import React from 'react';

import paw from '../assets/paw.png'
import home from '../assets/home.png'
import tweet from '../assets/tweet.png'
import puppy from '../assets/puppy.png'
import breeds from '../assets/community.png';

import '../stylesheets/Navbar.css';


export default class Navbar extends React.Component {
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
                            <img src={breeds} alt="breeds" className="navbar_item_icon" style={{height:'25px', width:'30px'}}/>
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
                        this.props.userID ?
                            <div className="navbar_buttons">
                                <li>
                                    <div className="navbar_item">
                                        <button 
                                            className="navbar_item_button" 
                                            style={{ width: 'auto' }}
                                            onClick={() => { this.props.setPage("Profile") }}
                                        > {this.props.userID[0]} </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="navbar_item">
                                        <button className="navbar_item_button" onClick={() => { this.props.resetUser() }}> Log out </button>
                                    </div>
                                </li>
                            </div>
                            :
                            <div className="navbar_buttons">
                                <li>
                                    <div className="navbar_item">
                                        <button className="navbar_item_button" onClick={() => {this.props.openLoginModal()}}> Login </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="navbar_item">
                                        <button className="navbar_item_button" onClick={() => {this.props.openSignUpModal()}}> Sign Up </button>
                                    </div>
                                </li>
                            </div>
                    }
                </ul>
            </div>
        );
    }
}