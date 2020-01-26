import React from 'react'
import BackgroundImage from './BackgroundImage'
import Characters from './Characters'

const MainRender = (props) =>
{
    return (<div>
        <BackgroundImage currentLocation={props.currentLocation} />
        <Characters
            rickAndMortyCharacter={props.rickAndMortyCharacter}
            currentCharacter={props.currentCharacter}
        />
    </div>)
}

export default MainRender