import React from 'react'
import MainMenuButton from './MainMenuButton'
import { MainMenuCurrentSubMenuEnum, MainMenuStatusEnum } from '../../services/enums'

const MainMenu = (props) =>
{
    const renderMenu = () =>
    {
        if (props.state.currentMainMenuOpen == true)
        {
            return (<div className='main-menu-container'>
                <MainMenuButton
                    type='root'
                    display='Close'
                    mainMenuClick={props.mainMenuClick}
                />
                {
                    props.state.currentMenuDisplayArray.map((subButtonDisplay) =>
                        (
                            <MainMenuButton type='sub' display={subButtonDisplay} />
                        ))
                }

            </div>)
        }
        else if (props.state.currentMainMenuOpen == false)
        {
            return (<div className='main-menu-container'>
                <MainMenuButton
                    type='root'
                    display='Portal'
                    mainMenuClick={props.mainMenuClick} />
            </div>)
        }
    }

    return (renderMenu())
}

export default MainMenu