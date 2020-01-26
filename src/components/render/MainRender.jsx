import React from 'react'
import BackgroundImage from './BackgroundImage'
import Characters from './Characters'

const MainRender = (props) =>
{
    return (<div className='main-render-container'>
        <BackgroundImage currentLocation={props.currentLocation} />
        <Characters
            rickAndMortyCharacter={props.rickAndMortyCharacter}
            currentCharacter={props.currentCharacter}
        />
    </div>)
}

export default MainRender