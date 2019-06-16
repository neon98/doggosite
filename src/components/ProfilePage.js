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
            usertype: 'unregistered visitor', // three types of users : registered visitor, unregistered visitor, owner
            profileOwner: {},
            currentUser: {},
            posts: [],
            isProfileOwner: false,
            openProfileUpdateForm: false,
            openAddNewPostForm: false,
        }
        this.postCardStyles = {
            post_container: {
                borderRadius: '2px',
                marginBottom: '20px',
                marginRight: '20px',
                boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.2)',
                wordWrap: 'break-word',
                width: '230px',
                background: 'white'
            },
            post_image: {
                width: '100%',
                height: '160px',
                borderRadius: '2px 2px 0px 0px'
            },
            post_caption: {
                padding: '10px',
                margin: '0',
                fontSize: '12px',
                wordBreak: 'break-all'
                // textAlign: 'center'
            },
            pat_treat_boop: {
                display: 'flex',
                justifyContent: 'space-between',
                margin: '0',
                padding: '10px 10px 10px 0px',
                background: 'rgb(238, 237, 237)'
            },
            pat_treat_boop_div: {
                display: 'flex',
                flexWrap: 'wrap',
                margin: '0px 10px'
            },
            pat_treat_boop_icon: {
                height: '20px',
                width: '20px'
            },
            pat_treat_boop_text: {
                fontSize: '15px',
                margin: '0 5px'
            }
        }
        this.openProfileUpdateForm = this.openProfileUpdateForm.bind(this);
        this.closeProfileUpdateForm = this.closeProfileUpdateForm.bind(this);
        this.openAddNewPostForm = this.openAddNewPostForm.bind(this);
        this.closeAddNewPostForm = this.closeAddNewPostForm.bind(this);
        this.setUserType = this.setUserType.bind(this);
        this.fetchData = this.fetchData.bind(this);

    }
    fetchData(){
        if (this.props.profileOwnerID) {
            var dbRef = this.props.firebase.firestore();
            dbRef.collection("users").doc(this.props.profileOwnerID).get().then(doc => {
                var data = doc.data()
                data['userid'] = doc.id;
                this.setState({
                    profileOwner: data
                })
            });
        }
    }
    componentDidMount() {
        if (this.props.currentUserID === '') {
            this.setUserType('unregistered visitor');
        } else if (this.props.currentUserID !== this.props.profileOwnerID) {
            this.setUserType('registered visitor');
        } else {
            this.setUserType('owner');
        }
        this.fetchData();

    }

    setUserType(usertype) {
        this.setState({
            usertype: usertype
        })
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
            var postids = this.state.profileOwner.posts;
            var posts = postids.map(postid =>
                <PostCard
                    key = {postid}
                    postid={postid}
                    post={null}
                    styles={this.postCardStyles}
                    firebase={this.props.firebase}
                    fromPage={'profile'}
                />);
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
                            fetchData={this.fetchData}
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
                            fetchData={this.fetchData}
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
                            {
                                this.state.profileOwner.breedname ?
                                    <p className="breed_label">{this.state.profileOwner.breedname}</p>
                                    : null
                            }
                            {
                                this.state.usertype === 'owner' ?
                                    <p className="edit_icon" onClick={this.openProfileUpdateForm}><FontAwesomeIcon icon="pencil-alt" /></p>
                                    : null
                            }
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
                    {
                        this.state.usertype === 'owner' ?
                            <div className="add_new_post_card"
                                style={this.stylefunction ? { height: '246px' } : null}
                                onClick={this.openAddNewPostForm}>
                                <div>
                                    <FontAwesomeIcon icon="plus" />
                                </div>
                            </div> :
                            null
                    }
                    {
                        posts
                    }
                </div>
            </div >
        );
    }
}

