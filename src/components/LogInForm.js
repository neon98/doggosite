import React from 'react';
import './LogInForm.css';
import Popup from 'reactjs-popup';

export default class LogInForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    get initialState() {
        return {
            email: '',
            password: ''
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signIn();
    }

    signIn() {
        this.props.firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(data => {
            this.props.firebase.firestore().collection('users').doc(data.user.uid).get()
                .then(doc => {
                    this.props.setUser(doc.data());
                    document.getElementById('loginForm').reset();
                    this.setState(this.initialState);
                    this.props.close();
                })
                .catch(error => {
                    alert(error);
                });
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        var contentStyle = {
            width: '300px', 
            marginTop: '100px'
        }
        return (
            <Popup
                contentStyle={ contentStyle}
                open={this.props.open}
                onClose={this.props.close}
                modal
            >
                <div className="modal">
                    <button className="close" onClick={this.props.close}>&times;</button>
                    <div className="header"> Login </div>
                    <div className="content">
                        <form id="loginForm">
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
                        <button onClick={this.handleSubmit}>Login</button>
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