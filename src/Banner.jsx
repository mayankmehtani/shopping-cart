import React, {Component} from 'react'
import './Banner.css'
import etsyLogo from './assets/etsy.png'

class Banner extends Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <img src={etsyLogo}/>
                </div>

                <div className="sections">
                    <div className="category">
                        Groceries
                    </div>

                    <div className="category">
                        Vegetables
                    </div>

                    <div className="category">
                        Drink
                    </div>

                    <div className="category">
                        Meat, Fish
                    </div>

                    <div className="category">
                        Dairy
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner;