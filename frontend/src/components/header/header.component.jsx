import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="this is the header">
      <Link to="/">Home</Link>
      <Link to="/">My Properties</Link>
    </div>
  )
}

export default Header;