import React, { Component, Fragment } from 'react';

export class Filter extends Component {
    render() {
        return(
            <Fragment>
                <label>Price</label>
                <select>
                    <option>30,300 EUR</option>
                    <option>30,300 EUR</option>
                    <option>30,300 EUR</option>
                </select>

                <label>Type</label>
                <select>
                    <option>Commercial</option>
                    <option>Business</option>
                    <option>Offices</option>
                </select>

                <label>Parking</label>
                <select>
                    <option>Yes</option>
                    <option>No</option>
                </select>
            </Fragment>
        )
    }
}

export default Filter;