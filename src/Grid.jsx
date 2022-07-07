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
        return await fetch(`/api/item/${this.props.itemCategory}/`)
            .then(response => {
                if (!response.ok) {
                    throw Error("API call failed");
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

    async setCards() {
        let itemCards = new Array();
        let items = await this.getItems();
        items = _.sortBy(items, "name");
        for (let item of items) {
            let c = <Card label={item.name} price={item.price} image_src={item.image}/>;
            itemCards.push(c);
        }

        this.setState({cards: []});
        this.setState({cards: itemCards});
    }

    async componentDidMount() {
        this.setCards();
    }
    async componentDidUpdate(prevProps) {        
        if (this.props.itemCategory !== prevProps.itemCategory) {
            this.setCards();
        }
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