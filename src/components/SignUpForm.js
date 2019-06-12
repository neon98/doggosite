import React from 'react';
import './SignUpForm.css'
import Popup from 'reactjs-popup';

export default class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    get initialState() {
        return {
            username: '',
            email: '',
            password: '',
            validUserName: false
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
        if (event.target.id === "username") {
            this.verifyUsername(event.target.value);
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signUp();
    }

    verifyUsername(username) {
        var usersRef = this.props.firebase.firestore().collection('users');
        usersRef.where('username', '==', username).get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    this.setState({
                        validUserName: false
                    })
                } else {
                    this.setState({
                        validUserName: true
                    })
                }
            })
    }

    signUp() {
        this.props.firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(data => {
            this.props.firebase.firestore().collection('users').doc(data.user.uid).set({
                username: this.state.username
            }).then(() => {

                this.props.setUser({ username: this.state.username });
                this.setState(this.initialState);
                document.getElementById('signUpForm').reset();
                this.props.close();
            }).catch(function (error) {
                console.log(error)
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        var contentStyle = {
            width: '300px', 
            marginTop: '100px'
        }
        return (
            <Popup
                contentStyle={contentStyle}
                open={this.props.open}
                onClose={this.props.close}
                modal
            >
                <div className="modal">
                    <button className="close" onClick={this.props.close}>&times;</button>
                    <div className="header"> Sign Up </div>
                    <div className="content">
                        <form id="signUpForm">
                            <div className="input_field" style={{ display: "flex" }}>
                                <label htmlFor="username">User name</label>
                                <input type="text" id="username" onChange={this.handleChange} />
                                {
                                    this.state.username === '' ? null
                                        : this.state.validUserName
                                            ? <p style={{ color: "green" }}>Valid</p>
                                            : <p style={{ color: "red" }}>Invalid</p>
                                }
                            </div>
                            <div className="input_field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={this.handleChange} />
                            </div>
                            <div className="input_field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={this.handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="actions">
                        <button
                            disabled={
                                !this.state.validUserName ||
                                !this.state.username ||
                                !this.state.email ||
                                !this.state.password
                            }
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </button>
                        <button
                            className="button"
                            onClick={this.props.close}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Popup>
        );
    }
}