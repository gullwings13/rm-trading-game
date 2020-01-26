import React from 'react'

const MainMenuButton = (props) =>
{


    const button = (buttonObject, className) =>
    {
        if (buttonObject.name == null)
        {
            return
        }
        else
        {
            return (
                <button
                    onClick={buttonObject.click}
                    className={className}
                >{buttonObject.name}
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