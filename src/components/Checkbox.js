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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { apiRequest } from "../API";
import Loader from "./Loader";
import Error from "./Error";

const Checkbox = (props) => {
  const session = useSelector((state) => state.session);

  const [checked, setChecked] = useState(props.checked);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isChanged, setChanged] = useState(false);

  const checkedProp = props.checked;

  useEffect(() => {
    if (!isLoading && checkedProp !== checked) {
      setChecked(checkedProp);
    }
  }, [isLoading, checkedProp, checked]);

  const onChange = () => {
    const method = checked ? "DELETE" : "POST";

    setChecked(!checked);
    setLoading(true);
    apiRequest(props.endpoint, method, session)
      .then((data) => {
        setError(false);
        setLoading(false);
        props.onChange(data);
        setChanged(true);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        setChanged(true);
      });
  };

  return (
    <label>
      <input
        className="filled-in"
        data-testid={props["data-testid"]}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className="grey-text text-darken-3">{props.label}</span>
      <div className="inline-loader">
        <Loader type="spinner" loading={isLoading}>
          <Error
            inline={true}
            enabled={isError}
            error={{
              data: {
                detail: <i className="material-icons red-text">close</i>,
              },
            }}
          >
            {isChanged && <i className="material-icons green-text">done</i>}
          </Error>
        </Loader>
      </div>
    </label>
  );
};

Checkbox.propTypes = {
  endpoint: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  "data-testid": "",
};

export default Checkbox;
