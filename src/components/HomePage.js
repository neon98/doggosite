import React from 'react';

import Postcard from './PostCard';
import Loader from './Loader';

import '../stylesheets/Homepage.css'

import treat from '../assets/treat.png'
import pat from '../assets/pat.png'
import boop from '../assets/dog.png'
import bulb from '../assets/light-bulb-on.png'

function ProfileCard(props) {
    var styles = {
        container: {
            background: 'white',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems:'',
            padding: '10px 20px 5px 20px'
        },
        image:{
            height: '80px',
            width: '80px',
            borderRadius: '50%',
            border: '1px solid rgb(234, 234, 234)'
        }
        
    }
    return (
        <div style={styles.container}>
            <div>   
                <img src={props.user.profilePictureUrl} style={styles.image} alt=""/>
            </div>
            <div>
                <p style={{padding:'0',margin:'10px 0 5px 10px', fontSize:'16px'}}>{props.user.username}</p>
                <div style={props.styles.pat_treat_boop}>
                <div style={props.styles.pat_treat_boop_div} className={'defaultCursor'}>
                    <img src={pat} alt="" style={props.styles.pat_treat_boop_icon} />
                    <p style={props.styles.pat_treat_boop_text}>{props.user.totalpats}</p>
                </div>
                <div style={props.styles.pat_treat_boop_div}  className={'defaultCursor'}>
                    <img src={treat} alt="" style={props.styles.pat_treat_boop_icon} />
                    <p style={props.styles.pat_treat_boop_text}>{props.user.totaltreats}</p>
                </div>
                <div style={props.styles.pat_treat_boop_div}  className={'defaultCursor'}>
                    <img src={boop} alt="" style={props.styles.pat_treat_boop_icon} />
                    <p style={props.styles.pat_treat_boop_text}>{props.user.totalboops}</p>
                </div>
            </div>
            </div>
        </div>
    )
}
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.postCardStyles = {
            post_container: {
                borderRadius: '4px',
                marginBottom: '20px',
                marginRight: '20px',
                border: '1px solid rgb(234, 234, 234)',
                wordWrap: 'break-word',
                width: '100%',
                background: 'white'
            },
            post_username: {
                fontWeight: '500',
                padding: '10px',
                margin: '0',
                fontSize: '20px',
                cursor: 'pointer'
            },
            post_image: {
                width: '100%',
                height: '100%',
                borderRadius: '2px 2px 0px 0px'
            },
            post_caption: {
                padding: '5px 10px 10px 10px',
                margin: '0',
                fontSize: '15px',
                wordBreak: 'break-all'
            },
            pat_treat_boop: {
                display: 'flex',
                justifyContent: 'flex-start',
                margin: '0',
                padding: '0px 10px 10px 0px'
            },
            pat_treat_boop_div: {
                display: 'flex',
                flexWrap: 'wrap',
                margin: '0px 3px',
                padding: '3px 0 3px 7px',
                cursor: 'pointer',
                borderRadius: '4px'
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
        this.state = {
            posts: [],
            userid: '',
            fact: '',
            highestPatsUser: {},
            hightstTreatsUser: {},
            highestBoopsUser: {}
        }
        this.openProfilePage = this.openProfilePage.bind(this);
        this.fetchFact = this.fetchFact.bind(this);
        this.fetchHighestPTB = this.fetchHighestPTB.bind(this);
    }

    openProfilePage(profileOwnerId) {
        this.props.openProfilePage(profileOwnerId);
    }
    componentDidMount() {
        this.setState({
            userid: this.props.userid
        }, () => {
            var posts = [];
            this.props.firebase.firestore().collection('posts').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    var data = doc.data();
                    data['postid'] = doc.id;
                    posts.push(
                        data
                    );
                });
                this.setState({
                    posts: posts
                })
            }, error => {
                console.log(error);
            });
        })
        this.fetchFact();
        this.fetchHighestPTB();

    }
    componentDidUpdate() {
        if (this.state.userid !== this.props.userid) {
            this.setState({
                userid: this.props.userid
            })
        }
    }
    fetchFact() {
        var requestOptions = {
            method: 'GET'
        };
        fetch('https://some-random-api.ml/facts/dog', requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                this.setState({
                    fact: result.fact
                })

            })
            .catch(error => console.log('error', error));
    }
    fetchHighestPTB() {
        this.props.firebase.firestore().collection('winners').doc('winners').get()
            .then(doc => {
                var data = doc.data();
                if (data.highestPats) {
                    this.props.firebase.firestore().collection('users').doc(data.highestPats).get()
                        .then(userDoc => {
                            var userdata = userDoc.data();
                            userdata['userid'] = userDoc.id;
                            this.setState({
                                highestPatsUser: userdata
                            });
                        });
                }
                if (data.highestTreats) {
                    this.props.firebase.firestore().collection('users').doc(data.highestTreats).get()
                        .then(userDoc => {
                            var userdata = userDoc.data();
                            userdata['userid'] = userDoc.id;
                            this.setState({
                                highestTreatsUser: userdata
                            });
                        });
                }
                if (data.highestBoops) {
                    this.props.firebase.firestore().collection('users').doc(data.highestBoops).get()
                        .then(userDoc => {
                            var userdata = userDoc.data();
                            userdata['userid'] = userDoc.id;
                            this.setState({
                                highestBoopsUser: userdata
                            });
                        });
                }

            }).catch(error => {
                console.log(error)
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
        var posts = this.state.posts.map(post =>
            <Postcard
                key={post.postid}
                styles={this.postCardStyles}
                post={post}
                fromPage={'home'}
                openProfilePage={this.openProfilePage}
                firebase={this.props.firebase}
                userid={this.state.userid}
            />
        )
        return (
            <div className="container">
                <div className="leftDiv">
                    {
                        posts.length ? posts : <Loader/>
                    }
                </div>
                <div className="rightDiv">
                    <div className="fact">
                        <p><img src={bulb} style={{height: '16px', width:'18px', marginRight:'5px' }} alt=""/>{
                            this.state.fact
                        }</p>
                    </div>
                    <div className="highestPTB" >
                        {
                            !this.isEmpty(this.state.highestPatsUser) ?
                                <div style={{marginTop:'10px' ,background: 'white', border: '1px solid rgb(234, 234, 234)'}}>
                                    <p style={{margin:'0', padding:'10px 5px 10px 20px', borderBottom:'1px solid rgb(234, 234, 234)'}}>Yaay! bla</p>
                                    <ProfileCard user={this.state.highestPatsUser} styles={this.postCardStyles} />
                                </div>
                                : null
                        }
                        {
                            !this.isEmpty(this.state.highestTreatsUser) ?
                                <div style={{marginTop:'10px' ,background: 'white', border: '1px solid rgb(234, 234, 234)'}}>
                                    <p style={{margin:'0', padding:'10px 5px 10px 20px', borderBottom:'1px solid rgb(234, 234, 234)'}}>Yaay! another bla</p>
                                    <ProfileCard user={this.state.highestTreatsUser} styles={this.postCardStyles} />
                                </div>
                                : null
                        }
                        {
                            !this.isEmpty(this.state.highestBoopsUser) ?
                                <div style={{marginTop:'10px' ,background: 'white', border: '1px solid rgb(234, 234, 234)'}}>
                                    <p style={{margin:'0', padding:'10px 5px 10px 20px', borderBottom:'1px solid rgb(234, 234, 234)'}}>Yaay! another another bla</p>
                                    <ProfileCard user={this.state.highestBoopsUser} styles={this.postCardStyles} />
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

