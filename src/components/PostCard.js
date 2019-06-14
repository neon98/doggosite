import React from 'react';
import '../stylesheets/PostCard.css'
import treat from '../assets/treat.png'
import pat from '../assets/pat.png'
import boop from '../assets/dog.png'

export default class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: '',
            // hover: false
        }
        // this.toggleHoverState = this.toggleHoverState.bind(this);
    }
    // toggleHoverState(){
    //     this.setState({
    //         hover: !this.state.hover
    //     });
    // }
    render() {
        return (
            <div className="post_container" >
                <img src={this.props.post.imageURL} alt="" />
                <p>{this.props.post.caption}</p>
                <div className="pat_treat_boop">
                    <div className="">
                        <img className="icon" src={pat} alt="" />
                        <p className="text">{this.props.post.pats}</p>
                    </div>
                    <div className="">
                        <img className="icon" src={treat} alt="" />
                        <p className="text">{this.props.post.treats}</p>
                    </div>
                    <div className="">
                        <img className="icon" src={boop} alt="" />
                        <p className="text">{this.props.post.boops}</p>
                    </div>
                </div>
            </div>
        );
    }
}