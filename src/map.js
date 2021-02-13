import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="marker">{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 47.3836514,
      lng: 8.5482374
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAuOXhl7_BjeaV30YlT3I9OH6oW9DkYdlA' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={47.3836514}
            lng={8.5482374}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;