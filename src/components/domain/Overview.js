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
import TextInput from "./TextInput";
import Boot from "./Boot";
import config from "../../Config.json";

const Overview = ({ domain, refetch }) => {
  const state = domain.state || {};
  let stateColor = "";
  if (domain.state) {
    stateColor = config.stateColors.foreground[domain.state.id];
  }

  const info = domain.info || {
    devices: { emulator: "", disk: [], interface: [] },
    os: {
      boot: { attrib: {} },
      type: { attrib: {} },
      bootmenu: { attrib: { enable: false } },
    },
  };

  return (
    <div className="overview container">
      <div className="row">
        <div className="col s6">
          <div>
            <div className="flex-display flex-row">
              <StateControl
                className="state-control-button"
                loaderType="spinner"
                domain={domain}
                startElement={<i className="material-icons">play_arrow</i>}
                onStart={refetch}
                shutdownElement={<i className="material-icons">stop</i>}
                onShutdown={refetch}
              />

              <div className="flex">
                <h3 className="domain-name">{domain.title || domain.name}</h3>
              </div>
            </div>
          </div>
          <Table>
            <TBody>
              <SimpleRow title="Name">{domain.name}</SimpleRow>
              <SimpleRow title="UUID">{domain.uuid}</SimpleRow>
              <SimpleRow title="State">
                <span className={stateColor}>{state.string}</span>
              </SimpleRow>
              <SimpleRow title="Title" className="text-input-column">
                <TextInput
                  data-testid="title-input"
                  name="title"
                  domainEndpoint="metadata"
                  value={domain.title || ""}
                  domain={domain}
                  refetch={refetch}
                />
              </SimpleRow>
              <SimpleRow title="Description" className="text-input-column">
                <TextInput
                  data-testid="description-input"
                  name="description"
                  domainEndpoint="metadata"
                  value={domain.description || ""}
                  domain={domain}
                  refetch={refetch}
                />
              </SimpleRow>
            </TBody>
          </Table>
        </div>
        <div className="col s6">
          <h5>Hypervisor Details</h5>
          <Table>
            <TBody>
              <SimpleRow title="Hypervisor">{domain.type}</SimpleRow>
              <SimpleRow title="Architecture">
                {info.os.type.attrib.arch}
              </SimpleRow>
              <SimpleRow title="Emulator">
                {info.devices.emulator.text}
              </SimpleRow>
              <SimpleRow title="Chipset">
                {info.os.type.attrib.machine}
              </SimpleRow>
              <SimpleRow title="Firmware">
                {info.os.boot.attrib.dev === "hd" ? "BIOS" : "EFI"}
              </SimpleRow>
            </TBody>
          </Table>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <h5>Resources</h5>
          <Table>
            <TBody>
              <SimpleRow title="vCPUs" data-testid="resources-vcpus">
                {info.cpus}
              </SimpleRow>
              <SimpleRow title="Memory" data-testid="resources-memory">
                {info.memory / 1024} / {info.maxMemory / 1024} MB
              </SimpleRow>
            </TBody>
          </Table>
        </div>
        <div className="col s6">
          <h5>Boot Options</h5>
          <div>
            <Boot domain={domain} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
