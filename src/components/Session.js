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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../store/Actions";
import M from "materialize-css";

const Session = ({ children }) => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    const elements = document.querySelectorAll(".dropdown-trigger");
    const options = {
      align: "right",
      coverTrigger: false,
    };

    M.Dropdown.init(elements, options);
  }, [session, dispatch]);

  const onLogout = (event) => {
    event.preventDefault();
    dispatch(removeSession());
  };

  return (
    <div>
      <ul id="auth-dropdown" className="dropdown-content">
        <li>
          <a href="#!" onClick={onLogout}>
            {"Logout"}
          </a>
        </li>
      </ul>

      <ul className="right">
        <li>
          <a className="dropdown-trigger" href="#!" data-target="auth-dropdown">
            <b>{session.user || "Logged In"}</b>{" "}
            <i className="material-icons right">arrow_drop_down</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Session;
