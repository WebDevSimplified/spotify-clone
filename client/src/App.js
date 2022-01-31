import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./Login"
import Dashboard from "./Dashboard"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  <h1> Test </h1>
  return code ? <Dashboard code={code} /> : <Login />
}

export default App
