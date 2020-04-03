import React from 'react';
import './propertyDetail.styles.scss';
import { fetchPropertyImage, fetchPropertyStatistics } from '../../providers/property/property.util';

class PropertyDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: '',
      totalArea: [],
      totalBuildingArea: 0,
      zoneDensity: [],
      buildingDis: [],
    }
    // this.renderBuildingsAroundProperty = this.renderBuildingsAroundProperty.bind(this);
  }

  componentDidMount() {
    fetchPropertyImage().then(res => this.setState({
      imageUrl: res.data
    }));
    fetchPropertyStatistics().then(res => this.setState({
      totalArea: res.data.building_area_sqm,
      totalBuildingArea: res.data.parcel_area_sqm,
      zoneDensity: res.data.zone_density,
      buildingDis: res.data.building_distances_m,
    })).then(res => console.log(this.state));
  }

  // renderBuildingsAroundProperty() {
  //   const { totalArea, buildingDist } = this.state; 
  //   console.log('hello')
  //   const len = totalArea.length;
  //   console.log(totalArea, buildingDist)
  //   for (let i = 0; i < len - 1; i++) {
  //     console.log(totalArea[i], buildingDist[i]);
  //     // return (
  //     //   <li class="list-group-item">Building {i + 1}: {totalArea[i]}: {buildingDist[i]}sqm from property </li>
  //     // )
  //   }
  // }


  render() {
    const { imageUrl, totalArea, totalBuildingArea, zoneDensity, buildingDis} = this.state;
    return (
      <div className="property-detail">
        <img src={imageUrl}></img>
        <div className="property-detail">
          <table className="table table-striped">
            <thead>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Total Area</th>
                <td>{totalArea}</td>
              </tr>
              <tr>
                <th scope="row">Building Distance</th>
                <td>{buildingDis}</td>
              </tr>
              <tr>
                <th scope="row">Total Building Area</th>
                <td>{totalBuildingArea}</td>
              </tr>
              <tr>
                <th scope="row">Zone Density</th>
                <td>{zoneDensity}</td>
              </tr>
              <tr>
                <th scope="row">Latitude</th>
                <td>DATA</td>
              </tr>
              <tr>
                <th scope="row">Longitude</th>
                <td>DATA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default PropertyDetail;