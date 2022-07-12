import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Cart.css'
import {clearCart} from '../../features/cartSlice'
import _ from 'lodash'

class Cart extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            itemInfo: [],
        }
    }

    submitOrder = async () => {
        await fetch("http://localhost:8000/api/order/", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.props.cartItems),
        }).then(response => {
            if (!response.ok) {
                throw Error("API call failed");
            } else {
                return response.json();
            }
        })
        .catch(error => console.log(`Error is ${error}`));

        this.props.clearCart();
        alert("Order successfully placed!");
    }

    render() {
        return (
            <div>
                {_.size(this.props.cartItems) ?
                <div id="cart-container">
                    <table>
                        <tr>
                            <th>
                                Item
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Quantity
                            </th>

                            <th/>
                        </tr>
                            
                        {Object.entries(this.props.cartItems).map((a) => 
                        <tr>
                            <td class="item-name">
                                {a[0]}
                            </td>
        
                            <td>
                                ${a[1].price}
                            </td>
        
                            <td>
                                {a[1].quantity}
                            </td>
        
                            <td>
                                ${Number(a[1].price)*Number(a[1].quantity)}
                            </td>
                        </tr>
                        )}

                        <tr id="order-total">
                            <td>
                                Total
                            </td>
                            <td/>
                            <td/>
                            <td>
                                ${this.props.cartTotal}
                            </td>
                        </tr>
                    </table>

                    <button onClick={this.submitOrder}>
                        Submit Order
                    </button>
                    
                </div>
                : 
                <div id="empty-cart-msg">
                    <strong>Looks like your cart is empty!</strong>
                </div>
                }
            </div>
        )
    }
}

// maps redux state to this component's props
const mapStateToProps = (state) => {
    return {
        cartTotal: state.cart.total,
        cartItems: state.cart.items,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(clearCart({'type': 'CLEARCART'})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);