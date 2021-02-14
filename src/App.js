import React , { Component, Fragment } from 'react';
import styles from './styles/main.scss';

import Map from './map.js';

class App extends Component {
	render() {
	return(
			<Fragment>
				<h1 className={styles.header}>Zurich Map</h1>

				<Map />

				<p>
					Here come the detailed instructions: Given a CSV file (attached) with locations and prices per square meter, building type and parking availability of properties around Zurich create a map based application that displays markers on the map with the values of this properties and a filtering system for the properties based on it's price, building type and parking. A user should be able to click one of the markers and see the property's information. The application should be done using react, webpack, node.js, sass, application should be done in English and localized for German. General design, UI and UX will be taken into consideration for this task.
				</p>
			</Fragment>
		)
	}
}

export default App;