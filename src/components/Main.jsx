import React from 'react'
import MainMenu from './menu/MainMenu'
import MainRender from './render/MainRender'

const Main = (props) =>
{
    return (<div className='main'>
        <MainRender
            currentLocation={props.currentLocation}
            rickAndMortyCharacter={props.rickAndMortyCharacter}
            currentCharacter={props.currentCharacter}
        />

            <MainMenu
                state={props.state}
                mainMenuClick={props.mainMenuClick}
            />
        
    </div>
    )
}

export default Main