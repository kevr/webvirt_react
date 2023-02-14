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
import { setVirtHost } from "../../store/Actions";
import { apiRequest } from "../../API";
import { Table, TBody, Row, Header, Column } from "../Table";
import { yesNo, getDiskSize } from "../../Util";
import Loader from "../Loader";
import Error from "../Error";

const getVersion = (version) => {
  if (!version) return "";

  const major = parseInt(version / 1000000);
  version = parseInt(version % 1000000);

  const minor = parseInt(version / 1000);
  version = parseInt(version % 1000);

  const patch = parseInt(version);

  return `${major}.${minor}.${patch}`;
};

const Overview = () => {
  const session = useSelector((state) => state.session);
  const host = useSelector((state) => state.host);
  const dispatch = useDispatch();

  const { isLoading, isError, data, error } = useQuery(
    "host",
    () => apiRequest("host", "get", session),
    { retry: 0 }
  );

  useEffect(() => {
    if (!isLoading) {
      if (!isError) {
        dispatch(setVirtHost(data));
        console.log(data);
      }
    }
  }, [dispatch, isLoading, isError, data]);

  let memory = 0;
  let unit = "KB";
  let cpuArch = "";
  let cpu = { cores: 0, threads: 0 };
  let driver = "";

  if (host.caps) {
    const [memory_, unit_] = getDiskSize(
      parseInt(host.caps.topology.cells.cell.memory.text)
    );
    memory = memory_;
    unit = unit_;

    cpuArch = host.caps.cpu.arch.text;
    cpu = host.caps.cpu.topology.attrib;
    driver = host.type.toLowerCase();
  }

  return (
    <Loader width={160} label="Loading host information..." loading={isLoading}>
      <Error enabled={!isLoading && isError} error={error}>
        <div className="container">
          <div className="row">
            <div className="col s6">
              <h5>System</h5>
              <Table>
                <TBody>
                  <Row>
                    <Header>Hostname</Header>
                    <Column>{host.hostname}</Column>
                  </Row>
                  <Row>
                    <Header>Arch</Header>
                    <Column>{cpuArch}</Column>
                  </Row>
                  <Row>
                    <Header>vCPUs</Header>
                    <Column>{cpu.cores * cpu.threads}</Column>
                  </Row>
                  <Row>
                    <Header>Cores x Threads</Header>
                    <Column>
                      {cpu.cores} x {cpu.threads}
                    </Column>
                  </Row>
                  <Row>
                    <Header>Memory</Header>
                    <Column>
                      {memory} {unit}
                    </Column>
                  </Row>
                </TBody>
              </Table>
            </div>
            <div className="col s6">
              <h5>Connection</h5>
              <Table>
                <TBody>
                  <Row>
                    <Header>URI</Header>
                    <Column>
                      <code>{host.uri}</code>
                    </Column>
                  </Row>
                  <Row>
                    <Header>Driver</Header>
                    <Column>{driver}</Column>
                  </Row>
                  <Row>
                    <Header>Encrypted</Header>
                    <Column>{yesNo(host.encrypted)}</Column>
                  </Row>
                  <Row>
                    <Header>Secure</Header>
                    <Column>{yesNo(host.secure)}</Column>
                  </Row>
                  <Row>
                    <Header>Libvirtd</Header>
                    <Column>{getVersion(host.version)}</Column>
                  </Row>
                </TBody>
              </Table>
            </div>
          </div>
        </div>
      </Error>
    </Loader>
  );
};

export default Overview;
