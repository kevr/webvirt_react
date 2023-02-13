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
import { Children, cloneElement, useEffect } from "react";
import PropTypes from "prop-types";
import M from "materialize-css";

export const Tabs = ({ id, children }) => {
  useEffect(() => {
    const elements = document.getElementById(id);
    M.Tabs.init(elements);
  });

  return (
    <div className="col s12 flex flex-display flex-col">
      <ul id={id} className="tabs">
        {Children.map(children, (child, index) => (
          <li key={index} className="tab">
            <a
              href={`#${id}-tab-${index}`}
              data-testid={`${child.props.linkId}-link`}
            >
              {child.props.title}
            </a>
          </li>
        ))}
      </ul>
      {Children.map(children, (child, index) => {
        return cloneElement(child, { index, id });
      })}
    </div>
  );
};

Tabs.propTypes = {
  id: PropTypes.string.isRequired,
};

export const Tab = ({ id, linkId, index, children }) => {
  return (
    <div
      id={`${id}-tab-${index}`}
      className="col s12 tab flex flex-display flex-col"
    >
      {children}
    </div>
  );
};

Tab.propTypes = {
  linkId: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Tabs;
