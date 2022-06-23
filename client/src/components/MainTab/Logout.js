import { useContext } from 'react'
import Cookies from 'js-cookie'
import { AuthContext } from "../../context/AuthContext";

function Logout() {
  const { setAuth } = useContext(AuthContext);
  const setLogin = (value) => {
    localStorage.setItem("auth", value);
    setAuth(value);
  };
  const logOutHandler = () => {
    setLogin(false)
    Cookies.remove('accessToken')
  }

  return (
    <div>
        <button type="button" className="btn btn-success" onClick={logOutHandler}>Log Out</button>
    </div>
  )
}

export default Logout