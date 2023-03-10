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
import FlexCentered from "./FlexCentered";

const getLoaderByType = (type, width) => {
  switch (type) {
    case "spinner":
      return (
        <div className="preloader">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div
          className="progress red lighten-3"
          style={{ width: `${width}px`, marginBottom: "16px" }}
        >
          <div className="indeterminate red lighten-1"></div>
        </div>
      );
  }
};

const Loader = ({ width, type, label, loading, children }) => {
  const loader = getLoaderByType(type, width);

  if (loading) {
    return (
      <FlexCentered>
        <div>
          {label && <p className="text-center">{label}</p>}
          {loader}
        </div>
      </FlexCentered>
    );
  }

  return <div className="flex flex-display flex-col">{children}</div>;
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.number,
};

Loader.defaultProps = {
  loading: true,
  label: "",
  type: "progress",
  width: 100,
};

export default Loader;
