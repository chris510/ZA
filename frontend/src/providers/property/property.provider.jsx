import React, { createContext , useState } from 'react';
import { fetchProperties, fetchPropertyImage, fetchPropertyStatistics } from './property.util'

// TODO: TEST Performance of reinstantiated javascript objects after each re-render (UseCallback/UseMemo)
export const PropertyContext = createContext({
  properties: [],
  foundProperty: "",
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
        getPropertyStatistics,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider;