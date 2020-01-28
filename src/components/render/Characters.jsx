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
                <CharacterImage character={props.currentCharacter} characterImageType={2} />
            </div>
        </div>
    )
}

export default Characters


