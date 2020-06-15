import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'


// Custom componentd

import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Event from './pages/Event'
import NewEvent from './pages/NewEvent'
import SingleEvent from './pages/SingleEvent'
import Edit from './pages/Edit'


const Content = props => {
  let [events, setEvents] = useState([])
  let [currentEvent, setCurrentEvent] = useState('')


  useEffect (() => {
callApi()

  },[])

  const callApi = () => {
  axios.get(process.env.REACT_APP_SERVER_URL + 'events')
.then(response => {
  let data = response.data
  console.log('here is the data', data)
  setEvents(data)
})
.catch(err => {
  console.log('Error!', err)
  })
}

const handleCurrentEvent = (e, event) => {
  console.log('reseting the current post for editing to', event);
  setCurrentEvent(event)
}

  return (
    <div className="container">
      <Route path="/login" render={
        () => <Login user={props.user} updateToken={props.updateToken} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} events={events} handleCurrentEvent={handleCurrentEvent} />
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
      <Route path="/edit" render={
        () => <Edit user={props.user} event={currentEvent} />
      } />
    </div>
  )
}

export default Content
