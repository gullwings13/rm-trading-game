import React from 'react'
import CashUI from './CashUI'
import DebtUI from './DebtUI'
import DaysUI from './DaysUI'
import LocationUI from './LocationUI'

const Header = (props) =>
{
    return (
        <div className='header'>
            <div className='header-container'>
                <div className='debt-cash-balance-container'>
                    <div className='debt-cash-label'>
                        <span className='cash-label'>Cash: </span>
                        <span className='debt-label'>Debt: </span>
                    </div>
                    <div className='debt-cash-values'>
                        <CashUI currentMoneyBalance={props.currentMoneyBalance} />
                        <DebtUI currentDebtBalance={props.currentDebtBalance} />
                    </div>
                </div>
                <DaysUI
                    currentDaysPassed={props.currentDaysPassed}
                    totalDaysTillGameOver={props.totalDaysTillGameOver}
                />
            </div>
            <LocationUI currentLocationDetails={props.currentLocationDetails} />
        </div>
    )
}

export default Header