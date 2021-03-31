import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login"
import Dashboard from "./Dashboard"
import "./App.css"
import { ThemeContext } from "./ThemeProvider"
import GlobalStyles from "./theme/GlobalStyles"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
    <ThemeContext.Consumer>
      {(context) => (
        <>
          <GlobalStyles theme={context.theme} />
          {code ? (
            <Dashboard
              code={code}
              toggleTheme={context.toggleTheme}
              theme={context.theme}
            />
          ) : (
            <Login />
          )}
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default App
