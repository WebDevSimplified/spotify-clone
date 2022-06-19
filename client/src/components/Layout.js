import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "../NavBar/NavBar";

function Layout({ children }) {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      {auth && <NavBar />}
      {children}
    </div>
  );
}

export default Layout;
