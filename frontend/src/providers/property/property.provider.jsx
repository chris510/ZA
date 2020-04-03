import React, { createContext , useState } from 'react';
import { fetchProperties, fetchPropertyImage, fetchPropertyStatistics } from './property.util'

// TODO: TEST Performance of reinstantiated javascript objects after each re-render (UseCallback/UseMemo)
export const PropertyContext = createContext({
  properties: [],
  propertyImg: '',
  foundProperty: "",
  getProperties: () => {},
  getPropertyImage: () => {},
  getPropertyStatistics: () => {},
})

const PropertyProvider = ({children}) => {
  const [properties, setProperties] = useState([]);
  const [propertyImg, setPropertyImg] = useState('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80');

  const getProperties = (lng, lat, radius) => {
    fetchProperties();
  }

  const getPropertyImage = () => {
    return fetchPropertyImage().then(res => {
      setPropertyImg(res);
    });
  }

  const getPropertyStatistics = () => {
    return getPropertyStatistics();
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        getProperties,
        propertyImg,
        getPropertyImage,
        getPropertyStatistics,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export default PropertyProvider;