import { useContext } from "react"
import "./App.scss"
import { NoiseEffect } from "./components/layout"
import { ScenesContext } from "./contexts/ScenesContext"
import { Game, Home, Tutorial } from "./pages"

function App() {
  const { scenes } = useContext(ScenesContext)
  const { game, tutorial, home } = scenes

  /* const dataGame = {
    players: [
      [
        { player: 1, color: "#615de5", mode: 0 },
        { player: 2, color: "#e9664c", mode: 0 },
      ],
      [
        { player: 1, color: "#e34a4d", mode: 1 },
        { player: 2, color: "#6abf4b", mode: 1 },
      ],
      [
        { player: 1, color: "#e369ce", mode: 2 },
        { player: 2, color: "#51b4de", mode: 2 },
      ],
    ],
    modes: [
      { id: 0, name: "normal", description: "Play in ascending order" },
      { id: 1, name: "revers", description: "Play in descending order" },
      { id: 3, name: "random", description: "Play in random order" },
      { id: 4, name: "odd", description: "Play in dd order" },
      { id: 5, name: "even", description: "Play in even order" },
    ],
  } */

  return (
    <div id="App" className="page">
      {game.state && <Game />}
      {tutorial.state && <Tutorial />}
      {home.state && <Home />}

      <NoiseEffect />
    </div>
  )
}

export default App
