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
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Authenticated = ({ children }) => {
  const session = useSelector((state) => state.session);
  const authenticated = session.access;

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      const next = encodeURIComponent(loc.pathname);
      navigate(`/login?next=${next}`);
    }
  });

  if (!authenticated) {
    return <span />;
  }

  return <div className="flex flex-display flex-col">{children}</div>;
};

export default Authenticated;
