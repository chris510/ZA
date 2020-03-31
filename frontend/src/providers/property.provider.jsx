import React, { createContext , useState, useEffect } from 'react';

import { fetchProperties, fetchPropertyImage, fetchPropertyStatistics } from './property.util';

export const PropertyContext = createContext({
  properties: [],
  getProperties: () => {},
  getPropertyImage: () => {},
  getPropertyStatistics: () => {},
})

const PropertyProvider = ({children}) => {
  const [properties, setProperties] = useState([]);

  const getProperties = (lng, lat, radius) => {
    fetchProperties();
  }

  const getPropertyImage = () => {
    return fetchPropertyImage();
  }

  const getPropertyStatistics = () => {
    return getPropertyStatistics();
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getProperties,
        getPropertyImage,
        getPropertyStatistics
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider;