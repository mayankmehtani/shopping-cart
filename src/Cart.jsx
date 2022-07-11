import React, {Component} from 'react'
import {connect} from 'react-redux'
// import Card from './Card.jsx'
import './Cart.css'
import _ from 'lodash'

class Cart extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            itemInfo: [],
        }
    }

    render() {
        return (
            <div id="cart-container">
                <table>
                    {_.size(this.props.cartItems) ?
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
                        : null
                    }


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

                <button onClick={() => console.log("Order Submitted")}>
                    Submit Order
                </button>
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addItemToCart: (price, quantity) => dispatch(
//             addItemToCart({"price" :price, "quantity": quantity})
//         ),
//     }
// }

export default connect(mapStateToProps)(Cart);