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
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setAppTitle, setVirtNetworks } from "../store/Actions";
import { apiRequest } from "../API";
import { Layout } from "../layouts";
import { Tabs, Tab } from "../components/Tabs";
import { Table, THead, TBody, Row, Header, Column } from "../components/Table";
import Loader from "../components/Loader";
import Error from "../components/Error";
import FlexCentered from "../components/FlexCentered";

const Host = () => {
  const session = useSelector((state) => state.session);
  const networks = useSelector((state) => state.networks);
  const dispatch = useDispatch();

  const { isLoading, isError, data, error } = useQuery(
    "host-networks",
    () => apiRequest("networks", "get", session),
    { retry: 0 }
  );

  useEffect(() => {
    dispatch(setAppTitle("Host Dashboard"));

    if (!isLoading) {
      if (!isError) {
        dispatch(setVirtNetworks(data));
      }
    }
  });

  return (
    <Layout>
      <div style={{ marginTop: "4px" }} />
      <Tabs id="host-dashboard">
        <Tab title="Networks" linkId="host-dashboard-networks" index={0}>
          <Loader width={160} label="Loading networks..." loading={isLoading}>
            <Error enabled={!isLoading && isError} error={error}>
              {networks.length > 0 ? (
                <div className="container">
                  <div className="row">
                    <div className="col s12">
                      <h5>Networks</h5>
                      <Table>
                        <THead>
                          <Row>
                            <Header>Name</Header>
                            <Header>Bridge</Header>
                            <Header>Address</Header>
                            <Header>Netmask</Header>
                            <Header>DHCP Range</Header>
                          </Row>
                        </THead>
                        <TBody>
                          {networks.map((network, index) => (
                            <Row key={index}>
                              <Column>{network.name.text}</Column>
                              <Column>{network.bridge.attrib.name}</Column>
                              <Column>{network.ip.attrib.address}</Column>
                              <Column>{network.ip.attrib.netmask}</Column>
                              {network.ip.dhcp && (
                                <Column>
                                  {network.ip.dhcp.range.attrib.start}
                                  {" ‒ "}
                                  {network.ip.dhcp.range.attrib.end}
                                </Column>
                              )}
                            </Row>
                          ))}
                        </TBody>
                      </Table>
                    </div>
                  </div>
                </div>
              ) : (
                <FlexCentered>
                  <p>No networks found...</p>
                </FlexCentered>
              )}
            </Error>
          </Loader>
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default Host;
