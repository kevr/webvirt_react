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
const Error = ({ inline, enabled, error }) => {
  if (!enabled) {
    return <span />;
  }

  return (
    <div className="red-text text-lighten-1 text-center">
      {!inline && (
        <div>
          <i className="material-icons medium">error</i>
        </div>
      )}
      <div className="error" data-testid="error">
        {error.data.detail}
      </div>
    </div>
  );
};

Error.defaultProps = {
  inline: false,
};

export default Error;
