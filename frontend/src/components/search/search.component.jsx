import React, { useState, useEffect, useContext } from 'react';

import './search.styles.scss'
import { PropertyContext } from '../../providers/property.provider';

import PropertyItem from '../propertyItem/propertyItem.component';

const Search = () => {
  const { getAddressFromCoordinates, foundAddress } = useContext(PropertyContext);
  
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [rad, setRad] = useState(10000);
  const [address, setAddress] = useState('');
  const [searchMode, setSearchMode] = useState(true);
  const [searchName, setSearchName] = useState('Coordinates');
  // const [propertyImageUrl, setPropertyImageUrl] = useState('');
  const [foundProperty, setFoundProperty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // getPropertyImage().then(res => {
    //   setPropertyImageUrl(res.data);
    //   setFoundProperty(true);
    // });
    if (!searchMode) {
      console.log(getAddressFromCoordinates())
      setFoundProperty(true);
    } else {
      console.log('Retrieve image from address')
      setFoundProperty(true);
    }
  }

  const handleInputChange = (e) => {
    const { value, name } = e.target
    if (name === 'lng') {
      setLng(value);
    } else if (name ==="lat") {
      setLat(value);
    } else if (name === "rad") {
      setRad(value);
    } else {
      setAddress(value);
    }
  }

  const handleSearchModeChange = () => {
    if (searchMode) {
      setSearchMode(false);
      setSearchName('Address');
    } else {
      setSearchMode(true);
      setSearchName('Coordinates');
    }
  }

  //Gives user search option based on address or coordinates
  const renderSearchParameters = () => {
    if (searchMode) {
      return (
        <div className="search-inputs">
          <div className="form-group">
            <label>Address</label>
            <input 
              className="form-control"
              type="text"
              placeholder="Address"
              name="add"
              value={address}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="search-inputs">
          <div className="form-group">
            <label>Latitude</label>
            <input
              className="form-control"
              type="number"
              placeholder="Latitude"
              name="lat"
              value={lat}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input 
              className="form-control"
              type="number"
              placeholder="Longitude"
              name="lng"
              value={lng}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Radius</label>
            <input
              className="form-control"
              type="number"
              placeholder={rad}
              name="Radius"
              value={rad}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="search">
      <form className="form-group" onSubmit={handleSubmit}>
        {renderSearchParameters()}
        <button type="button" onClick={handleSearchModeChange} className="btn btn-info mb-2">
          Switch to {searchName}
        </button>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {
        foundProperty ?
        <PropertyItem
          address={foundAddress}
          lng={lng}
          lat={lat}
        />
      : null
      }
    </div>
  )
}

export default Search;