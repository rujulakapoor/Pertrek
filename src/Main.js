import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Planner from './Planner'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/planner' component={Planner}/>
        </Switch>
    </main>
)

export default Main