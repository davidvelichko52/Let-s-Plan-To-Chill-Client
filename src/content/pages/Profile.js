import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
const Profile = props => {
  let [secretMessage, setSecretMessage] = useState('')
  let token = localStorage.getItem('boilerToken')


  useEffect(() => {
    // Get the token from local storage


    // Make a call to a protected route
    fetch((process.env.REACT_APP_SERVER_URL || "https://lets-chill.herokuapp.com/") + 'profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Response', response)

      // Make sure we got a good response
      if (!response.ok) {
        setSecretMessage('Nice try!')
        return
      }

      // We did get a good response
      response.json()
      .then(result => {
        console.log(result)
        setSecretMessage(result.message)
      })
    })
    .catch(err => {
      console.log(err)
      setSecretMessage('No message for you!')
    })
  })

  const handleDelete = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL + "events/" + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.status === 204 ? {} : response.json())
    .then(() => {
      console.log('Successful DELETE!')
      window.location.reload(false);
    })
  }
  


  // Make sure there is a user before trying to show their info
  if (!props.user) {
    return <Redirect to="/login" />
  }

  let events = props.events.map((p) => {
    if (p.user === props.user._id) {
    return (

 <div id="eventname">
   <h3>{p.location}</h3>
   <Button class="edit" onClick={() => {
      handleDelete(p._id)

    }}>Delete</Button>
    <Link to={`/edit/${p._id}`}><Button class="edit" onClick={(e) => props.handleCurrentEvent(e, p._id)} >Edit</Button></Link>
    
  </div>
    )
  }
  })

  return (
    <div>
      <img id="profilepicture" src={props.user.pic} alt={props.user.firstname} />
      <h1 id="proname">
        {props.user.firstname}
      </h1>
      <h2 id="eventname">List of events:</h2>
      {events}
    </div>
  )
}

export default Profile
