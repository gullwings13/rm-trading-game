import React from 'react'

const BackgroundImage = (props) =>
{
    return (<div className='background-image-container'>
        <img alt={props.currentLocation.name} className='background-image'
            src={props.currentLocation.image} />
    </div>)
}

export default BackgroundImage