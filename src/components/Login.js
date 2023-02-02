/*
 * Copyright 2023 Kevin Morris
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSession } from "../store/Actions";
import { apiLogin } from "../API";
import Loader from "./Loader";
import Error from "./Error";

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
        dispatch(setSession(json));
        navigate(decodeURIComponent(next));
      })
      .catch((error) => {
        setError(error);
        setProgress(false);
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ padding: "15px" }}
      data-testid="login-form"
    >
      <div className="input-field">
        <input
          id="login-user"
          data-testid="login-user"
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
          data-testid="login-password"
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
        <button
          data-testid="login-submit"
          type="submit"
          className="waves-effect red lighten-2 btn"
          disabled={progress}
        >
          {"Login"}
        </button>
      </div>
      <div className="text-center indicator-container">
        <Loader loading={progress}>
          <div className="error text-center">
            <Error inline={true} enabled={!progress && error} error={error} />
          </div>
        </Loader>
      </div>
    </form>
  );
};

export default Login;
