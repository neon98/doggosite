import React from 'react';
import Popup from 'reactjs-popup';
import Dropzone from 'react-dropzone';

import '../stylesheets/FormModals.css';

import uploadphoto from '../assets/uploadphoto.png'

export default class ProfileUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            breedname: '',
            bio: '',
            characterCount: 100,
            imageFile: [],
            imageUrl: uploadphoto
        }
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnDrop(file) {
        this.setState({
            imageUrl: file[0].preview,
            imageFile: file
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
        if (event.target.id === 'bio') {
            this.setState({
                characterCount: 100 - event.target.value.length
            })
        }
    }

    handleSubmit() {
        var docRef = this.props.firebase.firestore()
            .collection('users').doc(this.props.userid);
        if (this.state.imageFile.length > 0) {
            var storageRef = this.props.firebase.storage().ref().child('profilePictures');
            var imageRef = storageRef.child(this.state.userid + '.jpg')
            imageRef.put(this.state.imageFile[0]).then(snapshot => {
                snapshot.ref.getDownloadURL().then(url => {
                    docRef.update({
                        bio: this.state.bio,
                        breedname: this.state.breedname,
                        profilePictureUrl: url
                    }).then(()=>{
                        this.props.fetchData()
                        this.props.close()
                    })
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });

        } else {
            docRef.update({
                bio: this.state.bio,
                breedname: this.state.breedname,
            }).then(()=>{
                this.props.fetchData()
                this.props.close()
            })
        }
        this.props.close();
    }

    componentDidMount() {
        this.setState({
            username: this.props.username,
            breedname: this.props.breedname,
            bio: this.props.bio,
            characterCount: this.props.bio ? 100 - this.props.bio.length : 100
        })
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
                    <div className="header">Update Profile</div>
                    <div className="content">

                        <form id="updateProfileForm">
                            <div className="update_image_div">
                                <Dropzone
                                    style={{ position: 'unset', cursor: 'pointer' }}
                                    onDrop={file => { this.handleOnDrop(file) }}
                                    multiple={false}
                                    accept='image/jpeg'
                                >
                                    <img className="updated_image" src={this.state.imageUrl} alt="" />
                                </Dropzone>
                            </div>

                            <div className="input_field">
                                <label htmlFor="breedname">Breedname</label>
                                <input type="text" id="breedname" onChange={this.handleChange} value={this.state.breedname} />
                            </div>
                            <div className="input_field">
                                <label>Bio</label>
                                <textarea rows="3" maxLength="100" id="bio" onChange={this.handleChange} value={this.state.bio} />
                                <p>{this.state.characterCount} characters left</p>
                            </div>
                        </form>

                    </div>
                    <div className="actions">
                        <button
                            className="button"
                            onClick={this.handleSubmit}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Popup>
        );
    }
}