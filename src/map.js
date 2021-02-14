import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './styles/main.scss';
// Imported Local JSON Data
import MapData from './data.json'

const Marker = ({ text }) => <div className={styles.marker}>{text}</div>;

const places = MapData;

let [...rest] = places;

let mapMarkers = [];

rest.forEach((place) => {
    let {Coordinates, ...rest} = place
    mapMarkers.push({
        // Coordinates, rest
        // cords: place.Coordinates.split('POINT').pop().split('(').pop().split(')').shift().split(' '),
        // price: place["Price/m^2"],
        // type: place.BuildingType,
        // parking: place.Parking
        cords:Coordinates.split('POINT').pop().split('(').pop().split(')').shift().split(' '), rest
    })
})
console.log(mapMarkers);
rest = rest[0].Coordinates.split('POINT').pop().split('(').pop().split(')').shift().split(' ')


const coordinates = places.map((place) => {
    // Removed "POINT", ("(") and (")") from the json data. used chain method to join multiple logics
    let cords = place.Coordinates.split('POINT').pop().split('(').pop().split(')').shift().split(' ');
    return cords
})
// console.log(coordinates);

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 47.3836514,
      lng: 8.5482374
    },
    zoom: 13
  };
/**<Marker
                        lat={47.3836514}
                        lng={8.5482374}
                        text="My Marker"
                    />**/
  render() {
    return (
        <Fragment>
            <div style={{ height: '80vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAuOXhl7_BjeaV30YlT3I9OH6oW9DkYdlA' }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                >
                    {mapMarkers.map((mark, index) => <Marker lat={mark.cords[0]} lng={mark.cords[1]} text={index} tooltip={mark.rest.BuildingType}  />)}
                    
                </GoogleMapReact>
            </div>
      </Fragment>
    );
  }
}

export default Map;