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
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRefresh } from "../API";
import { removeSession, setSession } from "../store/Actions";

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
          dispatch(removeSession());
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
