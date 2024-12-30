import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"
import useGame, {
  defaultGameValue,
  PlayerType,
  TileType,
  type GameType,
} from "../hooks/useGame"

interface GameContextProps {
  game: GameType
  turnPlayed: boolean
  resettingGame: boolean
  nextTurn: ({
    player,
    playing,
  }: {
    player?: PlayerType | null
    playing?: PlayerType | "same" | null
  }) => void
  nextLevel: (state?: boolean) => void
  updateTimer: ({
    time,
    interval,
  }: {
    time?: number
    interval?: boolean
  }) => void
  updateBoard: (tile: TileType) => void
  setResults: () => void
  resetGame: () => void
  setTurnPlayed: Dispatch<SetStateAction<boolean>>
  setResettingGame: Dispatch<SetStateAction<boolean>>
}
interface GameProviderProps {
  children: ReactNode
}

const defaultValueContext = {
  game: defaultGameValue,
  turnPlayed: false,
  resettingGame: false,
  nextTurn: () => undefined,
  nextLevel: () => undefined,
  updateTimer: () => undefined,
  updateBoard: () => undefined,
  setResults: () => undefined,
  resetGame: () => undefined,
  setTurnPlayed: () => undefined,
  setResettingGame: () => undefined,
} as GameContextProps

export const GameContext = createContext<GameContextProps>(defaultValueContext)

function GameProvider({ children }: GameProviderProps) {
  const {
    game,
    turnPlayed,
    nextTurn,
    nextLevel,
    updateTimer,
    updateBoard,
    setResults,
    resetGame,
    setTurnPlayed,
  } = useGame()

  const [resettingGame, setResettingGame] = useState(
    defaultValueContext.resettingGame
  )

  return (
    <GameContext.Provider
      value={{
        game,
        turnPlayed,
        resettingGame,
        nextTurn,
        nextLevel,
        updateTimer,
        updateBoard,
        setResults,
        resetGame,
        setTurnPlayed,
        setResettingGame,
      }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
