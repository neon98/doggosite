import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PostCard from './PostCard';
import ProfileUpdateForm from './ProfileUpdateForm';
import AddPostForm from './AddPostForm';

import '../stylesheets/ProfilePage.css';

import treat from '../assets/treat.png'
import pat from '../assets/pat.png'
import boop from '../assets/dog.png'

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usertype: '',
            profileOwner: {},
            currentUser: {},
            posts: [],
            isProfileOwner: false,
            openProfileUpdateForm: false,
            openAddNewPostForm: false,
        }
        this.openProfileUpdateForm = this.openProfileUpdateForm.bind(this);
        this.closeProfileUpdateForm = this.closeProfileUpdateForm.bind(this);
        this.openAddNewPostForm = this.openAddNewPostForm.bind(this);
        this.closeAddNewPostForm = this.closeAddNewPostForm.bind(this);
        this.stylefuntion = this.stylefuntion.bind(this);
    }

    openProfileUpdateForm() {
        this.setState({
            openProfileUpdateForm: true
        })
    }
    closeProfileUpdateForm() {
        this.setState({
            openProfileUpdateForm: false
        })
    }
    openAddNewPostForm() {
        this.setState({
            openAddNewPostForm: true
        })
    }
    closeAddNewPostForm() {
        this.setState({
            openAddNewPostForm: false
        })
    }
    componentDidMount() {
        var dbRef = this.props.firebase.firestore();
        dbRef.collection("users").doc(this.props.profileOwnerID).onSnapshot(doc => {
            var data = doc.data()
            data['userid'] = doc.id;
            this.setState({
                profileOwner: data
            })
        });
    }

    stylefuntion(){
        if(this.props.profileOwner){
            if(this.props.profileOwner.post.length === 0){
                return true;
            }
            return false;
        }
        return true;
    }
    isEmpty(obj) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (obj == null) return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }
    render() {
        var total_treets = 0, total_boops = 0, total_pats = 0;
        if (!this.isEmpty(this.state.profileOwner)) {
            console.log(this.state.profileOwner);
            var postids = this.state.profileOwner.posts;
            var posts = postids.map(postid => <PostCard postid={postid} post={null}
                firebase={this.props.firebase} />);
        }
        return (
            <div className="profile_page_container">
                {
                    this.state.openProfileUpdateForm ?
                        <ProfileUpdateForm
                            open={this.state.openProfileUpdateForm}
                            close={this.closeProfileUpdateForm}
                            userid={this.state.profileOwner.userid}
                            username={this.state.profileOwner.username}
                            breedname={this.state.profileOwner.breedname}
                            bio={this.state.profileOwner.bio}
                            firebase={this.props.firebase}
                        />
                        : null
                }
                {
                    this.state.openAddNewPostForm ?
                        <AddPostForm
                            open={this.state.openAddNewPostForm}
                            close={this.closeAddNewPostForm}
                            userid={this.state.profileOwner.userid}
                            username={this.state.profileOwner.username}
                            firebase={this.props.firebase}
                        /> :
                        null
                }
                <div className="header">
                    <div className="profile_picture_wrapper">
                        <img className="profile_picture" src={this.state.profileOwner.profilePictureUrl} alt="" />
                    </div>
                    <div className="profile_info_wrapper">
                        <div className="profile_info_header">
                            <h1>{this.state.profileOwner.username}</h1>
                            <p className="breed_label">{this.state.profileOwner.breedname}</p>
                            <p className="edit_icon" onClick={this.openProfileUpdateForm}><FontAwesomeIcon icon="pencil-alt" /></p>

                        </div>
                        <p className="profile_info_bio" >{this.state.profileOwner.bio}</p>
                        <div className="pat_treat_boop">
                            <div className="">
                                <img className="icon" src={pat} alt="" />
                                <p className="text">{total_pats}</p>
                            </div>
                            <div className="">
                                <img className="icon" src={treat} alt="" />
                                <p className="text">{total_treets}</p>
                            </div>
                            <div className="">
                                <img className="icon" src={boop} alt="" />
                                <p className="text">{total_boops}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_posts">
                    <div className="add_new_post_card" 
                        style={this.stylefunction ? {height:'246px'} : null}
                        onClick={this.openAddNewPostForm}>
                        <div>
                            <FontAwesomeIcon icon="plus" />
                        </div>
                    </div>
                    {
                        posts
                    }
                </div>
            </div >
        );
    }
}

