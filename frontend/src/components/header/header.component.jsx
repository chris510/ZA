import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-default">
        <a className="navbar-brand" href="#">Zesty.ai</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link className="nav-item nav-item navbar-text nav-link" to="/">Home</Link>
            <Link className="nav-item navbar-text" to="/property-list">My Properties</Link>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;