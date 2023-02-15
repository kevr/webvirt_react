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
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import StateControl from "./StateControl";
import config from "../Config.json";

const DomainCard = ({ domain, uuid }) => {
  const color = config.stateColors.foreground[domain.state.string];
  const cardColor = config.stateColors.background[domain.state.string];

  let title = domain.name;
  let tooltip = domain.name;
  if (domain.title && domain.title.text) {
    title = domain.title.text;
    tooltip = `${domain.title.text} (${domain.name})`;
  }

  return (
    <div className="col s6 m4">
      <div className={`domain card ${cardColor}`} data-testid="domain">
        <div id={`domain-tooltip-${uuid}`} data-tooltip-content={tooltip}>
          <div className="card-content">
            <Link
              to={`/domains/${domain.name}`}
              className="grey-text text-darken-4"
            >
              <span className="card-title" data-testid="domain-title">
                {title}
              </span>
              <p style={{ display: "block", width: "110px" }}>
                State: <span className={color}>{domain.state.string}</span>
              </p>
            </Link>
          </div>
        </div>

        <div>
          <StateControl
            domain={domain}
            startElement={<i className="material-icons">play_arrow</i>}
            shutdownElement={
              <i className="material-icons">power_settings_new</i>
            }
          />
        </div>
      </div>
      <Tooltip anchorId={`domain-tooltip-${uuid}`} place="bottom" />
    </div>
  );
};

export default DomainCard;
