/* eslint-disable no-loop-func */
import React from 'react';
import BreedCard from './BreedCard';
import '../stylesheets/OurCommunityPage.css'
import Media from 'react-media';

export default class OurCommunityPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breeds: [],
        }
    }
    async componentDidMount() {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds`);
        const json = await response.json();
        console.log(json);
        this.setState({
            breeds: json
        })
    }
    render() {
        let breedCards = this.state.breeds.map(breed => <BreedCard key={breed.id} breed={breed} />)

        return (
            <div className="community_page_container" >
                <Media
                    query="(max-width: 650px)"
                    onChange={
                        matches =>
                            matches
                                ? this.setState({ mobileUI: true })
                                : this.setState({ mobileUI: false })
                    }
                />
                {breedCards}
            </div>

        );
    }
}