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
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../API";
import { setVirtDomain } from "../store/Actions";
import Loader from "./Loader";

const StateControl = ({
  loaderType,
  domain,
  className,
  startElement,
  onStart,
  shutdownElement,
  onShutdown,
}) => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const onStart_ = (event) => {
    event.stopPropagation();

    setLoading(true);
    apiRequest(`domains/${domain.name}/start`, "POST", session)
      .then((json) => {
        console.log(json);
        dispatch(setVirtDomain(Object.assign({}, domain, json)));
        onStart();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const onShutdown_ = (event) => {
    event.stopPropagation();

    setLoading(true);
    apiRequest(`domains/${domain.name}/shutdown`, "POST", session)
      .then((json) => {
        dispatch(setVirtDomain(Object.assign({}, domain, json)));
        onShutdown();
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className={`state-control flex-display flex-col ${className}`}>
      <div className="flex"></div>
      <Loader width={140} type={loaderType} loading={isLoading}>
        {(domain.state.string === "Shutoff" ||
          domain.state.string === "Shutdown") && (
          <button
            className="waves-effect red lighten-2 btn"
            data-testid="start-submit"
            onClick={onStart_}
          >
            {startElement}
          </button>
        )}
        {domain.state.string === "Running" && (
          <button
            className="waves-effect red lighten-2 btn"
            data-testid="shutdown-submit"
            onClick={onShutdown_}
          >
            {shutdownElement}
          </button>
        )}
      </Loader>
      <div className="flex"></div>
    </div>
  );
};

StateControl.defaultProps = {
  startElement: "Start",
  shutdownElement: "Shutdown",
  loaderType: "progress",
  className: "",
  onStart: () => {},
  onShutdown: () => {},
};

StateControl.propTypes = {
  loaderType: PropTypes.string,
};

export default StateControl;
