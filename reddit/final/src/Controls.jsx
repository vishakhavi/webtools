import { Link } from "react-router-dom";

function Controls({ onLogout, onRefresh }) {
  return (
    <div className="controls">
      <Link to="/"><button onClick={onRefresh} className="controls__refresh">Refresh</button></Link>
      <Link to="/"><button onClick={onLogout} className="controls__logout">Logout</button></Link>
    </div>
  );
}

export default Controls;
