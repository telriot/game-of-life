import React, { useContext } from "react"
import styles from "./Controls.module.scss"
import Button from "./Button"
import { AppContext } from "../context"
import { createRandomizedBoardTwoValues } from "../helpers"

function Controls() {
  const { state, dispatch, startGame, stopGame, HEIGHT, WIDTH } = useContext(
    AppContext
  )
  const handleToggleStart = () => {
    state.isRunning ? stopGame() : startGame()
  }
  const handleRandomize = () => {
    const randomizedBoard = createRandomizedBoardTwoValues(HEIGHT, WIDTH)
    dispatch({ type: "UPDATE_BOARD", board: randomizedBoard })
  }
  const handleClear = () => {
    stopGame()
    dispatch({ type: "CLEAR_BOARD" })
  }
  const handlePatterns = () => {
    console.log("patterns")
  }
  return (
    <div className={styles.container}>
      <Button handleClick={handleToggleStart} text="Start / Stop" />
      <Button handleClick={handleRandomize} text="Randomize" />
      <Button handleClick={handleClear} text="Clear Board" />
    </div>
  )
}

export default Controls
