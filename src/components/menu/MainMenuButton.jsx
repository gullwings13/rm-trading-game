import React from 'react'

const MainMenuButton = (props) =>
{

    const tradeFormat = (tradeItem) =>
    {
        return (
            <div className='trade-button-container'>
                <div className='trade-button-column-one'>
                    <div className='trade-button-ticker'>{tradeItem.ticker}</div>
                    <div className='trade-button-name'>{tradeItem.name}</div>
                    <div className='trade-button-price'>⨎{tradeItem.currentPrice}</div>
                </div>
                <div className='trade-button-column-two'>
                    <div className='trade-button-detail-container'>
                        <div className='trade-button-detail-label'>Owned:</div><div className='trade-button-detail'> {tradeItem.owned}</div>
                    </div>
                    <div className='trade-button-detail-container'>
                        <div className='trade-button-detail-label'>Available:</div><div className='trade-button-detail'> {tradeItem.available}</div>
                    </div>
                    <div className='trade-button-detail-container'>
                        <div className='trade-button-detail-label'>Change:</div><div className='trade-button-detail'> {tradeItem.change}</div>
                    </div>
                </div>
            </div>
        )
    }

    const button = (buttonObject, className) =>
    {
        if (buttonObject.trade != null)
        {
            return (
                <button
                    onClick={buttonObject.click}
                    className={className}
                >{tradeFormat(buttonObject.trade)}
                </button>
            )
        }
        if (buttonObject.name == null)
        {
            return
        }
        else
        {
            return (
                <button
                    onClick={buttonObject.click}
                    className={(buttonObject.name === '>' || buttonObject.name === '<') ? className : className + ' sub'}
                ><span>{buttonObject.name}</span>
                </button>
            )
        }
    }

    return (
        <div className={`main-menu-button-container ${props.hideClassName}`}>
            {button(props.buttonArray[1], 'main-menu-side-button')}
            {button(props.buttonArray[0], 'main-menu-button')}
            {button(props.buttonArray[2], 'main-menu-side-button')}
        </div>
    )
}


export default MainMenuButton