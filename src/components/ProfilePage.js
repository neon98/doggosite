import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PostCard from './PostCard';
import ProfileUpdateForm from './ProfileUpdateForm';
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
            isProfileOwner: false,
            openProfileUpdateForm: false
        }
        this.openProfileUpdateForm = this.openProfileUpdateForm.bind(this);
        this.closeProfileUpdateForm = this.closeProfileUpdateForm.bind(this);
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
    componentDidMount() {
        var dbRef = this.props.firebase.firestore().collection("users");
        dbRef.doc(this.props.profileOwnerID).onSnapshot(doc => {
            var data = doc.data()
            data['userid'] = doc.id;
            this.setState({
                profileOwner: data
            })
        });
    }
    render() {
        var posts = [], total_treets = 0, total_boops = 0, total_pats = 0;
        const addNewPost = (
            <div className="add_new_post_card">
                <div>
                    <FontAwesomeIcon icon="plus" />
                </div>
            </div>
        )
        posts.push(addNewPost);

        // if (this.state.profileOwner.posts) {
        //     var temp_posts = this.props.profileOwner.posts;
        //     for (var i = 0; i < temp_posts.length; i++) {
        //         total_treets += temp_posts[i].treats;
        //         total_boops += parseInt(temp_posts[i].boops);
        //         total_pats += parseInt(temp_posts[i].pats);
        //         posts.push(<PostCard post={temp_posts[i]} />);
        //     }
        // }

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
                    {
                        posts
                    }
                </div>
            </div >
        );
    }
}