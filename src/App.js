import React , { Component, Fragment } from 'react';
import styles from './styles/main.scss';

import Map from './map.js';

class App extends Component {
	render() {
	return(
			<Fragment>
				<h1 className={styles.header}>Zurich Map</h1>
				<Map />
			</Fragment>
		)
	}
}

export default App;