import React, { createContext , useState, useEffect } from 'react';

import Geocode from 'react-geocode';
import { fetchProperties, fetchPropertyImage, fetchPropertyStatistics } from './property.util'

Geocode.setApiKey("AIzaSyD4PuYfksB_JR8ieyQ_2rcTzsedzzJO5h8");
Geocode.setLanguage("en");
// Enable or disable logs. Its optional.
Geocode.enableDebug();


// TODO: TEST Performance of reinstantiated javascript objects after each re-render (UseCallback/UseMemo)
export const PropertyContext = createContext({
  properties: [],
  currentAddress: "",
  foundProperty: "",
  currLat: 0,
  currLng: 0,
  getProperties: () => {},
  getPropertyImage: () => {},
  getPropertyStatistics: () => {},
  getAddressFromCoordinates: () => {},
  getCoordinatesFromAddress: () => {},
})

const PropertyProvider = ({children}) => {
  const [properties, setProperties] = useState([]);
  const [currentAddress, setCurrentAddress] = useState('');
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

  const setFoundProperty = (address, lat, lng) => {
    setCurrentAddress(address);
    setCurrLat(lat);
    setCurrLng(lng);
  }

  const getAddressFromCoordinates = () => {
    return Geocode.fromLatLng("37.786213321321", "-122.4045").then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setFoundProperty(address, '37.786213321321', '-122.4045')
      },
      error => {
        console.error(error);
      }
    );
  }

  const getCoordinatesFromAddress = () => {
    return Geocode.fromAddress("San Francisco").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setFoundProperty("San Francisco", lat, lng)
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
        currentAddress,
        currLat,
        currLng,
        getProperties,
        getPropertyImage,
        getPropertyStatistics,
        getAddressFromCoordinates,
        getCoordinatesFromAddress
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider;