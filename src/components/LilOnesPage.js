import React from 'react';
import Loader from './Loader';

import '../stylesheets/LilOnesPage.css';

export default class LilOnesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        // var srs = ['puppies', 'PuppySmiles', 'rarepuppers']
        var sr = 'puppies';
        var limit = 100;
        fetch('http://api.reddit.com/r/'+sr+'/new.json?limit='+limit)
            .then(response => {
                return response.json()
            })
            .then(data => this.setState({ data: data.data.children }));
    }
    render() {
        var images;

        if (this.state.data.length > 0) {
            images = this.state.data.map(data =>{
                return(
                    data.data.url.includes('.jpg' ||  'png' || 'jpeg') ?
                    <img key={data.data.key} src={data.data.url} alt="" style={{ height: '220px', width: '220px', borderRadius:'5px'}} />
                    : null
                )
            } )
        }
        return (
            <div className="gridContainer">
                {
                    this.state.data.length ? images : <Loader/>
                }
            </div>
        );
    }
}