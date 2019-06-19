import React from 'react';
import Popup from 'reactjs-popup';
import Dropzone from 'react-dropzone';

import '../stylesheets/FormModals.css'

import uploadphoto from '../assets/uploadphoto2.png'

export default class AddPostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: uploadphoto,
            imageFile: [],
            caption: '',
            characterCount: 100
        }
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            caption: event.target.value,
            characterCount: 100 - event.target.value.length
        })
    }
    handleOnDrop(file) {
        this.setState({
            imageUrl: file[0].preview,
            imageFile: file
        })
    }
    handleSubmit() {
        var dbRef = this.props.firebase.firestore();
        //add new post doc in posts collection in firestore
        dbRef.collection('posts').add({}).then(docRef => {
            var postid = docRef.id;
            var storageRef = this.props.firebase.storage().ref().child('posts/' + postid + '.jpg');
            //store image in firebase storage
            storageRef.put(this.state.imageFile[0]).then(snapshot => {
                snapshot.ref.getDownloadURL().then(url => {
                    // add data in post doc
                    dbRef.collection('posts').doc(postid).set({
                        caption: this.state.caption,
                        username: this.props.username,
                        userid: this.props.userid,
                        postImageUrl: url,
                        pats: 0,
                        treats: 0,
                        boops: 0,
                        pats_userids: [],
                        treats_userids: [],
                        boops_userids: []
                    })
                    // add post id in user doc
                    dbRef.collection('users').doc(this.props.userid).update({
                        posts: this.props.firebase.firestore.FieldValue.arrayUnion(postid)
                    })
                    // this.props.fetchProfile()
                    this.props.close()

                    //add new post doc in pats, boops, treats collection
                    // dbRef.collection('boops').doc(postid).set({});
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                // delete post doc if image isn't stored
                dbRef.collection('posts').doc(postid).delete();
            });
        }).catch(function (error) {
            console.log(error);
        });

    }
    render() {
        var contentStyle = {
            width: '300px',
            marginTop: '100px',
            padding: '0',
            borderRadius: '4px',
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)'
        }
        return (
            <Popup
                contentStyle={contentStyle}
                open={this.props.open}
                onClose={this.props.close}
                modal
            >
                <div className="modal">
                    <button className="close" onClick={this.props.close}> &times; </button>
                    <div className="header">Add Post</div>
                    <div className="content">

                        <form id="addPostForm">
                            <div className="update_image_div" style={{marginTop: '15px'}}>
                                <Dropzone
                                    style={{ position: 'unset', cursor: 'pointer' }}
                                    onDrop={file => { this.handleOnDrop(file) }}
                                    multiple={false}
                                    accept='image/jpeg'
                                >
                                    <img className="post_updated_image" src={this.state.imageUrl} alt="" />
                                </Dropzone>
                            </div>

                            <div className="input_field">
                                {/* <label>Bio</label> */}
                                <textarea placeholder="Write caption here..." rows="3" maxLength="100" id="bio" onChange={this.handleChange} value={this.state.bio} />
                                <p>{this.state.characterCount} characters left</p>
                            </div>
                        </form>

                    </div>
                    <div className="actions">
                        <button
                            className="button"
                            onClick={this.handleSubmit}
                            disabled={this.state.imageFile.length === 0}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Popup>
        );
    }
}