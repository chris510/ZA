import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

import './addressSearchInput.styles.scss';

const AddressSearchInput = ({ address, setAddress}) => {
  //Limit suggestions to show only cities in United States
  const searchOptions = {
    types: ['(cities)'],
    componentRestrictions: {country: "us"}
  }

  const handleChange = (address) => {
    setAddress(address);
  }

  // Autopopulates city search query
  const renderInput = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
    <div className="autocomplete-root">
    <input className="form-control" {...getInputProps()} />
    <div className="autocomplete-dropdown-container">
      {suggestions.map(suggestion => (
        <div {...getSuggestionItemProps(suggestion)} className="suggestion">
          <span>{suggestion.description}</span>
        </div>
      ))}
    </div>
  </div>
  )

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      searchOptions={searchOptions}
    >
    {renderInput}
    </PlacesAutocomplete>
  )
}

export default AddressSearchInput