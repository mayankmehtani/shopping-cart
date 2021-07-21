import React, {Component} from 'react'
import Card from './Card.jsx'
import './Grid.css'
import _ from 'lodash'

class Grid extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            cards: [],
        }
    }
    async getItems() {
        return await fetch(`/api/item/${this.props.item_type}/`)
            .then(response => {
                if (!response.ok) {
                    throw ("API call failed");
                } else {
                    return response.json();
                }
            })
            .catch(error => console.log(error));
    }
    setRows() {
        let rows = [];
        for (let i=0; i < this.state.cards.length; i+=3) {
            rows.push(
                <div class="row">
                    {this.state.cards[i]}
                    {this.state.cards[i+1]}
                    {this.state.cards[i+2]}
                </div>
            )
        }

        return rows;
    }
    async componentDidMount() {
        let itemCards = [];
        let items = await this.getItems();
        items = _.sortBy(items, "name");
        for (let item of items) {
            itemCards.push(<Card label={item.name} price={"£"+item.price} image_src={item.image}></Card>)
        }

        this.setState({cards: itemCards})
    }
    render() {
        return (
            <div id="grid">
                {this.setRows()}
            </div>
        )
    }
}

export default Grid;