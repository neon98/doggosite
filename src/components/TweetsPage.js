import React from 'react';
import '../stylesheets/TweetsPage.css';
// import { Twitter } from 'twitter-node-client';
import {TwitterTimelineEmbed } from 'react-twitter-embed';

// var twitter = new Twitter(twitterConfig);

export default class TweetsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
        // this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        // this.fetchData();
    }
    // fetchData() {
    //     twitter.getUserTimeline({ screen_name: 'dog_feelings', count: '10', trim_user: 'true', exclude_replies: 'true' }, (error) => {
    //         console.log(error);
    //     }, (body) => {
    //         var temp_data = JSON.parse(body);
    //         this.setState({
    //             data: temp_data
    //         })
    //         console.log(temp_data);
    //     });
    // }
    render() {

        return (
            <div className="container">
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="dog_feelings"
                    options={{ height: 600, width: 290 }}
                />
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="mydogiscutest"
                    options={{ height: 600, width: 290 }}
                />
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="dog_rates"
                    options={{ height: 600, width: 290 }}
                />
            </div>

        );
    }
}