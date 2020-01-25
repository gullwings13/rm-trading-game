import React from 'react'
import MainMenu from './MainMenu'
import MainRender from './MainRender'

const Main = (props) =>
{
    return (<div>
        <h3>hello from Main</h3>
        <MainRender />
        <MainMenu />
    </div>
    )
}

export default Main