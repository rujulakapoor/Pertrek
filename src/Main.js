import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Planner from './Planner'
import Account from './Account'
import Forgot from './Forgot'
import ItineraryForm from './ItineraryForm'
import Scheduler from './Scheduler'
import Saved from './SavedPage'
import Favorites from './Favorites.js'
import Rip from './rip.js'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/planner' component={Planner}/>
            <Route path='/account' component={Account}/>
            <Route path='/forgot' component={Forgot}/>
            <Route path='/itform' component={ItineraryForm}/>
            <Route path='/scheduler' component={Scheduler}/>
            <Route path='/savedpage' component={Saved}/>
            <Route path='/favorites' component={Favorites}/>
            <Route path='/rip' component={Rip}/>
        </Switch>
    </main>
)

export default Main
