import React, {Component} from 'react'

class Card extends Component {
    render () { 
        return (
            <div>
                <img src={this.props.img}/>

                <div>
                    {this.props.label}
                </div>

                <div>
                    {this.props.price}
                </div>
            </div>
        )
    }
}

export default Card;