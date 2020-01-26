import React from 'react'

const CharacterImage = (props) =>
{
    return (<div className='character-image-container'>
        <img alt={props.character.name} className='character-image'
            src={props.character.image} />
    </div>)
}

export default CharacterImage