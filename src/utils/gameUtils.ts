import { PlayerType, TileType } from "../hooks/useGame"
import { getRandomNumber } from "./getRandomNumber"

export const checkDuplicatedTile = (board: TileType[], tile: TileType) => {
  const { pawn, player } = tile
  const duplicatedTiles = board.find(
    (tile) => pawn && player && tile.pawn === pawn && tile.player === player
  )
  return duplicatedTiles
}

export const checkPlayedByBoth = (board: TileType[], level: number) => {
  const played = board.filter((tile) => tile.pawn === level)

  return played.length === 2
}

export const getEmptyTile = (
  board: TileType[],
  level: number,
  player: PlayerType | null
) => {
  if (
    checkDuplicatedTile(board, { id: -1, pawn: level, player, blocks: [] }) ===
    undefined
  ) {
    const emptyTiles = board.filter((tile) => tile.pawn === null)
    return emptyTiles[getRandomNumber(0, emptyTiles.length - 1)]
  }

  return
}

export const getResult = (board: TileType[]) => {
  const blockResults: { [key: number]: TileType[] } = {}

  // Organize tiles into blockResults based on block number
  board.forEach((tile) => {
    tile.blocks.forEach((block) => {
      if (!blockResults[block]) {
        blockResults[block] = []
      }
      blockResults[block].push(tile)
    })
  })

  return getWinner(blockResults)
}

const getWinner = (blocks: { [key: number]: TileType[] }) => {
  let player1Total = 0
  const player1Blocks: number[] = []
  let player2Total = 0
  const player2Blocks: number[] = []
  const tiesBlocks: number[] = []

  // Calculate scores for each block
  Object.entries(blocks).forEach(([, block], index) => {
    let player1 = 0
    let player2 = 0

    block.forEach((tile) => {
      if (tile.pawn !== null) {
        tile.player === "P1" ? (player1 += tile.pawn) : (player2 += tile.pawn)
      }
    })

    // Compare player1 and player2 scores in the block and add to total
    if (player1 - player2 > 0) {
      player1Total += player1 - player2
      player1Blocks.push(index + 1)
    } else if (player1 - player2 < 0) {
      player2Total += player2 - player1
      player2Blocks.push(index + 1)
    } else {
      tiesBlocks.push(index + 1)
    }
  })

  const winner: PlayerType | "Tie" =
    player1Total - player2Total === 0
      ? "Tie"
      : player1Total - player2Total > 0
      ? "P1"
      : "P2"
  const result = {
    player1: { total: player1Total, blocks: player1Blocks },
    player2: { total: player2Total, blocks: player2Blocks },
    ties: tiesBlocks,
    winner,
  }

  return result
}
