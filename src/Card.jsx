import React, {Component} from 'react'
import './Card.css'
import plus from './assets/plus.svg'
import minus from './assets/minus.svg'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            added: false
        };
    }

    increment() {
        let currentQuantity = this.state.quantity;
        this.setState({quantity: currentQuantity+1})
    }

    decrement() {
        let currentQuantity = this.state.quantity;

        if (currentQuantity === 0) {
            return;
        } else {
            this.setState({quantity: currentQuantity - 1})
        }
    }

    async addToCart() {
        let item = this.props.label;
        let stock = await fetch(`/api/item/${item}/instock`)
            .then(response => {
                if (!response.ok) {
                    throw ("API call failed");
                } else {
                    return response.json();
                }
            })
            .catch(error => console.log(error));

        if (!stock) {
            alert("Out of Stock!");
        } else {
            alert("In Stock!");
        }
        
    }


    render () { 
        return (
            <div>
                <div class="details">
                    <div>
                        {this.props.label}
                    </div>

                    <div>
                        {this.props.price}
                    </div>
                </div>
                
                <div class="quantity">
                    <label>{this.state.quantity}</label>

                    <div onClick={this.decrement.bind(this)}>
                        <img src={minus}/>
                    </div>

                    <div onClick={this.increment.bind(this)}>
                        <img src={plus}/>
                    </div>
                </div>

                <div class="cart" onClick={this.addToCart.bind(this)}>
                    Add to Cart
                </div>
            </div>
        )
    }
}

export default Card;