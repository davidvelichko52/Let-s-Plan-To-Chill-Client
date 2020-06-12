import React, { useEffect, useState }  from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

const SingleEvent = props => {
 
    let [events, setEvents] = useState([])
    useEffect (() => {
      callApi()
    },[])
    const callApi = () => {
      // console.log('yooo', props.user._id);
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

    
// fix later
    // if (!props.user) {
    //     return <Redirect to="/login" />
    //   }


  let posters = events.map((p, index) => {
    return (
      <div>
        <h1>{p.date}</h1>
        <h1>{p.location}</h1>
        <img src={p.pic} alt="picture of location"/>
        <h2>{p.description}</h2>
        <h2>{p.things}</h2>
  
      </div>
    )
  })

  return (
    <div>

      {posters}
      

    </div>
  )
}

export default SingleEvent