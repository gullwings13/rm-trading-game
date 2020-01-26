import React from 'react'
import CashUI from './CashUI'

const Header = (props) =>
{
    return (
        <div className='header-container'>
            <CashUI currentCash={100}/>
        </div>
    )
}

export default Header