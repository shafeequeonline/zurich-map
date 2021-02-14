import React, { Component, Fragment, useState } from 'react';
import styles from './styles/main.scss';

// Imported Local JSON Data
import dataFromJSON from './data.json'

// created new array to store the property type
let propertyType = [];
dataFromJSON.forEach((item) => {
    if(propertyType.indexOf(item.BuildingType) < 0) {
        propertyType.push(item.BuildingType)
    }
})


export class Filter extends Component {
    render() {
        return(
            <Fragment>
                <div className={styles.filter}>
                    <div className={styles.filterSelectWrapper}>
                        <label className={styles.selectboxLabel}>Price</label>
                        <select className={styles.selectbox}>
                            <option>30,300 EUR</option>
                            <option>30,300 EUR</option>
                            <option>30,300 EUR</option>
                        </select>
                    </div>
                    <div className={styles.filterSelectWrapper}>
                        <label className={styles.selectboxLabel}>Type</label>
                        <select className={styles.selectbox} name="propertyType">
                            {propertyType.map((type) => {
                                return <option value={type}>{type}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.filterSelectWrapper}>
                        <label className={styles.selectboxLabel}>Parking</label>
                        <select className={styles.selectbox}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className={styles.filterLanguageSwitch}>
                    <select className={styles.selectbox}>
                            <option>DE</option>
                            <option>EN</option>
                        </select>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Filter;