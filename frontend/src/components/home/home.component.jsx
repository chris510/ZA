import React from 'react';
import './home.styles.scss';
import Search from '../search/search.component';
import GoogleMap from '../googleMap/googleMap.component';

const Home = () => {
  return (
    <div className="home">
      <GoogleMap/>
      <Search/>
    </div>
  )
}

export default Home;