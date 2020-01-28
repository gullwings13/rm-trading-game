import React from 'react'

const CharacterImage = (props) =>
{
    console.log(props)

    if (props.characterImageType == 1)
    {
        return (<div className='character-image-container'>
            <img alt={props.character && props.character.name} className='character-image'
                src={props.character && props.character.image} />
        </div>)
    }
    else if (props.characterImageType == 2)
    {
        return (<div className='character-image-container-type-two'>
            <img alt={props.character && props.character.name} className='character-image-type-two'
                src={props.character && props.character.image} />
        </div>)
    }
    else
    {
        return (<div className='character-image-container'>
            <img alt={props.character && props.character.name} className='character-image'
                src={props.character && props.character.image} />
        </div>)
    }


}

export default CharacterImage