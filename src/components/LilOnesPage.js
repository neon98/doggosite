import React from 'react';
import '../stylesheets/LilOnesPage.css';

export default class LilOnesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        var sr = 'puppies';
        fetch('http://api.reddit.com/r/'+sr+'/new.json?limit=10')
            .then(response => {
                return response.json()
            })
            .then(data => this.setState({ data: data.data.children }));
    }
    render() {
        var images;

        if (this.state.data.length > 0) {
            images = this.state.data.map(data =>{
                console.log(data.data);
                return(
                    <img src={data.data.url} alt="" style={{ height: '220px', width: '220px'}} />
                )
            } )
        }
        return (
            <div className="gridContainer">
                {
                    images
                }
            </div>
        );
    }
}