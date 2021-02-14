import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './styles/main.scss';

// Imported Local JSON Data
import MapData from './data.json'

const Marker = ({ text, tooltip, parking, price, $hover }) => {
    const showDetails = () => {
        console.log(`You clicked on ${tooltip}`);
        // markerTooltip.className += 'active'
    };

    return ( 
        <div className={$hover ? styles.marker +' '+ styles.markerHover : styles.marker} onClick={showDetails}>
            {text} 
            <div className={styles.markerTooltip}>
                Properrty Type: {tooltip} <br/>
                Property Price: {price}/m^2 <br/>
                Parking: {parking ? 'Yes' : 'No'} 
            </div>
        </div> 
    )
};

const places = MapData;
console.log(places);

let [...rest] = places;

let mapMarkers = [];

rest.forEach((place) => {
    let {Coordinates, ...rest} = place
    mapMarkers.push({
        // Coordinates, rest
        // Removed "POINT", ("(") and (")") from the json data. used chain method to join multiple logics
        // cords: place.Coordinates.split('POINT').pop().split('(').pop().split(')').shift().split(' '),
        // price: place["Price/m^2"],
        // type: place.BuildingType,
        // parking: place.Parking

        // Removed "POINT", ("(") and (")") from the json data. used chain method to join multiple logics
        // added rest datas to the object 
        cords:Coordinates.split('POINT').pop().split('(').pop().split(')').shift().split(' '), 
        price: rest["Price/m^2"],
        rest
    })
})
// console.log(mapMarkers);

class Map extends Component {
    static defaultProps = {
        center: {
        lat: 47.3836514,
        lng: 8.5482374
        },
        zoom: 13
    };
    
    /**<Marker at={47.3836514} lng={8.5482374} text="My Marker" />
     * <Marker lat={marker.cords[0]} lng={marker.cords[1]} text={index} tooltip={marker.type} parking={marker.parking} price={marker.price}/>
     * **/
    
    render() {
        return (
            <Fragment>
                <div style={{ height: '80vh', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAuOXhl7_BjeaV30YlT3I9OH6oW9DkYdlA' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >
                        {mapMarkers.map((marker, index) => 
                            <Marker lat={marker.cords[0]} lng={marker.cords[1]} text={index} tooltip={marker.rest.BuildingType} parking={marker.rest.Parking} price={marker.price}/>
                        )}
                        
                    </GoogleMapReact>
                </div>
        </Fragment>
        );
    }
}

export default Map;