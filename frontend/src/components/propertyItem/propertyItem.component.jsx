import React from 'react';

const PropertyItem = ({ imageUrl, lng, lat }) => {
  return (
    <div className="property-item">
      THIS IS THE PROPERTY ITEMS
      <img src={imageUrl}></img>
      {lng}
      {lat}
    </div>
  )
}

export default PropertyItem;