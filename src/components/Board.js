import React, { useContext } from "react"
import styles from "./Board.module.scss"
import { AppContext } from "../context"
import { getNeighbors, nestedCopy } from "../helpers"

function Board() {
  const { dispatch, state, HEIGHT, WIDTH } = useContext(AppContext)
  const updateNeighborsOnClick = (neighbors, index, array) => {
    for (let neighbor of neighbors) {
      array[index].value
        ? array[neighbor.index].neighbors++
        : array[neighbor.index].neighbors--
    }
  }

  const handleCellClick = (index) => () => {
    if (!state.isRunning) {
      let newBoard = nestedCopy(state.board)
      !newBoard[index].value ? newBoard[index].value++ : newBoard[index].value--

      const neighbors = getNeighbors(index, newBoard, WIDTH)
      updateNeighborsOnClick(neighbors, index, newBoard)
      dispatch({
        type: "UPDATE_BOARD",
        board: newBoard,
      })
    }
  }

  const renderMap = (height, width) => {
    let grid = []
    for (let i = 0; i < height; i++) {
      let thisRow = []
      for (let j = 0; j < width; j++) {
        const index = i * width + j
        thisRow.push(
          <div
            onClick={handleCellClick(index)}
            key={`cell${i}-${j}`}
            className={state.board[index].value ? styles.cell : styles.deadCell}
          ></div>
        )
      }
      grid.push(
        <div key={`row${i}`} className={styles.row}>
          {thisRow}
        </div>
      )
    }
    return grid
  }

  return <div className={styles.board}>{renderMap(HEIGHT, WIDTH)}</div>
}

export default Board
