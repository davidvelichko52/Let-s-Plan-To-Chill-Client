import React from 'react'
import { Link } from 'react-router-dom'

const Nav = props => {
  const handleLogout = e => {
    e.preventDefault()
    // Update the state of the App
    props.updateToken()
  }

  let links = (
    <span>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </span>
  )

  // If the user is logged in, show profile page and logout links
  if (props.user) {
    links = (
      <span>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/event">Events</Link>
        </li>
        <li>
          <a href="/login" onClick={handleLogout}>Logout</a>
        </li>
      </span>
    )
  }

  return (
    <nav>
      <ul>
        {links}
      </ul>
    </nav>
  )
}

export default Nav
