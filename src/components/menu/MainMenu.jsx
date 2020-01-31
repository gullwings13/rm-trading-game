import React from 'react'
import MainMenuButton from './MainMenuButton'

const MainMenu = (props) =>
{
    const subButtonHideClass = () =>
    {
        if (props.state.currentMainMenuOpen === true)
        {
            return ''
        }
        else if (props.state.currentMainMenuOpen === false)
        {
            return 'sub-button-hidden'
        }
    }

    return (
        <div className='main-menu-container'>
            {props.state.currentMenuDisplayArray && props.state.currentMenuDisplayArray.map((buttonArray, index) =>
                (
                    <MainMenuButton
                        key={index}
                        id={index}
                        hideClassName={subButtonHideClass()}
                        buttonArray={buttonArray}
                    />
                ))}
        </div>
    )
}

export default MainMenu