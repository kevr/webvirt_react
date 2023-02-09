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
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { apiRequest } from "../../API";
import Loader from "../Loader";
import Error from "../Error";

const TextInput = (props) => {
  const session = useSelector((state) => state.session);

  const [isChanged, setChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [value, setValue] = useState(props.value);

  const valueProp = props.value;
  useEffect(() => {
    // Update value state when props.value changes
    setValue(valueProp);
  }, [valueProp]);

  const onBlur = (value) => {
    const endpoint = `domains/${props.domain.name}/${props.domainEndpoint}`;
    const data = {
      [props.name]: value,
    };
    setLoading(true);
    setChanged(true);
    apiRequest(endpoint, "post", session, JSON.stringify(data))
      .then(async (data) => {
        console.log(data);
        // dispatch(setVirtDomain(Object.assign({}, props.domain, data)));
        await props.refetch();
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div className="input-field">
      <input
        data-testid={props["data-testid"]}
        type="text"
        value={value}
        onInput={(event) => setValue(event.target.value)}
        onBlur={() => onBlur(value)}
      />
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
    </div>
  );
};

TextInput.propTypes = {
  "data-testid": PropTypes.string,
  domainEndpoint: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  domain: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  "data-testid": "",
};

export default TextInput;
