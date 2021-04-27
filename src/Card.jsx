import React, {Component} from 'react'
import tomato from './assets/tomato.jpg'
import plus from './assets/plus.svg'
import minus from './assets/minus.svg'

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {quantity: 0};
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
    render () { 
        return (
            <div>
                <div class="details">
                    <img src={tomato}/>

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
            </div>
        )
    }
}

export default Card;