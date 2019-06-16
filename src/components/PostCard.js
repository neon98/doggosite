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
            post:{}
        }
    }
    componentDidMount(){
        if(this.props.post === null){
            var dbRef = this.props.firebase.firestore().collection('posts')
            dbRef.doc(this.props.postid).get().then(doc => {
                this.setState({
                    post: doc.data()
                })
            })
        } else {
            this.setState({
                post: this.props.post
            })
        }
    }
    render() {
        return (
            <div className="post_container" >
                <img src={this.state.post.postImageUrl} alt="" />
                <p>{this.state.post.caption}</p>
                <div className="pat_treat_boop">
                    <div className="">
                        <img className="icon" src={pat} alt="" />
                        <p className="text">{this.state.post.pats}</p>
                    </div>
                    <div className="">
                        <img className="icon" src={treat} alt="" />
                        <p className="text">{this.state.post.treats}</p>
                    </div>
                    <div className="">
                        <img className="icon" src={boop} alt="" />
                        <p className="text">{this.state.post.boops}</p>
                    </div>
                </div>
            </div>
        );
    }
}