import React, { useEffect } from 'react'
import portal from '../../images/portal.png'


const Portal = (props) =>
{
    useEffect(() =>
    {
        setTimeout(() =>
        {
            props.randomEvents()
        }, 2000)
    }
        // eslint-disable-next-line
        , [])

    return (
        <div className='portal-image-container-container'>
            <div className='portal-image-container'>
                <img className='portal-image' src={portal} alt='twirling green portal' />
            </div>
        </div>
    )
}

export default Portal