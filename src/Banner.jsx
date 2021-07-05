import React, {Component} from 'react'
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
                    </div>
                </div>

                <Switch>
                    <Route path="/Groceries">
                        <Grid item_type="FO"/>
                    </Route>

                    <Route path="/Household">
                        <Grid item_type="HI"/>
                    </Route>

                    <Route path="/Office Supplies">
                        <Grid item_type="FO"/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Banner;