import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRefresh } from "../API";
import { setSession } from "../store/Actions";

const SessionRefresher = ({ children }) => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const apiLock = useRef(false);

  useEffect(() => {
    const refresh = () =>
      apiRefresh(session.refresh)
        .then((json) => {
          dispatch(setSession(json));
        })
        .catch((error) => {
          console.error(error);
        });

    // Refresh session tokens every thirty minutes.
    const interval = setInterval(refresh, 1000 * 60 * 30);

    if (apiLock.current) return () => clearInterval(interval);
    apiLock.current = true;

    // If this is the first time we've run, bootstrap a token refresh.
    refresh();

    return () => clearInterval(interval);
  }, [apiLock, session, dispatch]);

  return children;
};

export default SessionRefresher;
