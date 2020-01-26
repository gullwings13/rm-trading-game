import React from 'react'

const CashUI = (props) =>
{
    return (
        <div className='header-cash-ui'>
            <span className='cash-text-flurbo-sign'>⨎</span><span className='cash-text'>{props.currentCash}</span>
        </div>
    )
}

export default CashUI