import React from 'react'
import { NavLink } from 'react-router-dom'

const Events = (props) =>
{
    switch (props.event)
    {
        case '1high':

            break
        case '1low':

            break
        case 'free':

            break
        default:
            break
    }

    return (

        <div className='event-container'>
            {props.eventText.map((event, index) => (
                <h3 key={index}>{event}</h3>
            ))}
            <NavLink to='/'>Continue</NavLink>
        </div>

    )
}




export default Events