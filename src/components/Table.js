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

const propTypes = {
  className: PropTypes.string,
  "data-testid": PropTypes.string,
};

const defaultProps = {
  className: "",
  "data-testid": "",
};

export const Table = (props) => {
  return (
    <table
      data-testid={props["data-testid"]}
      id={props.id}
      className={props.className}
    >
      {props.children}
    </table>
  );
};

Table.propTypes = Object.assign({}, propTypes, {
  id: PropTypes.string,
});
Table.defaultProps = Object.assign({}, defaultProps, { id: "" });

export const THead = ({ children }) => <thead>{children}</thead>;
export const TBody = ({ children }) => <tbody>{children}</tbody>;

export const Row = (props) => (
  <tr data-testid={props["data-testid"]} className={props.className}>
    {props.children}
  </tr>
);

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export const Header = ({ className, children }) => (
  <th className={className}>{children}</th>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export const Column = (props) => (
  <td data-testid={props["data-testid"]} className={props.className}>
    {props.children}
  </td>
);

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;

export const SimpleRow = (props) => {
  return (
    <Row data-testid={props["data-testid"]}>
      <Column>{props.title}</Column>
      <Column data-testid={props["data-testid"] + "-value"}>
        {props.children}
      </Column>
    </Row>
  );
};

SimpleRow.propTypes = Object.assign({}, propTypes, {
  title: PropTypes.string.isRequired,
});
SimpleRow.defaultProps = defaultProps;

const exports = { Table, THead, TBody, Row, Header, Column };
export default exports;
