import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import './googleMap.styles.scss';
import { fetchProperties } from '../../providers/property/property.util';

// const testCoordinates = [
//   { lng: -73.748751,
//     lat: 40.9185483
//   },
//   {
//     lng: -80.0823457, 
//     lat: 26.3248412
//   },
//   {
//     lng: -80.0782213, 
//     lat: 26.8849731
//   },
//   {
//     lng: -80.0737722, 
//     lat: 26.3868054
//   }
// ]

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentPosition: {
        lng: -80.0782213,
        lat: 26.8849731
      },
      zoom: 14,
      properties: [],
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  
  componentDidMount() {
    fetchProperties().then(res => this.setState({
      properties: res.data
    })).then(res => console.log(this.state))
    console.log(this.state);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  }

  render() {
    const { currentPosition, zoom, selectedPlace } = this.state;
    const { lat, lng } = currentPosition;
    return (
      <div className="google-map">
        <Map
          google={this.props.google}
          onClick={this.onMapClick}
          style={{width: '500px', height: '500px'}}
          initialCenter={{lng: lng, lat: lat}}
          zoom={zoom}
        >
        {/* {this.state.properties.map((property, i) => (
          <Marker
            key={i}
            onClick={this.onMarkerClick}
            name={property.propertyId}
            position={{ lat: property.coordinates[0], lng: property.coordinates[1]}}
          />
        ))} */}
        <Marker
          name="test"
          position={{ lng: lng, lat: lat }}
          onClick={this.onMarkerClick}
        />
         {/* <Marker
          name="otherone"
          position={{ lng: -80.0823457, lat: 26.8849731 }}
          onClick={this.onMarkerClick}
        /> */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          // onClose={this.onClose}
        >
          <div className="map-info-window">
            <h1>{selectedPlace.name}</h1>
          </div>
        </InfoWindow>
        </Map>
      </div>
    )
  }
}

//TODO: Put in ENV
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDvTfgu4gVMrcF7Sfb8NKVOYU_MMaonqWA'
})(GoogleMap)

// export default GoogleMap;