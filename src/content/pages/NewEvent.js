import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'

const NewEvent = props => {
let [location, setLocation] = useState('')
let [pic, setPic] = useState('')
let [description, setDescription] = useState('')
let [date, setDate] = useState('')
let [things, setThings] = useState('')
let [isSubmit, setIsSubmit] = useState(false)

const handleSubmit = e => {

  

    let token = localStorage.getItem('boilerToken')
    e.preventDefault()

    console.log('submit')
    fetch((process.env.REACT_APP_SERVER_URL || "https://lets-chill.herokuapp.com/") + 'events/new', {
        method: 'POST',
        body: JSON.stringify({
        location,
        pic,
        description,
        date,
        things,
        user: props.user._id
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response =>{
        response.json()
        setIsSubmit(true)
        window.location.reload(false);

      }
    )

        .catch(err => {
            console.log('ERROR SUBMITTING:', err)
          })
    }
    if (!props.user) {
      return <Redirect to="/login/" />
    }

    if (isSubmit) {
      return <Redirect to="/event" />
    }



    return (
        <div>
        <form onSubmit={handleSubmit}>
            <br/>
        <h3>Location</h3>
        <input name="location" placeholder="location goes here" onChange={e => setLocation(e.target.value)} required/>
        <br/>
        <h3>Picture Link:</h3>
        <input type="url" name="pic" placeholder="Pic link goes here" onChange={e => setPic(e.target.value)} />
        <br/>
        <h3>Description:</h3>
        <input name="description" placeholder="description goes here" onChange={e => setDescription(e.target.value)} />
        <br/>
        <h3>Things to bring:</h3>
        <textarea name="things" placeholder="list of things to bring" onChange={e => setThings(e.target.value)} />
        <br/>
        <h3>Date:</h3>
        <input name="date" placeholder="example: 1/14/20" onChange={e => setDate(e.target.value)} />
        <br/>
        <br/>
        <button type="submit">Lets make it happen</button>
      </form>

        </div>
    )
}

export default NewEvent