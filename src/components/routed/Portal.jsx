import React, { useEffect } from 'react'
import portal from '../../images/portal.png'


const Portal = (props) =>
{
    console.log(props)

    useEffect(() =>
    {
        setTimeout(() => { props.history.push('/') }, 2000)
    }
        , [])

    return (
        <div className='portal-image-container-container'>
            <div className='portal-image-container'>
                <img className='portal-image' src={portal} />
            </div>
        </div>
    )
}

export default Portal