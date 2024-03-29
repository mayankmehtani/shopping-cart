import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Card.css'
import {addItemToCart} from '../../features/cartSlice'
import plus from '../../assets/plus.svg'
import minus from '../../assets/minus.svg'

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 0,
            added: false
        };
    }

    increment() {
        // Increment the quantity by 1. A blank will be interpreted as 0
        this.setState({quantity: Number(this.state.quantity)+1});
    }

    decrement() {
        // Decrement quantity, if it is a positive number otherwise do nothing
        let currentQuantity = this.state.quantity;

        if (currentQuantity !== 0 && currentQuantity !== "") {
            this.setState({quantity: Number(currentQuantity) - 1});
        }
    }

    isValidQuantity(customerInput) {
        // only allow 0 to 99 and a blank string for possible quantity values
        const invalidChars = [" ", ".", ",", "-"];

        for (let invalidChar of invalidChars) {
            if (customerInput.indexOf(invalidChar) !== -1){
                return false;
            }
        }

        if (isNaN(customerInput)){
            return false;
        }


        if (Number(customerInput) > 99){
            return false;
        }

        return true;   
    }

    setQuantityFromUser({target}) {
        if (!this.isValidQuantity(target.value)){
            return false;
        }

        if (target.value !== ""){
            this.setState({quantity: Number(target.value)});
        } else {
            this.setState({quantity: target.value});
        }
        
    }

    async addToCart() {
        if (!this.state.quantity) {
            return;
        }

        const item = this.props.label;
        let response = await fetch(`http://localhost:8000/api/item/${item}/current-stock`)
            .then(response => {
                if (!response.ok) {
                    throw ("API call failed");
                } else {
                    return response.json();
                }
            })
            .catch(error => console.log(error));

        if (response["current_stock"] === 0) {
            alert("This item is currently out of stock");
        } else if (response["current_stock"] < this.state.quantity) {
            alert(`Not enough stock available - only ${response["current_stock"]} left of this item`);
        } else {
            this.props.addItemToCart(this.props.price, this.state.quantity, item);
            alert("In Stock!");
        }
    }


    render () { 
        return (
            <div class="main">
                <div class="details">
                    <div class="item-info">
                        <div class="label">
                            {this.props.label}
                        </div>

                        <div class="price">
                            ${this.props.price}
                        </div>
                    </div>

                    <img src={`http://localhost:8000${this.props.image_src}`}></img>
                    
                    <div class="quantity">
                        <input type="text" onChange={this.setQuantityFromUser.bind(this)} value={this.state.quantity} onPaste={(e) => e.preventDefault()}>
                        </input>

                        {/* <div class="minus" onClick={this.decrement.bind(this)}>
                            <img src={minus}/>
                        </div>

                        <div class="plus" onClick={this.increment.bind(this)}>
                            <img src={plus}/>
                        </div> */}
                        <div class="cart" onClick={this.addToCart.bind(this)}>
                            Add to Cart
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

// maps redux state to this component's props
const mapStateToProps = (state) => {
    return {cartTotal: state.cart.total};
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (price, quantity, itemName) => dispatch(
            addItemToCart({
                "price": price, 
                "quantity": quantity,
                "itemName": itemName,
            })
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);