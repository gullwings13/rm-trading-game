## Rick and Morty Trading Game
Travel to different Rick and Morty locations and trade items so you can pay back some debt

**Project decription:** I plan to make a single page game that lets the player explore the RM universe and trade items. This will use the rick and morty api

## API Snippet (from rickandmortyapi.com)

```
{
    "info": {
        "count": 493,
        "pages": 25,
        "next": "https://rickandmortyapi.com/api/character/?page=2",
        "prev": ""
    },
    "results": [
        {
            "id": 1,
            "name": "Rick Sanchez",
            "status": "Alive",
            "species": "Human",
            "type": "",
            "gender": "Male",
            "origin": {
                "name": "Earth (C-137)",
                "url": "https://rickandmortyapi.com/api/location/1"
            },
            "location": {
                "name": "Earth (Replacement Dimension)",
                "url": "https://rickandmortyapi.com/api/location/20"
            },
            "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            "episode": [
                "https://rickandmortyapi.com/api/episode/1",
                "https://rickandmortyapi.com/api/episode/2",
                "https://rickandmortyapi.com/api/episode/3",
                "https://rickandmortyapi.com/api/episode/4",
                "https://rickandmortyapi.com/api/episode/5",
                "https://rickandmortyapi.com/api/episode/6",
                "https://rickandmortyapi.com/api/episode/7",
                "https://rickandmortyapi.com/api/episode/8",
                "https://rickandmortyapi.com/api/episode/9",
                "https://rickandmortyapi.com/api/episode/10",
                "https://rickandmortyapi.com/api/episode/11",
                "https://rickandmortyapi.com/api/episode/12",
                "https://rickandmortyapi.com/api/episode/13",
                "https://rickandmortyapi.com/api/episode/14",
                "https://rickandmortyapi.com/api/episode/15",
                "https://rickandmortyapi.com/api/episode/16",
                "https://rickandmortyapi.com/api/episode/17",
                "https://rickandmortyapi.com/api/episode/18",
                "https://rickandmortyapi.com/api/episode/19",
                "https://rickandmortyapi.com/api/episode/20",
                "https://rickandmortyapi.com/api/episode/21",
                "https://rickandmortyapi.com/api/episode/22",
                "https://rickandmortyapi.com/api/episode/23",
                "https://rickandmortyapi.com/api/episode/24",
                "https://rickandmortyapi.com/api/episode/25",
                "https://rickandmortyapi.com/api/episode/26",
                "https://rickandmortyapi.com/api/episode/27",
                "https://rickandmortyapi.com/api/episode/28",
                "https://rickandmortyapi.com/api/episode/29",
                "https://rickandmortyapi.com/api/episode/30",
                "https://rickandmortyapi.com/api/episode/31"
            ],
            "url": "https://rickandmortyapi.com/api/character/1",
            "created": "2017-11-04T18:48:46.250Z"
        },
```

## Wireframes

<img src='https://media.giphy.com/media/dv7BUjMGA6WJppyRdn/giphy.gif'/>
<img src='./wireframes.png'/></a>

### MVP

- Build App as class component - DONE
- Make use of Rick and Morty API - DONE
- Present player with a menu - DONE
- Allow player to either fly to a new location or trade items/money  - DONE
- Create game objectives and game over state (goal will be to pay back loan shark with earnings made during game)  - DONE
- Use local storage to save player state - NOT DONE
- Allow user to wipe local storage saved state to play again - NOT DONE
- Create hard coded list of tradeable items DONE

### Post-MVP

- Convert App to functional component - NOT DONE
- Allow players to visit other characters in each location - DONE
- Incorporate tradeable items/creatures from another API as rare finds (eg pokemon) - NOT DONE
- Incorporate natural language API and convert to text based controls (from button based) - NOT DONE
- Graph value of each item over time - NOT DONE
- Add sounds from RM - NOT DONE
- Add quotes from RM - NOT DONE

## React Component Hierarchy
### Initial:
<a href='https://photos.app.goo.gl/eR6BKLCXi7Zc2QCU9'><img src='https://media.giphy.com/media/WpV4yAkqm6h7Nmu6j2/giphy.gif'/></a>

### Final:
<a href='https://photos.app.goo.gl/LB3LLUKpWG6wnfwR6'>Final</a>

## Components


| Component | Description |Type |
| --- | --- | --- |
| App | Will maintain state for entire app and contain routing | Class |
| HeaderUI | Will recieve current money balance as a prop | Functional |
| MainRender | Will contain the rendering components | Functional |
| Background | Renders the current background | Functional |
| Character | Renders the player and current character images | Functional |
| TalkBubble | Renders talk bubbles if active | Functional |
| MainMenu | Will contain the menu buttons | Functional |
| MenuButtons | Will present the main options to the player (Trade, Fly and Talk) | Functional |
| MainMenu | Will give the option to move between menus | Functional |


## Timeframes


| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| API Call | H | 2hrs| 1hrs | 1hrs |
| Basic Layout | H | 4hrs| 5hrs | 5hrs |
| Base CSS | M | 4hrs| 3hrs | 3hrs |
| Game Loop | H | 5hrs| 10hrs | 10hrs |
| Clickable model | H | 4hrs| 5hrs | 5hrs |
| Polished CSS | M | 8hrs| 7hrs | 7hrs |
| Game Win and Lose and onboarding | H | 8hrs| 5hrs | 5hrs |
| Total | H | 35hrs| 36hrs | 36hrs |

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Jan 24th| Project Pitch / Wireframes / Priority Matrix / Functional Components | Complete
|Jan 27th| PsuedoCode, Explore Data Structure and White Boarding | Complete
|Jan 28th| Actual code and Initial Clickable Model | Complete
|Jan 29th| MVP  | Complete
|Jan 30th| POST MVP | Complete
|Jan 31tst| Present | Complete

## Additional Libraries

Would like to use c3.js if I am able to get to the graphing portion.

## Issues and Resolutions

Potential issue is locations do not come with images, thus will need to be hard coded. To address I will limit the scope of locations a player can travel to while sourcing background images by hand. The same applies to items to be traded, though the number of those will probably be limited to 5 or less thus will not present as much of an issue.

My original menu was expecting a single string as the name for the button. However i wanted to show more info on the trading buttons (Ticker, Name, Cost, Amount Owned). To resolve I instead sent an object with seperate keys in place of the single string for the name, but only for trading buttons. I then added logic in the MainMenuButton component to check for an object and use a different function for rendering the trading button.

Local Storage proved to be difficult due to still fairly early understanding of state and is async nature.

I had hoped to be able to animate the menu (Animation of the adding and removing of components) but ran into time contraints.

## Code Snippet

Use this section to include a brief code snippet you are proud of, along with a brief description of why.

```
clickBuy = (id) =>
  {
    let amount = 1
    let cost = this.state.currentItems[id].currentPrice
    let totalCost = cost * amount
    if (this.canAfford(totalCost))
    {
      this.addRemoveItem(id, amount)
      this.setState((prevState) =>
        ({
          currentMoneyBalance: prevState.currentMoneyBalance - totalCost
        }))
    }
  }
```

## Change Log
Initial edit: TJSH Friday Jan 24  