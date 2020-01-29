import React from 'react'
import CharacterImage from './CharacterImage'

const Characters = (props) =>
{
    return (
        <div className='characters-container'>
            <div className='character-left'>
                <CharacterImage character={props.rickAndMortyCharacter} />
            </div>
            <div className='character-right'>
                <div className='character-right-name'>{props.currentCharacter.name}</div>
                <CharacterImage character={props.currentCharacter} characterImageType={2} />
            </div>
        </div>
    )
}

export default Characters


