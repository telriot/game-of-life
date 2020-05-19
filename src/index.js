import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./components/App"
import AppContextProvider from "./context"

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
