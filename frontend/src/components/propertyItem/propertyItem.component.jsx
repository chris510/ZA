import React, { useContext } from 'react';
import { PropertyContext } from '../../providers/property.provider';

const PropertyItem = ({ address, lng, lat }) => {
  const { reverseGeocode, currLat, currLng } = useContext(PropertyContext);

  return (
    <div className="property-item">
      Found address: {reverseGeocode} at (Latitude: {currLat}, Longitude: {currLng} )
    </div>
  )
}

export default PropertyItem;