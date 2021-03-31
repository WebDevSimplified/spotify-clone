import React from "react";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";
export const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("light");
  React.useEffect(() => {
    let theme = window.localStorage.getItem("theme");
    if (!theme) {
      theme = "light";
      window.localStorage.setItem("theme", theme);
    }
    setTheme(theme);
  }, []);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
    }
  };
  return (
    <ThemeContext.Provider
      value={{ theme: theme === "light" ? lightTheme : darkTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
