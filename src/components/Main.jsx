import React from 'react'
import MainMenu from './menu/MainMenu'
import MainRender from './render/MainRender'

const Main = (props) =>
{
    return (<div>
        <MainRender
            currentLocation={props.currentLocation}
            rickAndMortyCharacter={props.rickAndMortyCharacter}
            currentCharacter={props.currentCharacter}
        />
        <MainMenu />
    </div>
    )
}

export default Main