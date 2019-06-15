import React from 'react';
import '../stylesheets/ProfileUpdateForm.css';
import Popup from 'reactjs-popup';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProfileUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            breedname: '',
            bio: '',
            characterCount: 100,
            imageFile: []
        }
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleBioChange(event) {
        this.setState({
            bio: event.target.value,
            characterCount: 100 - event.target.value.length
        })
    }
    handleOnDrop(file) {
        this.setState({
            imageFile: file
        })
    }
    handleChange(){
        
    }
    componentDidMount() {
        this.setState({
            username: this.props.username,
            breedname: this.props.breedname,
            bio: this.props.bio,
            characterCount: 100 - this.props.bio.length
        })
    }
    
    render() {
        var contentStyle = {
            width: '500px',
            marginTop: '100px',
            borderRadius: '4px',
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
            border: 'none'
        }
        return (
            <Popup
                contentStyle={contentStyle}
                open={this.props.open}
                onClose={this.props.close}
                modal
            >
                <div className="UpdateProfileModal container">
                    <div className="header">Update Profile</div>
                    <div className="content">

                        <form id="updateProfileForm">
                            <div className="update_image_div">
                                <Dropzone
                                    onDrop={file => { this.handleOnDrop(file) }}
                                    multiple={false}
                                >
                                    <div>Drag and drop or click to select a 550x550px file to upload.</div>
                                </Dropzone>
                            </div>
                            <div>
                                <div className="input_field">
                                    <label htmlFor="breedname">Breedname</label>
                                    <input type="text" id="email" onChange={this.handleChange} value={this.props.breedname} />
                                </div>
                                <div className="input_field">
                                    <label>Bio</label>
                                    <textarea rows="3" maxLength="100" onChange={this.handleBioChange} value={this.state.bio} />
                                    <p>{this.state.characterCount} characters left</p>
                                </div>
                            </div>

                        </form>

                    </div>
                    <div className="actions">
                        <button
                            className="button"
                            onClick={this.handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </Popup>
        );
    }
}