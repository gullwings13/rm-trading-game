import React from 'react'
// import rick from 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
// import morty from 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'

const Onboarding = (props) =>
{
    return (
        <div className='onboarding-container'>
            <div className='onboarding-char-container'>
                <div className='onboarding-rick-container'>
                    <img className='onboarding-char-image' src='https://rickandmortyapi.com/api/character/avatar/1.jpeg' alt="" />
                    <div>
                    </div>
                </div>
                <div className='onboarding-morty-container'>
                    <img className='onboarding-char-image' src='https://rickandmortyapi.com/api/character/avatar/2.jpeg' alt="" />
                    <div>
                    </div>
                </div>

            </div>
            <button className='button onboarding-button' onClick={props.onboardingCompleted}>Skip</button>
        </div>
    )
}

export default Onboarding