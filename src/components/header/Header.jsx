import React from 'react'
import CashUI from './CashUI'

const Header = (props) =>
{
    return (
        <div className='header-container'>
            <CashUI currentMoneyBalance={props.currentMoneyBalance}/>
        </div>
    )
}

export default Header