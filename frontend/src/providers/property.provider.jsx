import React, { createContext , useState, useEffect } from 'react';

import Geocode from 'react-geocode';
import { fetchProperties, fetchPropertyImage, fetchPropertyStatistics } from './property.util'

Geocode.setApiKey("AIzaSyD4PuYfksB_JR8ieyQ_2rcTzsedzzJO5h8");
Geocode.setLanguage("en");
// Enable or disable logs. Its optional.
Geocode.enableDebug();

export const PropertyContext = createContext({
  properties: [],
  reverseGeocode: "",
  foundProperty: "",
  currLat: 0,
  currLng: 0,
  getProperties: () => {},
  getPropertyImage: () => {},
  getPropertyStatistics: () => {},
  getAddressFromCoordinates: () => {}
  
})

const PropertyProvider = ({children}) => {
  const [properties, setProperties] = useState([]);
  const [reverseGeocode, setReverseGeocode] = useState('');
  const [currLat, setCurrLat] = useState(0);
  const [currLng, setCurrLng] = useState(0);

  const getProperties = (lng, lat, radius) => {
    fetchProperties();
  }

  const getPropertyImage = () => {
    return fetchPropertyImage();
  }

  const getPropertyStatistics = () => {
    return getPropertyStatistics();
  }

  const getAddressFromCoordinates = () => {
    return Geocode.fromLatLng("37.786213321321", "-122.4045").then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setReverseGeocode(address);
        setCurrLat('37.786213321321');
        setCurrLng('-122.4045');
      },
      error => {
        console.error(error);
      }
    );
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        reverseGeocode,
        currLat,
        currLng,
        getProperties,
        getPropertyImage,
        getPropertyStatistics,
        getAddressFromCoordinates
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider;