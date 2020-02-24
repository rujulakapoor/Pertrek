import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Planner from './Planner'
import Account from './Account'
import Yelp from './anotherYelpTest'
import YelpAgain from './yelptestagain'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/planner' component={Planner}/>
            <Route path='/account' component={Account}/>
            <Route path='/yelp' component={Yelp}/>
            <Route path='/fuck' component={YelpAgain}/>
        </Switch>
    </main>
)

export default Main