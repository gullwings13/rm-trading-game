import React from 'react'

const DaysUI = (props) =>
{
    return (
        <div className='header-days-ui'>
            <span className='days-text'>{props.currentDaysPassed}/{props.totalDaysTillGameOver}</span>
            <span className='days-text-label'>Days / Total Days</span>
        </div>
    )
}

export default DaysUI