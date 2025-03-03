import React, { createContext, useState } from 'react';
import Geocode from 'react-geocode';

// TODO: MOVE API Key into .ENV
Geocode.setApiKey("AIzaSyAvMyZR9_ng1BAktgNp2fbnjeTyJsZ43fk");
Geocode.setLanguage("en");
Geocode.enableDebug();

// Holds global data concerning search bar user input based on coordinates or address
export const GeolocateContext = createContext({
  currentAddress: "",
  currLat: 0,
  currLng: 0,
  errorMsg: ''
});

// TODO: TEST Performance of reinstantiated javascript objects after each re-render (UseCallback/UseMemo)
const GeolocateProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState('');
  const [currLat, setCurrLat] = useState(26.709723);
  const [currLng, setCurrLng] = useState(-80.064163);
  const [errorMsg, setErrorMsg] = useState('');
  const setFoundProperty = (address, lat, lng) => {
    setCurrentAddress(address);
    setCurrLat(lat);
    setCurrLng(lng);
  }

  // "37.786213321321", "-122.4045"
  const getAddressFromCoordinates = (lat, lng) => {
    return Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setFoundProperty(address, lat, lng)
      },
      error => {
        console.error(error);
        setErrorMsg('Those are invalid coordinates!');
      }
    );
  }

  const getCoordinatesFromAddress = (address) => {
    return Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setFoundProperty(address, lat, lng)
      },
      error => {
        console.error(error);
        setErrorMsg('That is an invalid address!');
      }
    );
  }
  return (
    <GeolocateContext.Provider
      value={{
        currentAddress,
        currLat,
        currLng,
        errorMsg,
        getAddressFromCoordinates,
        getCoordinatesFromAddress
      }}
    >
      { children } 
    </GeolocateContext.Provider>
  )
};

export default GeolocateProvider;