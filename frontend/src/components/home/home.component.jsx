import React from 'react';
import './home.styles.scss';
import Search from '../search/search.component';
import GoogleMap from '../googleMap/googleMap.component';
import PropertyItem from '../propertyItem/propertyItem.component';

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col">
            <Search/> 
          </div>
        </div>
        <div className="col">
          <GoogleMap/>  
        </div>
        <div className="row">
        </div>
      </div>
    </div>
  )
}

export default Home;