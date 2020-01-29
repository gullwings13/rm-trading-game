import React from 'react'

const LocationUI = (props) =>
{
    return (
        <div className="location-ui-container">
            <span className='location-ui-text'>{props.currentLocationDetails.name}</span>
        </div>
    )
}

export default LocationUI