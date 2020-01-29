import React from 'react'

const Onboarding = (props) =>
{
    const rickSays = () =>
    {
        if (props.onboardingDialog.name == 'rick')
        {
            return props.onboardingDialog.words
        }
        return
    }

    const mortySays = () =>
    {
        if (props.onboardingDialog.name == 'morty')
        {
            return props.onboardingDialog.words
        }
        return
    }

    const nextButton = () =>
    {
        if (props.onboardingDialog.buttonid == 0)
        {
            return (<button className='button onboarding-button' onClick={props.onboardingNextButton}>Next</button>)
        }
        return
    }


    return (
        <div className='onboarding-container'>
            <div className='onboarding-char-container'>
                <div className='onboarding-rick-container'>
                    <img className='onboarding-char-image' src='https://rickandmortyapi.com/api/character/avatar/1.jpeg' alt="" />
                    <div>
                        {rickSays()}
                    </div>
                </div>
                <div className='onboarding-morty-container'>
                    <img className='onboarding-char-image' src='https://rickandmortyapi.com/api/character/avatar/2.jpeg' alt="" />
                    <div>
                        {mortySays()}
                    </div>
                </div>

            </div>
            {nextButton()}
            <button className='button onboarding-button' onClick={props.onboardingCompleted}>Skip</button>
        </div>
    )
}

export default Onboarding