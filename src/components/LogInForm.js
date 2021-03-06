import React from 'react';
import '../stylesheets/FormModals.css';
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
            password: '',
            error: ''
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
            error: ''
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signIn();
    }

    signIn() {
        console.log(this.state);

        this.props.firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(data => {
            this.props.setUser(data.user.uid);
            localStorage.setItem('doggositeuser', data.user.uid);
            document.getElementById('loginForm').reset();
            this.setState(this.initialState);
            this.props.close();
        }).catch(error => {
            if(error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found'){
                this.setState({
                    error: 'Invalid email ID'
                })
            } else if (error.code === 'auth/wrong-password') {
                this.setState({
                    error: 'Invalid Password'
                })
            } else {
                this.setState({
                    error: 'Error'
                })
            }
            // console.log(error)
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
                    <div className="header">Login </div>
                    {
                        this.state.error !== '' ?
                            <div>
                                <p className="errorMessage">{this.state.error}</p>
                            </div>
                            : null
                    }
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
                        <button
                            className="button"
                            onClick={this.handleSubmit}
                            disabled={this.state.email === '' || this.state.password === ''}
                        >
                            Login
                        </button>
                    </div>
                    

                </div>
            </Popup>
        );
    }
}