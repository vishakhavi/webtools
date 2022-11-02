import { useState } from "react";
import Game from "./Game";
function Login() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
	const isDog = username === "dog";
	const content =
	( <div className="logout">
	<button className="btn btn--logout" onClick={() => setIsLoggedIn(false)}>Logout</button>
	<Game user={username}/>
	</div>);
	const login =
	(<form>
	<label>
	<span>Username: </span>
	<input value={username} onInput={(e) => setUsername(e.target.value)}/>
	</label>
	<button className="btn btn--login" type="button" onClick={() => setIsLoggedIn(true)}>Login</button>
	<span className="login-error">{isDog && <p>Username dog isn't a valid user</p>}</span>
	</form>);
	return (
	<div className="login">
	{ isLoggedIn ? content : login }
	</div>
	);

}
export default Login;