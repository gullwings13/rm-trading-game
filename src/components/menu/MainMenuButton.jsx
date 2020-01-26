import React from 'react'

const MainMenuButton = (props) =>
{

    const buttonName = () =>
    {
        if (props.type === 'root')
        {
            return props.display
        }
        else if (props.type === 'sub')
        {
            return props.display
        }
    }

    const buttonAction = () =>
    {
        if (props.type === 'root')
        {
            return props.mainMenuClick
        }
        else if (props.type === 'sub')
        {
            return null
        }
    }

    const subButtonAction = (position) =>
    {
        return null
    }

    return (<div className='main-menu-button-container'>
        <button onClick={subButtonAction('left')} className='main-menu-sub-button'>{buttonName()}</button>
        <button onClick={buttonAction()} className='main-menu-button'>{buttonName()}</button>
        <button onClick={subButtonAction('right')} className='main-menu-sub-button'>{buttonName()}</button>
    </div>)
}


export default MainMenuButton