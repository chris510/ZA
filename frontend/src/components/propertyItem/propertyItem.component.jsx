import React, { useContext } from 'react';
import { GeolocateContext } from '../../providers/geolocate/geolocate.provider';

const PropertyItem = () => {
  const { currentAddress, currLat, currLng } = useContext(GeolocateContext);

  return (
    <div className="property-item">
      Found address: {currentAddress} at (Latitude: {currLat}, Longitude: {currLng} )
    </div>
  )
}

export default PropertyItem;