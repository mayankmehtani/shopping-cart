import React, {Component} from 'react'
import Card from './Card.jsx'
import './Grid.css'
import _ from 'lodash'

class Grid extends Component {
    constructor() { 
        super();

        this.state = {
            rows: []
        }
    }
    async getItems() {
        return await fetch('/api/item/')
            .then(response => {
                if(!response.ok) {
                    throw ("API call failed");
                } else {
                    return response.json();
                }
            })
            .catch(error => console.log(error));
    }
    async componentDidMount() {
        let itemCards = [];
        let items = await this.getItems();
        items = _.sortBy(items, "name");
        for (let item of items) {
             itemCards.push(<Card label={item.name} price={"£"+item.price}></Card>)
        }

        let rows = [];
        for (let i = 0; i < itemCards.length; i += 3) {
            rows.push(
                <div class="row">
                    {itemCards[i]}{itemCards[i+1]}{itemCards[i+2]}
                </div>
            ) 
        }
        this.setState({rows: rows});
    }
    render() {
        return (
            <div id="grid">
                {this.state.rows}
            </div>
        )
    }
}

export default Grid;