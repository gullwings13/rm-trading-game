import React from 'react'

const MainMenuButton = (props) =>
{

    const buttonName = () =>
    {
        if (props.type == 'root')
        {
            return props.display
        }
        else if (props.type == 'sub')
        {
            return props.display
        }
    }

    const buttonAction = () =>
    {
        if (props.type == 'root')
        {
            return props.mainMenuClick
        }
        else if (props.type == 'sub')
        {
            return null
        }
    }

    return (<div className='main-menu-button-container'>
        <button onClick={buttonAction()} className='main-menu-button'>{buttonName()}</button>
    </div>)
}


export default MainMenuButton