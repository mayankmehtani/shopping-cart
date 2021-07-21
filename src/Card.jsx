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

        this.setQuantityFromUser = this.setQuantityFromUser.bind(this);
    }

    increment() {
        let currentQuantity = this.state.quantity;

        if (!isNaN(currentQuantity)) {
            this.setState({quantity: Number(currentQuantity)+1});
        }
    }

    decrement() {
        let currentQuantity = this.state.quantity;

        if (currentQuantity === 0 || currentQuantity === "") {
            return;
        } else if (!isNaN(currentQuantity)) {
            this.setState({quantity: Number(currentQuantity) - 1})
        }
    }

    setQuantityFromUser({target}) {
        this.setState({quantity: target.value});
    }

    async addToCart() {
        if (isNaN(this.state.quantity)) {
            alert("That's not a number!");
            return;
        } else if (this.state.quantity === 0 || this.state.quantity === "") {
            return;
        }

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

                    <img src={`http://localhost:8000${this.props.image_src}`}></img>
                    
                </div>
                
                <div class="quantity">
                    <input type="text" onChange={this.setQuantityFromUser} value={this.state.quantity}></input>

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