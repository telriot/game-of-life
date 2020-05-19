import React, { useState } from "react"
import styles from "./Button.module.scss"
import classNames from "classnames/bind"

let cx = classNames.bind(styles)

function Button(props) {
  const { handleClick, text } = props
  const [clicked, setClicked] = useState(false)
  let btnClass = cx({
    btn: true,
    animate: clicked,
  })

  const handleStyles = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 200)
  }

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleStyles}
      className={btnClass}
    >
      {text}
    </button>
  )
}

export default Button
