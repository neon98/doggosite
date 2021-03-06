import React from 'react';
import '../stylesheets/PostCard.css'
import treat from '../assets/treat.png'
import pat from '../assets/pat.png'
import boop from '../assets/dog.png'

export default class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            post: {},
            pat: false,
            treat: false,
            boop: false,
        }
        this.handleBoop = this.handleBoop.bind(this);
        this.handlePTB = this.handlePTB.bind(this)
        this.updatePost = this.updatePost.bind(this);
    }
    componentDidMount() {
        if (this.props.post === null) {
            var dbRef = this.props.firebase.firestore().collection('posts')
            dbRef.doc(this.props.postid).get().then(doc => {
                var post = doc.data();
                post['postid'] = doc.id;
                this.updatePost(post, this.props.userid);
            })
        } else {
            this.updatePost(this.props.post, this.props.userid);
        }
    }
    componentDidUpdate() {
        if (this.state.userid !== this.props.userid) {
            this.setState({
                userid: this.props.userid
            });
            this.updatePost(this.state.post, this.props.userid);
        }
    }
    updatePost(post, userid) {
        var pat = post.pats_userids ? post.pats_userids.includes(userid) : false;
        var treat = post.treats_userids ? post.treats_userids.includes(userid) : false;
        var boop = post.boops_userids ? post.boops_userids.includes(userid) : false;
        this.setState({
            post: post,
            userid: userid,
            pat: pat,
            treat: treat,
            boop: boop

        })
    }
    handleBoop() {
        if (!this.state.userid) {
            console.log("Please Login / Signup!");
        } else {
            this.state.boop ? this.updateBoopInDB(false) : this.updateBoopInDB(true);
        }
    }
    handlePTB(str) {
        if (!this.state.userid) {
            console.log("Please Login / Signup!");
        } else {
            switch (str) {
                case "pats":
                    this.state.pat ? this.updatePTBInDB(str, false) : this.updatePTBInDB(str, true);
                    break;
                case "treats":
                    this.state.treat ? this.updatePTBInDB(str, false) : this.updatePTBInDB(str, true);
                    break;
                case "boops":
                    this.state.boop ? this.updatePTBInDB(str, false) : this.updatePTBInDB(str, true);
                    break;
                default:
                    break;
            }
        }
    }
    updatePTBInDB(str, add) {
        this.updatePTBinUI(str, add)
        var dbRef = this.props.firebase.firestore();
        dbRef.collection('posts').doc(this.state.post.postid).update({
            [str]: this.props.firebase.firestore.FieldValue.increment(add ? 1 : -1),
            [str + '_userids']: (
                add ? this.props.firebase.firestore.FieldValue.arrayUnion(this.props.userid)
                    : this.props.firebase.firestore.FieldValue.arrayRemove(this.props.userid)
            )
        }).then(() => {
            dbRef.collection('users').doc(this.state.post.userid).update({
                ['total' + str]: this.props.firebase.firestore.FieldValue.increment(add ? 1 : -1)
            }).then(() => {

            }).catch(error => {
                console.log(error);
            });

        }).catch(error => {
            this.updatePTBinUI(str, !add);
            console.log(error);
        });
    }

    updatePTBinUI(str, add){
        var temp_post = this.state.post;
        temp_post[str] = add ? temp_post[str] + 1 : temp_post[str] - 1;
        str = str.substring(0, str.length - 1);
        this.setState({
            [str]: add,
            post: temp_post
        });
    }

    render() {
        var styles = this.props.styles;
        return (
            <div style={styles.post_container} >
                {
                    this.props.fromPage === 'home' ?
                        <p
                            style={styles.post_username}
                            onClick={() => { this.props.openProfilePage(this.state.post.userid) }}
                        >{this.state.post.username}</p>
                        :
                        null
                }
                <img style={styles.post_image} src={this.state.post.postImageUrl} alt="" />
                <p style={styles.post_caption}>{this.state.post.caption}</p>
                <div style={styles.pat_treat_boop}>
                    <div style={styles.pat_treat_boop_div}
                        onClick={() => { this.handlePTB('pats') }}
                        className={this.state.pat ? 'highlight' : null}
                    >
                        <img style={styles.pat_treat_boop_icon} src={pat} alt="" />
                        <p style={styles.pat_treat_boop_text}>{this.state.post.pats}</p>
                    </div>
                    <div style={styles.pat_treat_boop_div}
                        onClick={() => { this.handlePTB('treats') }}
                        className={this.state.treat ? 'highlight' : null}
                    >
                        <img style={styles.pat_treat_boop_icon} src={treat} alt="" />
                        <p style={styles.pat_treat_boop_text}>{this.state.post.treats}</p>
                    </div>
                    <div style={styles.pat_treat_boop_div}
                        onClick={() => { this.handlePTB('boops') }}
                        className={this.state.boop ? 'highlight' : null}
                    >
                        <img style={styles.pat_treat_boop_icon} src={boop} alt="" />
                        <p style={styles.pat_treat_boop_text}>{this.state.post.boops}</p>
                    </div>
                </div>
            </div>
        );
    }
}