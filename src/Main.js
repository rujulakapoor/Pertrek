import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Planner from './Planner'
import Account from './Account'
import Yelp from './anotherYelpTest'
import Scheduler from './Scheduler'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/planner' component={Planner}/>
            <Route path='/account' component={Account}/>
            <Route path='/yelp' component={Yelp}/>
            <Route path='/scheduler' component={Scheduler}/>
        </Switch>
    </main>
)

export default Main