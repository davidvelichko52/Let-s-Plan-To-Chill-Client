import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Edit = props => {
let [location, setLocation] = useState('')
let [pic, setPic] = useState('')
let [description, setDescription] = useState('')
let [date, setDate] = useState('')
let [things, setThings] = useState('')
let [isSubmit, setIsSubmit] = useState(false)



const handleUpdate = e => {
    let token = localStorage.getItem('boilerToken')
    e.preventDefault()
console.log("ere", props.event)
    fetch(process.env.REACT_APP_SERVER_URL + 'events/edit/' + props.event, {
        method: 'PUT',
        body: JSON.stringify({
        location,
        pic,
        description,
        date,
        things
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        //console.log('looking at response.json', response.json());
       
        setLocation('')
        setPic('')
        setDescription('')
        setDate('')
        setThings('')
        setIsSubmit(true)
        window.location.reload(false);

    })
    }


    if (isSubmit) {
      return <Redirect to="/profile" />
    }
  


  return (
    <div>
     <p>Editing the event {props.currentEvent}</p>

      <form onSubmit={handleUpdate}>
      <h3>Location</h3>
        <input name="location" placeholder="location goes here"  onChange={e => setLocation(e.target.value)} required/>
        <br/>
        <h3>Picture Link:</h3>
        <input type="url" name="pic" placeholder="Pic link goes here" onChange={e => setPic(e.target.value)}/>
        <br/>
        <h3>Description:</h3>
        <input name="description" placeholder="description goes here" onChange={e => setDescription(e.target.value)}/>
        <br/>
        <h3>Things to bring:</h3>
        <textarea name="things" placeholder="list of things to bring" onChange={e => setThings(e.target.value)}/>
        <br/>
        <h3>Date:</h3>
        <input name="date" placeholder="example: 1/14/20" onChange={e => setDate(e.target.value)}/>
        <br/>


        <button type="submit">Update event!</button>
      </form>
    </div>

  )
}
export default Edit

