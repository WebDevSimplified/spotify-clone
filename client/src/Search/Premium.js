import "bootstrap/dist/css/bootstrap.min.css";
import LoginPremium from "./LoginPremium";
import Dashboard from "./Dashboard";
import { useContext, useEffect, useState } from "react";
//import useAuth from "../context/useAuth";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

function Premium() {
  //? Context
  const { setAuth } = useContext(AuthContext);

  const code = new URLSearchParams(window.location.search).get("code");
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessToken") || ""
  );
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  //const check = useAuth(code);

  useEffect(() => {
    const setLogin = (value) => {
      localStorage.setItem("auth", value);
      setAuth(value);
    };

    if (!code) return;
    axios
      .post("http://localhost:3001/login", { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        window.history.pushState({}, null, "/");
        setLogin(true);
        Cookies.set("accessToken", res.data.accessToken, {
          expires: res.data.expiresIn,
        });
      })
      .catch((err) => {
        setLogin(false);
        window.location = "/";
        console.error(err);
      });
  }, [code, setAuth]);

  useEffect(() => {
    const setLogin = (value) => {
      localStorage.setItem("auth", value);
      setAuth(value);
    };

    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          setLogin(true);
          Cookies.set("accessToken", res.data.accessToken, {
            expires: res.data.expiresIn,
          });
        })
        .catch(() => {
          setLogin(false);
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, setAuth]);

  if (accessToken) return <Dashboard accessToken={accessToken} />;

  return <LoginPremium />;
}

export default Premium;
