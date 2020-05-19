import React from "react"
import Header from "./Header"
import Board from "./Board"
import Controls from "./Controls"
import Controls2 from "./Controls2"

import styles from "./App.module.scss"

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Board />
      <div className={styles.controls}>
        <Controls />
        <Controls2 />
      </div>
    </div>
  )
}

export default App
