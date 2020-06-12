// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom componentd

import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Event from './pages/Event'
import NewEvent from './pages/NewEvent'
import SingleEvent from './pages/SingleEvent'

const Content = props => {


  return (
    <div className="container">
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} />
      } />

      <Route path="/event" render={
        () => <Event user={props.user} />
      } />

      <Route path="/signup" render={
        () => <Signup user={props.user} updateToken={props.updateToken} />
      } />

            <Route path="/newEvent" render={
        () => <NewEvent user={props.user} />
      } />
      <Route exact path="/singleEvent/:id" render={
        (props) => <div><SingleEvent id={props.match.params.id} user={props.user} /></div>
      } />
    </div>
  )
}

export default Content
