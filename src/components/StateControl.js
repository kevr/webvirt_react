import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../API";
import { setVirtDomain } from "../store/Actions";
import Loader from "./Loader";

const StateControl = ({
  loaderType,
  domain,
  shutdownElement,
  startElement,
}) => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const onStart = (event) => {
    event.stopPropagation();

    setLoading(true);
    apiRequest(`domains/${domain.name}/start`, "POST", session)
      .then((json) => {
        console.log(json);
        dispatch(setVirtDomain(json));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const onShutdown = (event) => {
    event.stopPropagation();

    setLoading(true);
    apiRequest(`domains/${domain.name}/shutdown`, "POST", session)
      .then((json) => {
        dispatch(setVirtDomain(json));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div className="state-control flex-display flex-col">
      <div className="flex"></div>
      <Loader type={loaderType} loading={isLoading}>
        {(domain.state.string === "Shutoff" ||
          domain.state.string === "Shutdown") && (
          <button className="waves-effect red lighten-2 btn" onClick={onStart}>
            {startElement}
          </button>
        )}
        {domain.state.string === "Running" && (
          <button
            className="waves-effect red lighten-2 btn"
            onClick={onShutdown}
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
};

StateControl.requiredProps = {
  loaderType: PropTypes.string,
};

export default StateControl;
