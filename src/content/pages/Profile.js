import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'

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

  let events = props.events.map((e) => {
    if (e.user === props.user._id) {
    return (

 <div id="eventname">
   <h1>{e.location}</h1>
   <button class="edit" onClick={() => {
      handleDelete(e._id)

    }}><p>Delete</p></button>
    <Link to={`/edit/${e._id}`}><button class="edit" onClick={(e) => props.handleCurrentEvent(e, e._id)} ><p>Edit</p></button></Link>
  </div>
    )
  }
  })

  return (
    <div>
      <img id="profilepicture" src={props.user.pic} alt={props.user.firstname} />
      <h1>
        {props.user.firstname}
      </h1>
      <h2 id="eventname">List of events:</h2>
      {events}
    </div>
  )
}

export default Profile
