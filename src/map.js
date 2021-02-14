import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './styles/main.scss';

// Imported Local JSON Data
import dataFromJSON from './data.json'

const Marker = ({ text, tooltip, parking, price, $hover }) => {
    const showDetails = () => {
        // console.log(`You clicked on ${tooltip}`);
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

// Stored complete properties to the places variable
const locations = dataFromJSON;

let [...rest] = locations;

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
        parking: rest.Parking ? 'Yes' : 'No',
        rest,
        show: true
    })
})

let propertyType = [];
dataFromJSON.forEach((item) => {
    if(propertyType.indexOf(item.BuildingType) < 0) {
        propertyType.push(item.BuildingType)
    }
})

let parkingArray = [];
mapMarkers.forEach((item) => {
    if(parkingArray.indexOf(item.parking) < 0) {
        parkingArray.push(item.parking)
    }
})

// Function to filter markers based on the selection
function filterProperty(array, type, name) {
    // console.log(type, array.filter((data) => {return data.rest.BuildingType === type}));
    // setting  new attribute to make show and hide the markers
    let data = array.filter((data) => {
        console.log(name);
        if(name === 'Parking') {
            data.parking === 'Yes' ? data.show = true : data.show = false;
        }
        else if(name === 'BuildingType') {
            data.rest.BuildingType === type ? data.show = true : data.show = false;
        }
        else if(name === 'Price') {
            data.price > 3000 ? data.show = true : data.show = false;
        }
        return data;
    })
    mapMarkers = data;
}

// filterProperty(mapMarkers, 'Residential')
// filterProperty(mapMarkers, 'Offices')
// filterProperty(mapMarkers, 'Commercial')
// filterProperty(mapMarkers, 'Industrial')
// filterProperty(mapMarkers, 'Mixed use')

class Map extends Component {
    constructor() {
        super();
        this.state = {
            category: 'Residential'
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({category: event.target.value, name: event.target.name});
        filterProperty(mapMarkers, event.target.value, event.target.name)
    }

    static defaultProps = {
        center: {
        lat: 47.3836514,
        lng: 8.5482374
        },
        zoom: 13
    };
    
    render() {
        return (
            <Fragment>
                <div className={styles.filter}>
                    <div className={styles.filterSelectWrapper}>
                        <label className={styles.selectboxLabel}>Price</label>
                        <select className={styles.selectbox} name="Price" onChange={this.handleChange}>
                            <option value="0">0 - 1000 CHF</option>
                            <option value="1">1001 - 2000 CHF</option>
                            <option value="2">2001 - 5000 CHF</option>
                        </select>
                    </div>
                    <div className={styles.filterSelectWrapper}>
                        <label className={styles.selectboxLabel}>Type</label>
                        <select className={styles.selectbox} value={this.state.category} name="BuildingType" onChange={this.handleChange}>
                            {propertyType.map((type) => {
                                return <option value={type}>{type}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.filterSelectWrapper}>
                        <label className={styles.selectboxLabel}>Parking</label>
                        <select className={styles.selectbox} value={this.state.category} name="Parking" onChange={this.handleChange}>
                            
                            {parkingArray.map((type) => {
                                return <option value={type}>{type}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.filterLanguageSwitch}>
                    <select className={styles.selectbox}>
                            <option>EN</option>
                            <option>DE</option>
                        </select>
                    </div>
                </div>
                <div className={styles.mapWrapper}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAuOXhl7_BjeaV30YlT3I9OH6oW9DkYdlA' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >
                        {mapMarkers.map((marker, index) => 
                            marker.show ? <Marker lat={marker.cords[0]} lng={marker.cords[1]} text={index} tooltip={marker.rest.BuildingType} parking={marker.parking} price={marker.price}/> : ''
                            
                        )}
                        
                    </GoogleMapReact>
                </div>
            </Fragment>
        );
    }
}

export default Map;