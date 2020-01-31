import React from 'react'
import { NavLink } from 'react-router-dom'
import gameStartVideo from '../../images/game-start.webm'


const GameStart = (props) =>
{


    return (
        <div className='gamestart-container'>
            <div id="video-container">
                <video playsInline autoPlay muted loop id="game-start-video">
                    <source src={gameStartVideo} type="video/mp4" />
                </video>
            </div>

            <div className='gamestart-text-container'>
                <h1>Rick and Morty Trading Game</h1>
                <NavLink className='new-game-link' onClick={props.clickNewGame} to='/hello'>New Game</NavLink>
                <div>
                    <p>Programming by Trevor Smith-Holbourn</p>
                    <p>Created by Justin Roiland and Dan Harmon</p>
                    <p>Credit to the artists from Adult Swim for all artwork</p>
                </div>
            </div>
        </div>
    )
}


export default GameStart