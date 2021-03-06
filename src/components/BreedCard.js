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
                        {
                            breed_group ? <p className="breed_group_label">{breed_group}</p> : null
                        }

                    </div>
                    {
                        temperament ? <p className="card_subtitle">{temperament}</p> : null
                    }

                </div>
                <div className="card_image_wrapper">
                    <BreedCardImage id={this.props.breed.id} />
                </div>
                <div className="card_content">
                    {
                        bred_for || origin ?
                            <div className="card_content_information_div">
                                {
                                    bred_for ?
                                        <div >
                                            <p className="bred_for_title">Bred for</p>
                                            <p className="bred_for_value">{bred_for}</p>
                                        </div>
                                        : null
                                }
                                {
                                    origin ?
                                        <div>
                                            <p className="bred_for_title">Origin</p>
                                            <p className="bred_for_value">{origin}</p>
                                        </div>
                                        : null
                                }
                            </div>
                            : null
                    }

                    <ul className="card_content_information_list">
                        {
                            life_span ?
                                <li>
                                    <div className="card_content_information_list_item">
                                        <img src={lifespanIcon} className="card_content_icon" alt="" />
                                        <p>{life_span}</p>
                                    </div>
                                </li> : null
                        }
                        {
                            height ?
                                <li>
                                    <div className="card_content_information_list_item" >
                                        <img src={heightIcon} className="card_content_icon" alt="" />
                                        <p>{height} cm</p>
                                    </div>
                                </li>
                                : null
                        }
                        {
                            weight ?
                                <li>
                                    <div className="card_content_information_list_item">
                                        <img src={weightIcon} className="card_content_icon" alt="" />
                                        <p style={{ paddingLeft: '5px' }}>{weight} kg</p>
                                    </div>
                                </li>
                                : null
                        }
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
    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            fetch(`https://api.TheDogAPI.com/v1/images/search?breed_id=` + this.props.id, options)
            .then(response => response.json())
            .then(result => {
                if(result[0]){
                    this.setState({
                        imageUrl: result[0].url
                    })
                }
            })
        }
    }
    componentWillUnmount() {
        this.mounted = false;
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