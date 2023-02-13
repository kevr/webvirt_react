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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Session from "./Session";
import SessionReducer from "./SessionRefresher";

const Navbar = () => {
  const title = useSelector((state) => state.app.title);

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="container flex-display flex-row">
          <ul>
            <li>
              <Link id="dashboard-link" data-tooltip-content="Dashboard" to="/">
                <i className="material-icons">home</i>
              </Link>
            </li>
            <li>
              <Link
                id="host-link"
                data-tooltip-content="Host Dashboard"
                to="/host"
              >
                <i className="material-icons">dataset</i>
              </Link>
            </li>
          </ul>
          <div className="brand-logo-wrapper overflow-ellipsis">
            <span className="title text-center">{title}</span>
          </div>
          <div className="flex"></div>
          <div className="auth-component-wrapper">
            <SessionReducer>
              <Session />
            </SessionReducer>
          </div>
        </div>
      </div>
      <Tooltip anchorId="dashboard-link" place="bottom" />
      <Tooltip anchorId="host-link" place="bottom" />
    </nav>
  );
};

export default Navbar;
