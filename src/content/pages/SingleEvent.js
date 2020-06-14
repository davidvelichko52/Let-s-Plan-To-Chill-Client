import React, { useEffect, useState }  from 'react';


const SingleEvent = props => {
    let [chat, setChat] = useState('')
    let [event, setEvent] = useState({})
    let [showChat, setShowChat] = useState(<p></p>)

    useEffect(() => {
        let token = localStorage.getItem('boilerToken')
        fetch(process.env.REACT_APP_SERVER_URL + 'events/singleEvent/' + props.id, {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(result => { 
          setEvent(result)
          setShowChat(result.chats.map((p) => {
            return (
            <div>
            <h3>{p.content}</h3>
            <hr/>
            </div>
            )
          }))
        })
        
        
      }, [])

    const handleSubmit = e => {
        let token = localStorage.getItem('boilerToken')
        e.preventDefault()
      
       console.log('submit:', chat)
        fetch(process.env.REACT_APP_SERVER_URL + 'events/singleEvent/' + props.id, {
            method: 'POST',
            body: JSON.stringify({
             content: chat
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          
            .catch(err => {
                console.log('ERROR SUBMITTING:', err)
              })
              window.location.reload(false);
        }

console.log('heres', event)
        


  return (
      <div>
    <div>
        <h2>{event.location}</h2>
        {showChat}
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" rows="5" cols="18" placeholder="chat" onChange={e => setChat(e.target.value)}/>
        </div>
        <br />
        <button type="submit">Comment!</button>
      </form>
    </div>
    </div>
  )
}

export default SingleEvent