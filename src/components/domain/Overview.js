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
import { Table, SimpleRow, TBody } from "../Table";
import StateControl from "../StateControl";

const Overview = ({ domain }) => {
  let state = undefined;
  if (domain.state) {
    state = domain.state.string;
  }

  const info = domain.info || {};
  return (
    <div className="overview" style={{ marginTop: "10px" }}>
      <div>
        <div className="flex-display flex-row">
          <StateControl
            className="state-control-button"
            loaderType="spinner"
            domain={domain}
            startElement={<i className="material-icons">play_arrow</i>}
            shutdownElement={<i className="material-icons">stop</i>}
          />

          <div className="flex">
            <h3 className="domain-name">{domain.name}</h3>
          </div>
        </div>
      </div>
      <Table>
        <TBody>
          <SimpleRow title="State">{state}</SimpleRow>
          {info.os && <SimpleRow title="OS">{info.os}</SimpleRow>}
          <SimpleRow title="CPUs">{info.cpus}</SimpleRow>
          <SimpleRow title="Memory">
            {info.memory / 1024} / {info.maxMemory / 1024} MB
          </SimpleRow>
        </TBody>
      </Table>
    </div>
  );
};

export default Overview;
