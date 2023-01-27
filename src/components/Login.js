import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSession } from "../store/Actions";
import { apiLogin } from "../API";

const Login = ({ next }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();

    setProgress(true);
    apiLogin(user, pass)
      .then((json) => {
        // Dispatch received session object with an added user property
        console.log(json);
        dispatch(setSession(json));
        if (json.detail) {
          setError(json.detail);
        } else {
          navigate(decodeURIComponent(next));
        }
        setProgress(false);
      })
      .catch((error) => {
        console.error(error);
        setProgress(false);
      });
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: "15px" }}>
      <div className="input-field">
        <input
          id="login-user"
          className="input-red"
          type="text"
          name="user"
          value={user}
          onChange={(event) => {
            event.preventDefault();
            setUser(event.target.value);
          }}
        />
        <label htmlFor="login-user">Username</label>
      </div>
      <div className="input-field">
        <input
          id="login-password"
          className="input-red"
          type="password"
          name="password"
          value={pass}
          onChange={(event) => {
            event.preventDefault();
            setPass(event.target.value);
          }}
        />
        <label htmlFor="login-password">Password</label>
      </div>
      <div className="text-center">
        <button type="submit" className="waves-effect red lighten-2 btn">
          {"Login"}
        </button>
      </div>
      <div className="text-center indicator-container">
        {progress ? (
          <div className="progress red lighten-3">
            <div className="indeterminate red lighten-1"></div>
          </div>
        ) : (
          <div className="error text-center">
            {error && <span className="red-text lighten-2">{error}</span>}
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
