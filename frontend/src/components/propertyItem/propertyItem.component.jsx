import React, { useContext } from 'react';
import { GeolocateContext } from '../../providers/geolocate/geolocate.provider';
import { Link } from 'react-router-dom'

import './propertyItem.styles.scss';
import { PropertyContext } from '../../providers/property/property.provider';

const PropertyItem = ({imageUrl}) => {
  const { currentAddress, currLat, currLng } = useContext(GeolocateContext);
  const { propertyImg } = useContext(PropertyContext);
  return (
    <div className="property-item">
      <h3>Current Search Results</h3>
      <img className="image" src={propertyImg}/>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col xs-6">Latitude</th>
            <th scope="col xs-6">Longitude</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row xs-6">{currLat}</th>
            <th scope="row xs-6">{currLng}</th>
          </tr>
        </tbody>
      </table>
    </div>
    // <div className="property-item">
    // {/* <img className="image" src={`data:image/jpeg;base64,${imageUrl}`} /> */}
    // <img className="image" src={propertyImg}/>
    //   {/* <img className="image" src="http://localhost:1235/display/f853874999424ad2a5b6f37af6b56610?overlay=yes&amp;building=green&amp;parcel=orange"></img> */}
    //   Found address: {currentAddress} at (Latitude: {currLat}, Longitude: {currLng} )
    // </div>
  )
}


export default PropertyItem;
