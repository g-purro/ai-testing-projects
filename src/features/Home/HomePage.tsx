import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="text-center p-6 m-0 mt-36">
      <h3>Mini-Projects using React</h3>
      <div className="p-6 mt-16">
        <ul>
          <li>
            <Link to="/expanding-cards">Expanding Cards</Link>
          </li>
          <li>
            <Link to="/calculator">Calculator</Link>
          </li>
          <li>
            <Link to="/progress-steps">Progress Steps</Link>
          </li>
          <li>
            <Link to="/rotating-animation-navigation">
              Rotating Animation Navigation
            </Link>
          </li>
          <li>
            <Link to="/tic-tac-toe">Tic Tac Toe</Link>
          </li>
          <li>
            <Link to="/hidden-search-widget">Hidden Search Widget</Link>
          </li>
          <li>
            <Link to="/to-do-list">To-Do List</Link>
          </li>
          <li>
            <Link to="/pokedex">Pokedex</Link>
          </li>
          <li>
            <Link to="/form-input-wave">Form Input Wave</Link>
          </li>
          <li>
            <Link to="/weather">Weather App</Link>
          </li>
          <li>
            <Link to="/expense-tracker">Expense Tracker</Link>
          </li>
        </ul>
      </div>
      <div className="mt-16">
        <p>Source code in Github:</p>
        <a className=" text-blue-500 " href="https://github.com/gpurro/">
          https://github.com/gpurro/
        </a>
      </div>
    </div>
  );
};
