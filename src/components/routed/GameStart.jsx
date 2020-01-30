import React from 'react'
import { NavLink } from 'react-router-dom'


const GameStart = (props) =>
{


    return (
        <div className='gamestart-container'>
            <div className='gamestart-text-container'>
                {/* <img className='portal-image' src={portal} /> */}
                <NavLink className='new-game-link' onClick={props.clickNewGame} to='/hello'>New Game</NavLink>
                <NavLink className='new-game-link' onClick={props.clickContinueGame} to='/'>Continue</NavLink>
                {/* <NavLink className='new-game-link' onClick={props.clickResetGame} to='/hello'>Play Again ?</NavLink>
                <NavLink className='new-game-link' onClick={props.clickResetGame} to='/hello'>Play Again ?</NavLink> */}
            </div>
        </div>
    )
}


export default GameStart