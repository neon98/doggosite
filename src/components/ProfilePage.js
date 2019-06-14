import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PostCard from './PostCard'

import '../stylesheets/ProfilePage.css';

import goldy from '../assets/Golden_Retriever.jpg';
import treat from '../assets/treat.png'
import pat from '../assets/pat.png'
import boop from '../assets/dog.png'

//modes will be owner, registered visitor, unregistered visitor
export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usertype: '',
            isProfileOwner: false,
            profileUser: {
                doggoID: 'blacblacasapfj',
                doggoname: 'Doggoname',
                doggobreed: 'Breed',
                bio: ' Vivamus sed tincidunt sem. Mauris ornare ultrices mauris at ullamcorper. Nulla sit amet justo vel tellus pulvinar ullamcorper.',
                posts: [
                    {
                        postID: "postid1",
                        imageURL: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Vivamus sed tincidunt sem. Mauris ornare ultrices mauris at ullamcorper.',
                        treats: 2,
                        boops: 3,
                        pats: 4
                    },
                    {
                        postID: "postid2",
                        imageURL: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Vivamus sed tincidunt sem. Mauris ornare ultrices mauris at ullamcorper.',
                        treats: 2,
                        boops: 3,
                        pats: 4
                    },
                    {
                        postID: "postid3",
                        imageURL: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Vivamus sed tincidunt sem. Mauris ornare ultrices mauris at ullamcorper.',
                        treats: 2,
                        boops: 3,
                        pats: 4
                    },
                    {
                        postID: "postid1",
                        imageURL: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Vivamus sed tincidunt sem. Mauris ornare ultrices mauris at ullamcorper.',
                        treats: 2,
                        boops: 3,
                        pats: 4
                    },
                    {
                        postID: "postid2",
                        imageURL: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Vivamus sed tincidunt sem. Mauris ornare ultrices mauris at ullamcorper.',
                        treats: 2,
                        boops: 3,
                        pats: 4
                    },
                    {
                        postID: "postid3",
                        imageURL: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500',
                        caption: 'Vivamus sed tincidunt sem. Mauris ornare ultrices mauris at ullamcorper.',
                        treats: 2,
                        boops: 3,
                        pats: 4
                    }
                ]
            },
            currentUser: ''
        }
    }

    render() {
        var posts = [];
        const addNewPost = (
            <div className="add_new_post_card">
                <div>
                    <FontAwesomeIcon icon="plus" />
                </div>
            </div>
        )
        posts.push(addNewPost);
        var total_treets = 0, total_boops = 0, total_pats = 0;
        var temp_posts = this.state.profileUser.posts;
        for (var i = 0; i < temp_posts.length; i++) {
            total_treets += temp_posts[i].treats;
            total_boops += parseInt(temp_posts[i].boops);
            total_pats += parseInt(temp_posts[i].pats);
            posts.push(<PostCard post={temp_posts[i]} />);
        }

        return (
            <div className="profile_page_container">
                <div className="header">
                    <div className="profile_picture_wrapper">
                        <img className="profile_picture" src={goldy} alt="" />
                    </div>
                    <div className="profile_info_wrapper">
                        <div className="profile_info_header">
                            <h1>{this.state.profileUser.doggoname}</h1>
                            <p className="breed_label">{this.state.profileUser.doggobreed}</p>
                            <p className="edit_icon"><FontAwesomeIcon icon="pencil-alt" /></p>

                        </div>
                        <p className="profile_info_bio" >{this.state.profileUser.bio}</p>
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

// function post(post) {
//     return (
//         <div className="post_container">
//             <img src={post.imageURL} alt="" />
//             <p>{post.caption}</p>
//             <div className="pat_treat_boop">
//                 <div className="">
//                     <img className="icon" src={pat} alt="" />
//                     <p className="text">{post.pats}</p>
//                 </div>
//                 <div className="">
//                     <img className="icon" src={treat} alt="" />
//                     <p className="text">{post.treats}</p>
//                 </div>
//                 <div className="">
//                     <img className="icon" src={boop} alt="" />
//                     <p className="text">{post.boops}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }