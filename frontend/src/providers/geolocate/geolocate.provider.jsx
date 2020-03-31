import React, { createContext, useState } from 'react';
import Geocode from 'react-geocode';
// TODO: MOVE API Key into .ENV
Geocode.setApiKey("AIzaSyD4PuYfksB_JR8ieyQ_2rcTzsedzzJO5h8");
Geocode.setLanguage("en");
// Enable or disable logs. Its optiona
Geocode.enableDebug();

export const GeolocateContext = createContext({
  currentAddress: "",
  currLat: 0,
  currLng: 0,
});

const GeolocateProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [currLat, setCurrLat] = useState(0);
  const [currLng, setCurrLng] = useState(0);

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
    <GeolocateContext.Provider
      value={{
        currentAddress,
        currLat,
        currLng,
        getAddressFromCoordinates,
        getCoordinatesFromAddress
      }}
    >
      { children } 
    </GeolocateContext.Provider>
  )
};

export default GeolocateProvider;