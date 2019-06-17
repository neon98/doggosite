import React from 'react';
import '../stylesheets/Homepage.css'

import Postcard from './PostCard';
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.postCardStyles = {
            post_container: {
                borderRadius: '4px',
                marginBottom: '20px',
                marginRight: '20px',
                boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.2)',
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
            userid: ''
        }
        this.openProfilePage = this.openProfilePage.bind(this);
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

    }
    componentDidUpdate(){
        if(this.state.userid!==this.props.userid){
            this.setState({
                userid: this.props.userid
            })
        }
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
                        posts
                    }
                </div>
                <div className="rightDiv">

                </div>

            </div>


        );
    }
}