import React from 'react'
import { NavLink } from 'react-router-dom'


const Gameover = (props) =>
{


    return (
        <div className='gameover-container'>
            <div className='gameover-text-container'>
                Gameover!
                You ended with {props.currentMoneyBalance - props.currentDebtBalance} flurbos!
                HighScore?!
                {/* <img className='portal-image' src={portal} /> */}
                <NavLink onClick={props.clickResetGame} to='/hello'>Play Again ?</NavLink>
            </div>
        </div>
    )
}


export default Gameover