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
import { getDiskSize } from "../../Util";

const DiskRow = ({ disk }) => {
  const [alloc, allocUnit] = getDiskSize(disk.block_info.allocation);
  const [cap, capUnit] = getDiskSize(disk.block_info.capacity);
  const sourceBasename = disk.source.file.split("/").at(-1);
  return (
    <Row data-testid="disk">
      <Column>{disk.driver.type}</Column>
      <Column>{disk.target.bus}</Column>
      <Column>{`/dev/${disk.target.dev}`}</Column>
      <Column>{sourceBasename}</Column>
      <Column>{`${alloc} ${allocUnit}`}</Column>
      <Column>{`${cap} ${capUnit}`}</Column>
    </Row>
  );
};

const Storage = ({ domain }) => {
  let disks = [];
  if (domain.info) {
    disks = domain.info.devices.disks.filter((disk) => disk.device === "disk");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <Table>
            <THead>
              <Row>
                <Header>Driver</Header>
                <Header>Bus</Header>
                <Header>Target</Header>
                <Header>Source</Header>
                <Header>Allocated</Header>
                <Header>Capacity</Header>
              </Row>
            </THead>

            <TBody>
              {disks.map((disk, index) => (
                <DiskRow key={index} disk={disk} />
              ))}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Storage;
