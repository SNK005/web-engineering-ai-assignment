import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

function Header({ total, pending }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <h1>Task Management Dashboard</h1>
      <p>{pending} pending of {total} tasks</p>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
}
export default Header;
