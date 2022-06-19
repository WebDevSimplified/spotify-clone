import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../components/NavBar/NavBar";
import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from "js-cookie";

function Layout({ children }) {
  const { auth } = useContext(AuthContext)
  const token = Cookies.get('accessToken')

  return (
    <div>
      {auth && <NavBar />}
      <SpotifyApiContext.Provider value={token}>
        {children}
      </SpotifyApiContext.Provider>
    </div>
  );
}

export default Layout;
