import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-default">
        <a className="navbar-brand" href="#">Zesty.ai</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <Link className="nav-item active navbar-text" to="/">Home</Link>
            <Link className="nav-item navbar-text" to="/">My Properties</Link>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;