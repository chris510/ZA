import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import './googleMap.styles.scss';
import { fetchProperties } from '../../providers/property/property.util';
import { GeolocateContext } from '../../providers/geolocate/geolocate.provider';

import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAvMyZR9_ng1BAktgNp2fbnjeTyJsZ43fk");
Geocode.enableDebug()

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
  static contextType = GeolocateContext;
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentPosition: {
        // West Palm Beach
        lat: 	27.4467056,
        lng: -80.3256056
      },
      address: '',
      city: '',
      state: '',
      zoom: 8,
      properties: [],
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.setCurrentPosition = this.setCurrentPosition.bind(this);
    this.getCity = this.getCity.bind(this);
    this.getArea = this.getArea.bind(this);
    this.getState = this.getState.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
  }
  
  componentDidMount() {
    this.setCurrentPosition();
    fetchProperties().then(res => this.setState({
      properties: res.data
    }))
  }

  shouldComponentUpdate(_, nextState){
    if (
     this.state.address !== nextState.address ||
     this.state.city !== nextState.city ||
     this.state.area !== nextState.area ||
     this.state.state !== nextState.state
    ) {
      return true;
    } else {
      return false;
    }
   }

  //Retrieves information from initial geolocation;
  setCurrentPosition() {
    Geocode.fromLatLng(this.state.currentPosition.lat , this.state.currentPosition.lng).then(
      response => {
        const address = response.results[0].formatted_address,
              addressArray = response.results[0].address_components,
              city = this.getCity(addressArray),
              area = this.getArea(addressArray ),
              state = this.getState(addressArray);
     
      this.setState( {
        address: (address) ? address : '',
        area: (area) ? area : '',
        city: (city) ? city : '',
        state: (state) ? state : '',
       } )
      },
      error => {
       console.error(error);
      }
    );
  }

  //Get the city name and set state value
  getCity(addressArray) {
    let city = '';
    for( let i = 0; i < addressArray.length; i++ ) {
      if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
        city = addressArray[ i ].long_name;
        return city;
      }
    }
  }
  // Get area name and set state value
  getArea(addressArray) {
    let area = '';
    for( let i = 0; i < addressArray.length; i++ ) {
      if ( addressArray[ i ].types[0]  ) {
        for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
          if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
            area = addressArray[ i ].long_name;
            return area;
          }
        }
      }
    }
  }

  // Get state name and set state value
  getState(addressArray) {
    let state = '';
    for( let i = 0; i < addressArray.length; i++ ) {
      for( let i = 0; i < addressArray.length; i++ ) {
        if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
          state = addressArray[ i ].long_name;
          return state;
        }
      }
    }
  }

  // Retrieves Map Search box information and set state values 
  onPlaceSelected = ( place ) => {
		const address = place.formatted_address,
		      addressArray =  place.address_components,
		      city = this.getCity(addressArray),
		      area = this.getArea(addressArray),
		      state = this.getState(addressArray),
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		this.setState({
			address: (address) ? address : '',
			area: (area) ? area : '',
			city: (city) ? city : '',
			state: (state) ? state : '',
			currentPosition: {
				lat: latValue,
				lng: lngValue
      },
    })
	};

  // Sets the current map to current marker 
  onMarkerClick(props, marker, e) {
    console.log('click');
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log(this.state);
  }

  // Closes info window
  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }

  // Removes the currently showing marker window from view
  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  }

  render() {
    const { currentPosition, zoom, selectedPlace, properties, address} = this.state;
    const { lat, lng } = currentPosition;
    return (
      <div className="google-map">
        <Map
          google={this.props.google}
          onClick={this.onMapClick}
          style={{width: '50%', height: '500px', position: 'absolute', top: '50px'}}
          center={{lng: lng, lat: lat}}
          zoom={zoom}
        >
        {properties.map((property, i) => ( 
          <Marker
            key={i}
            position={{ lng: property.coordinates[0], lat: property.coordinates[1]}}
            onClick={this.onMarkerClick}
            name={property.propertyId}
          />
        ))}
        <Marker
          name="You are here"
          position={{ lng: lng, lat: lat }}
          onClick={this.onMarkerClick}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}
        >
          <div className="map-info-window">
            <h3>{address}</h3>
            { selectedPlace.name ? <h3>{selectedPlace.name} </h3> : null }
          </div>
        </InfoWindow>
        </Map>
        <Autocomplete
          style={{
            width: '50%',
            height: '40px',
            position: 'absolute',
            paddingLeft: '16px',
            marginTop: '2px',
            marginBottom: '500px'
          }}
          onPlaceSelected={ this.onPlaceSelected }
          types={['(regions)']}
        />
      </div>
    )
  }
}

//TODO: Put in ENV
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDvTfgu4gVMrcF7Sfb8NKVOYU_MMaonqWA'
})(GoogleMap)

// export default GoogleMap;