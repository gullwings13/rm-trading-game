export const MainMenuSubMenuEnum =
{
    trade: {
        name: 'Trade',
        id: 0
    },
    portal: {
        name: 'Portal',
        id: 1
    },
    talk: {
        name: 'Talk',
        id: 2
    }
}

export const MainMenuSubMenuByID = (id) =>
{
    // console.log(MainMenuSubMenuEnum)
    let subMenu
    Object.keys(MainMenuSubMenuEnum).forEach((subMenuKey) =>
    {
        // console.log(subMenuKey)
        // console.log(MainMenuSubMenuEnum[subMenuKey])
        if (MainMenuSubMenuEnum[subMenuKey].id === id)
        {
            // console.log(MainMenuSubMenuEnum[subMenuKey])
            subMenu = MainMenuSubMenuEnum[subMenuKey]
        }
    })
    return subMenu
}

export const MainMenuLength = 3

export const MainMenuStatusEnum = { open: 1, closed: 2 }

