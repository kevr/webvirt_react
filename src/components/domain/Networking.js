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
import { Table, THead, TBody, Row, Header, Column } from "../Table";

const NetworkRow = ({ network }) => (
  <Row data-testid="interface">
    <Column data-testid="interface-name">
      {network.alias ? network.alias.attrib.name : "(unassigned)"}
    </Column>
    <Column data-testid="interface-type">{network.attrib.type}</Column>
    <Column data-testid="interface-model">{network.model.attrib.type}</Column>
    <Column data-testid="interface-mac">{network.mac.attrib.address}</Column>
  </Row>
);

const Networking = ({ domain }) => {
  let networks = [];
  if (domain.info !== undefined) {
    networks = domain.info.devices["interface"];
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <Table>
            <THead>
              <Row>
                <Header>Name</Header>
                <Header>Type</Header>
                <Header>Model</Header>
                <Header>MAC</Header>
              </Row>
            </THead>
            <TBody>
              {networks.map((network, index) => (
                <NetworkRow key={index} network={network} />
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Networking;
