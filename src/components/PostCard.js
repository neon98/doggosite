import React from 'react';
// import '../stylesheets/PostCard.css'
import treat from '../assets/treat.png'
import pat from '../assets/pat.png'
import boop from '../assets/dog.png'

export default class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usertype: '', /* if registered then only allow to boop no need to put it here access it from props*/ 
            post: {},
            fromPage: '', /** access it from props */
            boop: false
        }
        // this.handleBoop = this.handleBoop.bind(this);
    }
    componentDidMount() {
        if (this.props.post === null) {
            var dbRef = this.props.firebase.firestore().collection('posts')
            dbRef.doc(this.props.postid).get().then(doc => {
                var data = doc.data();
                data['postid'] = doc.id;
                this.setState({
                    //set usertype
                    post: doc.data()
                })
            })
        } else {
            this.setState({
                post: this.props.post
            })
        }
        
    }
    // handleBoop(){
    //     if(this.state.usertype === 'unregistered visitor' || this.state.usertype === 'unregistered'){
    //         // Display error showing that the user need to login to make boop 
    //     } else{
    //         if(this.state.boop){ // means delete entry from doc and decrease count from boops 

    //         }
    //         else{ // add boop 
    //             this.setState({
    //                 boop: true
    //             })
    //             var temp_post = this.state.post;
    //             temp_post['boops'] = temp_post['boops'] + 1;
    //             this.setState({
    //                 post: temp_post
    //             })
    //             var dbRef = this.props.firebase.firestore();
    //             dbRef.collection('boops').doc(this.state.post.postid).update({
    //                 userid:this.props.userid
    //             })
    //         }      
    //     }
    // }
    render() {
        var styles = this.props.styles;
        return (
            <div style={styles.post_container} >
                {
                    this.props.fromPage==='home' ? 
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
                    {/* <div style={styles.pat_treat_boop_div} onClick = {()=>{this.boop()}} > */}
                    <div style={styles.pat_treat_boop_div}  >
                        <img style={styles.pat_treat_boop_icon} src={pat} alt="" />
                        <p style={styles.pat_treat_boop_text}>{this.state.post.pats}</p>
                    </div>
                    <div style={styles.pat_treat_boop_div}>
                        <img style={styles.pat_treat_boop_icon} src={treat} alt="" />
                        <p style={styles.pat_treat_boop_text}>{this.state.post.treats}</p>
                    </div>
                    <div style={styles.pat_treat_boop_div}>
                        <img style={styles.pat_treat_boop_icon} src={boop} alt="" />
                        <p style={styles.pat_treat_boop_text}>{this.state.post.boops}</p>
                    </div>
                </div>
            </div>
        );
    }
}