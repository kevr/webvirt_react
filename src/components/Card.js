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

const Card = ({ title, style, children }) => (
  <div className="card" style={style}>
    <div className="card-content">
      <span className="card-title" data-testid="card-title">
        {title}
      </span>
      {children}
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Card.defaultProps = {
  style: {},
};

export default Card;
