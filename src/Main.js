import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Planner from './Planner'
import Account from './Account'
import Forgot from './Forgot'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/planner' component={Planner}/>
            <Route path='/account' component={Account}/>
            <Route path='/forgot' component={Forgot}/>
        </Switch>
    </main>
)

export default Main