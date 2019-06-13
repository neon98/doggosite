import React from 'react';
import '../stylesheets/BreedCard.css';
import lifespanIcon from '../assets/lifespan.png';
import heightIcon from '../assets//height.png';
import weightIcon from '../assets/weight.png';
// import lifespanIcon from '../assets/cardiology.png';


var options = {
    headers: {
        "x-api-key": "fcc5f69b-64e3-433c-8b8b-4053f9aebf3b"
    }
}

export default class BreedCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        var breed_name = this.props.breed.name;
        var bred_for = this.props.breed.bred_for;
        var origin = this.props.breed.origin;
        var height = this.props.breed.height.metric;
        var weight = this.props.breed.weight.metric;
        var life_span = this.props.breed.life_span;
        var temperament = this.props.breed.temperament;
        var breed_group = this.props.breed.breed_group;
        return (
            <div className="card">
                <div className="card_header">
                    <div>
                        <p className="breed_name_title">{breed_name}</p>
                        <p className="breed_group_label">{breed_group}</p>
                    </div>
                    <p className="card_subtitle">{temperament}</p>
                </div>
                <div className="card_image_wrapper">
                    <BreedCardImage id={this.props.breed.id}/>
                </div>
                <div className="card_content">
                    <div className="card_content_information_div">
                        <div >
                            <p className="bred_for_title">Bred for</p>
                            <p className="bred_for_value">{bred_for}</p>
                        </div>

                        <div>
                            <p className="bred_for_title">Origin</p>
                            <p className="bred_for_value">{origin}</p>
                        </div>
                    </div>
                    <ul className="card_content_information_list">
                        <li>
                            <div className="card_content_information_list_item">
                                <img src={lifespanIcon} className="card_content_icon" alt="" />
                                <p>{life_span}</p>
                            </div>
                        </li>
                        <li>
                            <div className="card_content_information_list_item" >
                                <img src={heightIcon} className="card_content_icon" alt="" />
                                <p>{height} cm</p>
                            </div>
                        </li>
                        <li>
                            <div className="card_content_information_list_item">
                                <img src={weightIcon} className="card_content_icon" alt="" />
                                <p style={{ paddingLeft: '5px' }}>{weight} kg</p>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}

class BreedCardImage extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl: ''
        }
    }
    async componentDidMount() {
        const response = await fetch(`https://api.TheDogAPI.com/v1/images/search?breed_id=` + this.props.id, options);
        const json = await response.json();
        if (json.length) {
            this.setState({
                imageUrl: json[0].url
            })
        }
    }
    async getImageUrl(id) {
        const response = await fetch(`https://api.TheDogAPI.com/v1/images/search?breed_id=` + id, options);
        const json = await response.json();
        if (json.length) {
            console.log(json[0].url);
            return json[0].url;
        }
        return null;
    }
    render() {
        return (
            this.state.imageUrl.length > 0 ?
                <img src={this.state.imageUrl} className="card_image" alt="doggoimage"></img>
                :
                null
        );
    }
}