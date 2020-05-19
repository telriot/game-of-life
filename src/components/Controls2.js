import React, { useContext } from "react"
import styles from "./Controls2.module.scss"
import { AppContext } from "../context"
function Controls2() {
  const { state } = useContext(AppContext)
  return (
    <div className={styles.container}>
      <h3>Generations: {state.tick}</h3>
    </div>
  )
}

export default Controls2
