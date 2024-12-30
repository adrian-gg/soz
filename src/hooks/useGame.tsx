import { useEffect, useReducer, useState } from "react"
import { TIMER_LENGTH } from "../data/consts"
import {
  checkDuplicatedTile,
  checkPlayedByBoth,
  getEmptyTile,
  getResult,
} from "../utils/gameUtils"

export type GameType = typeof defaultGameValue

export type PlayerType = "P1" | "P2"

export type TileType = {
  id: number
  pawn: number | null
  player: PlayerType | null
  blocks: number[]
}

type ActionType =
  | { type: "reset" }
  | {
      type: "next_turn"
      payload: {
        player?: PlayerType | null
        playing?: PlayerType | "same" | null
      }
    }
  | { type: "next_level"; payload?: boolean }
  | { type: "update_timer"; payload: { time?: number; interval?: boolean } }
  | {
      type: "update_board"
      payload: TileType
    }
  | {
      type: "set_results"
    }

export const defaultGameValue: {
  level: number
  turn: { player: PlayerType | null; playing: PlayerType | null }
  timer: {
    time: number
    interval: boolean
  }
  board: TileType[]
  results: {
    player1: { total: number | null; blocks: number[] }
    player2: { total: number | null; blocks: number[] }
    ties: number[]
    winner: PlayerType | "Tie" | null
  }
} = {
  level: 0,
  turn: { player: null, playing: null },
  timer: { time: TIMER_LENGTH, interval: false },
  board: [
    { id: 0, pawn: null, player: null, blocks: [1, 8] },
    { id: 1, pawn: null, player: null, blocks: [1, 2] },
    { id: 2, pawn: null, player: null, blocks: [2, 3] },
    { id: 3, pawn: null, player: null, blocks: [3, 4] },
    { id: 4, pawn: null, player: null, blocks: [4, 5] },
    { id: 5, pawn: null, player: null, blocks: [5, 6] },
    { id: 6, pawn: null, player: null, blocks: [6, 7] },
    { id: 7, pawn: null, player: null, blocks: [7, 8] },
    { id: 8, pawn: null, player: null, blocks: [1] },
    { id: 9, pawn: null, player: null, blocks: [2] },
    { id: 10, pawn: null, player: null, blocks: [3] },
    { id: 11, pawn: null, player: null, blocks: [4] },
    { id: 12, pawn: null, player: null, blocks: [5] },
    { id: 13, pawn: null, player: null, blocks: [6] },
    { id: 14, pawn: null, player: null, blocks: [7] },
    { id: 15, pawn: null, player: null, blocks: [8] },
  ],
  results: {
    player1: { total: null, blocks: [] },
    player2: { total: null, blocks: [] },
    ties: [],
    winner: null,
  },
}

function reducer(state: GameType, action: ActionType): GameType {
  const { type } = action

  switch (type) {
    case "reset": {
      return { ...defaultGameValue }
    }

    case "next_turn": {
      const { player, playing } = action.payload

      // Shift update based on what is defined
      const updatedTurn = {
        ...state.turn,
        ...(player !== undefined && { player }),
        ...(playing !== undefined &&
          (playing === "same" ? { playing: state.turn.player } : { playing })),
      }

      // If neither player nor playing is defined, alternate player
      if (player === undefined && playing === undefined) {
        updatedTurn.player = state.turn.player === "P1" ? "P2" : "P1"
      }

      return {
        ...state,
        turn: updatedTurn,
      }
    }

    case "next_level": {
      if (
        action.payload ||
        (state.level < 9 && checkPlayedByBoth(state.board, state.level))
      ) {
        return { ...state, level: state.level + 1 }
      } else {
        return state
      }
    }

    case "update_timer": {
      const { time, interval } = action.payload

      const updatedTimer = {
        ...state.timer,
        ...(time !== undefined && { time }),
        ...(interval !== undefined && { interval }),
      }

      return {
        ...state,
        timer: updatedTimer,
      }
    }

    case "update_board": {
      const { id, blocks } = action.payload

      // Nueva ficha a insertar
      const newTile = {
        id,
        pawn: state.level,
        player: state.turn.player,
        blocks,
      }

      // Verifica si la ficha está duplicada
      const duplicatedTile = checkDuplicatedTile(state.board, newTile)

      // Filtra las fichas, eliminando solo la que tiene el mismo ID o el ID del duplicado (si existe)
      const restTiles = state.board.filter((tile) =>
        duplicatedTile
          ? tile.id !== id && tile.id !== duplicatedTile.id
          : tile.id !== id
      )

      // Si hay una ficha duplicada, reiniciamos su "pawn" y "player" (la eliminamods del board)
      const updatedBoard = duplicatedTile
        ? [
            ...restTiles,
            { ...duplicatedTile, pawn: null, player: null },
            newTile,
          ]
        : [...restTiles, newTile]

      // Retornamos el estado actualizado
      return {
        ...state,
        board: updatedBoard,
      }
    }

    case "set_results": {
      const updatedResults = getResult(state.board)

      return {
        ...state,
        results: updatedResults,
      }
    }

    default:
      return state
  }
}

function useGame() {
  const [game, dispatch] = useReducer(reducer, defaultGameValue)
  const [boardUpdated, setBoardUpdated] = useState(false) // Nueva bandera
  const [turnPlayed, setTurnPlayed] = useState(false)

  const nextTurn = ({
    player,
    playing,
  }: {
    player?: PlayerType | null
    playing?: PlayerType | "same" | null
  }) => {
    dispatch({ type: "next_turn", payload: { player, playing } })
  }

  const nextLevel = (state?: boolean) => {
    dispatch({ type: "next_level", payload: state })
  }

  const updateTimer = ({
    time,
    interval,
  }: {
    time?: number
    interval?: boolean
  }) => {
    dispatch({ type: "update_timer", payload: { time, interval } })
  }

  const updateBoard = (tile: TileType) => {
    dispatch({ type: "update_board", payload: tile })
  }

  const setResults = () => {
    dispatch({ type: "set_results" })
  }

  const resetGame = () => {
    dispatch({ type: "reset" })
  }

  // Primer useEffect: manejar el temporizador y la actualización del tablero
  useEffect(() => {
    if (game.timer.time === -1) {
      // Depurando los parámetros que pasas a getEmptyTile
      const isPlayed = getEmptyTile(game.board, game.level, game.turn.player)

      if (isPlayed) {
        updateBoard(isPlayed) // Play random tile if player didn't play
        setTurnPlayed(true)
      }
      setBoardUpdated(true)
    }

    // Control del intervalo del temporizador
    if (game.timer.interval && game.level > 0 && game.level <= 8) {
      const intervalTime = setInterval(() => {
        updateTimer({ time: game.timer.time - 1 })
      }, 1000)

      return () => clearInterval(intervalTime)
    }
  }, [
    game.board,
    game.level,
    game.turn.player,
    game.timer.time,
    game.timer.interval,
  ])

  // Segundo useEffect: verificar si ambos jugadores han jugado, depende del board y timer
  useEffect(() => {
    if (boardUpdated && game.timer.time === -1) {
      nextTurn({})
      updateTimer({ time: 0, interval: false })
      // Solo se ejecuta si el tablero está listo y el tiempo llegó a -1

      const hasBothPlayed = checkPlayedByBoth(game.board, game.level)

      if (game.level >= 8 && hasBothPlayed) {
        setTimeout(() => {
          nextLevel()
          nextTurn({ player: null, playing: null })
          setTurnPlayed(false)
          setResults()

          setTimeout(() => {
            nextLevel(true)
          }, 1600)
        }, 600)
      } else {
        setTimeout(() => {
          nextLevel()
          nextTurn({ playing: "same" })
          setTurnPlayed(false)
          updateTimer({ time: TIMER_LENGTH })

          setTimeout(() => {
            updateTimer({ interval: true })
          }, 600) //wait for open_pawn_container of pawn-container
        }, 600) //wait for rotatin_out of spawner-container
      }

      setBoardUpdated(false) // Reseteamos la bandera una vez que la lógica se ha ejecutado
    }
  }, [boardUpdated, game.board, game.level, game.timer.time])

  return {
    game,
    turnPlayed,
    nextTurn,
    nextLevel,
    updateTimer,
    updateBoard,
    setResults,
    resetGame,
    setTurnPlayed,
  }
}

export default useGame
