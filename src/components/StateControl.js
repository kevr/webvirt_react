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
import { AttributeProxy } from "../store/Proxy";

const updateVirtDomain = (dispatch, domain, data, callback, setLoading) => {
  dispatch(
    setVirtDomain(
      Object.assign({}, domain, data, {
        os: AttributeProxy(),
      })
    )
  );

  callback();
  setLoading(false);
};

const setError = (error, setLoading) => {
  console.error(error);
  setLoading(false);
};

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
    apiRequest(`domains/${domain.name.text}/start`, "POST", session)
      .then((data) =>
        updateVirtDomain(dispatch, domain, data, onStart, setLoading)
      )
      .catch((error) => setError(error, setLoading));
  };

  const onShutdown_ = (event) => {
    event.stopPropagation();

    setLoading(true);
    apiRequest(`domains/${domain.name.text}/shutdown`, "POST", session)
      .then((data) =>
        updateVirtDomain(dispatch, domain, data, onShutdown, setLoading)
      )
      .catch((error) => setError(error, setLoading));
  };

  return (
    <div className={`state-control flex-display flex-col ${className}`}>
      <div className="flex"></div>
      <Loader width={140} type={loaderType} loading={isLoading}>
        {(domain.state.attrib.string === "Shutoff" ||
          domain.state.attrib.string === "Shutdown") && (
          <button
            className="waves-effect red lighten-2 btn"
            data-testid="start-submit"
            onClick={onStart_}
          >
            {startElement}
          </button>
        )}
        {domain.state.attrib.string === "Running" && (
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
