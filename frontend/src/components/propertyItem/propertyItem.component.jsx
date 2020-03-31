import React, { useContext } from 'react';
import { GeolocateContext } from '../../providers/geolocate/geolocate.provider';
import { Link } from 'react-router-dom'

import './propertyItem.styles.scss';

const PropertyItem = ({imageUrl}) => {
  const { currentAddress, currLat, currLng } = useContext(GeolocateContext);
  return (
    <div className="property-item">
    {/* <img className="image" src={`data:image/jpeg;base64,${imageUrl}`} /> */}
    <img className="image" src={imageUrl}/>
      {/* <img className="image" src="http://localhost:1235/display/f853874999424ad2a5b6f37af6b56610?overlay=yes&amp;building=green&amp;parcel=orange"></img> */}
      Found address: {currentAddress} at (Latitude: {currLat}, Longitude: {currLng} )
    </div>
  )
}


export default PropertyItem;
