import React from 'react'

const DebtUI = (props) =>
{
    return (
        <div className='header-debt-ui'>
            
            <span className='debt-text-flurbo-sign'>⨎</span>
            <span className='debt-text'>{props.currentDebtBalance}</span>
        </div>
    )
}

export default DebtUI