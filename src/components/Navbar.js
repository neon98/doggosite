import React from 'react';
import Media from 'react-media';
import paw from '../assets/paw.png'
import home from '../assets/home.png'
import dog from '../assets/dog.png'
import puppy from '../assets/puppy.png'
import tweet from '../assets/tweet.png'

import './Navbar.css';

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            hideNavIconText: false
        }
    }
    render(){
        return(
            <div className={this.state.hideNavIconText ? "navbar_wrapper" : "navbar_wrapper reduced_navbar_wrapper"}>
                <Media
                    query="(max-width: 650px)"
                    onChange={
                        matches =>
                            matches
                            ? this.setState({hideNavIconText:false})
                            : this.setState({hideNavIconText:true})
                    }
                />
                <ul className="navbar">
                    <li className="navbar_brand_icon_wrapper">
                        <img src={paw} alt="paw" className="navbar_brand_icon"/>
                    </li>
                    <li>
                        <div className="navbar_item">
                            <img src={home} alt="home" className="navbar_item_icon"/>
                            { 
                                this.state.hideNavIconText ? 
                                <p className="navbar_item_text">Home</p> : null 
                            }
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item">
                            <img src={dog} alt="breeds" className="navbar_item_icon"/>
                            {
                                this.state.hideNavIconText ? 
                                <p className="navbar_item_text">Our Community</p> : null
                            }
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item">
                            <img src={puppy} alt="puppies" className="navbar_item_icon"/>
                            {
                                this.state.hideNavIconText ? 
                                <p className="navbar_item_text">Lil' Ones</p> : null
                            }
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item">
                            <img src={tweet} alt="tweets" className="navbar_item_icon"/>
                            {
                                this.state.hideNavIconText ? 
                                <p className="navbar_item_text">Tweets</p> : null
                            }
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item">
                            <button className="navbar_item_button"> Login </button>
                        </div>
                    </li>
                    <li>
                        <div className="navbar_item">
                            <button className="navbar_item_button"> Sign Up </button>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}