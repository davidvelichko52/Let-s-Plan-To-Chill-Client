import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const Event = props => {
  let [events, setEvents] = useState([])
  useEffect (() => {
    callApi()
  },[])
  const callApi = () => {
    // console.log('yooo', props.user._id);
    axios.get((process.env.REACT_APP_SERVER_URL || "https://lets-chill.herokuapp.com/") + 'events')
    .then(response => {
      let data = response.data
      console.log('here is the data', data)
      setEvents(data)
    })
    .catch(err => {
      console.log('Error!', err)
    })
  }


  // Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/login" />
  }

  

  let posters = events.map((p, index) => {
    return (
      <div key={index}>
  <Link to={`/singleEvent/${p._id}`}>
        <h1>{p.location}</h1>
  </Link>
      </div>
    )
  })


  return (
    <div>

      {posters}
      <Link to="/newEvent">make a event</Link>

    </div>
  
  )
}

export default Event
