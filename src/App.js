import React , { Component } from 'react';
import styles from './styles/main.scss';

class App extends Component {
  render() {
   return(
    <div>
     <h1 className={styles.header}>Zurich Map</h1>
    </div>
   );
  }
}

export default App;