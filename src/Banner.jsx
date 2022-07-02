import React, {Component} from 'react'
import {connect} from 'react-redux'
import Grid from './Grid.jsx'
import './Banner.css'
import etsyLogo from './assets/etsy.png'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch
} from "react-router-dom"

class Banner extends Component {
    render() {
        return (
            <Router>
                <div className="header">
                    <div className="logo">
                        <img src={etsyLogo}/>
                    </div>

                    <div className="sections">
                        <Link to="/Groceries" exact className="category">
                            Groceries
                        </Link>

                        <Link to="/Household" exact className="category">
                            Household
                        </Link>

                        <Link to="/Office" className="category">
                            Office
                        </Link>

                        <Link to="/Cart">
                            Cart: ${this.props.cartTotal}
                        </Link>
                    </div>
                </div>

                <Switch>
                    <Route path="/Groceries">
                        <Grid itemCategory={"FO"} />
                    </Route>

                    <Route path="/Household">
                        <Grid itemCategory={"HI"} />
                    </Route>

                    <Route path="/Office">
                        <Grid itemCategory={"OS"} />
                    </Route>

                    <Route path="/Cart">
                    </Route>
                </Switch>
            </Router>
        )
    }
}

// maps redux state to this component's props
const mapStateToProps = (state) => {
    return {cartTotal: state.cart.total};
}

export default connect(mapStateToProps)(Banner);